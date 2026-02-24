import { client } from "../config/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildStrictPrompt } from "../utils/promptBuilder.js";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const docsPath = path.resolve("docs.json");
const docs = JSON.parse(fs.readFileSync(docsPath, "utf8"));

export const handleChat = async (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res
      .status(400)
      .json({ error: "Missing sessionId or message. UUID is required." });
  }

  try {
    await client.execute({
      sql: "INSERT OR IGNORE INTO sessions (id) VALUES (?)",
      args: [sessionId],
    });

    const historyRes = await client.execute({
      sql: "SELECT role, content FROM messages WHERE session_id = ? ORDER BY created_at ASC LIMIT 10",
      args: [sessionId],
    });

    let history = historyRes.rows.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    while (history.length > 0 && history[0].role !== "user") {
      history.shift();
    }

    const systemPrompt = buildStrictPrompt(docs, history);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: systemPrompt }],
      },
    });

    const chat = model.startChat({ history });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    await client.batch([
      {
        sql: "INSERT INTO messages (session_id, role, content) VALUES (?, 'user', ?)",
        args: [sessionId, message],
      },
      {
        sql: "INSERT INTO messages (session_id, role, content) VALUES (?, 'assistant', ?)",
        args: [sessionId, reply],
      },
    ]);

    res.json({
      reply,
      tokensUsed: result.response.usageMetadata?.totalTokenCount || 0,
      sessionId,
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "LLM API failure or DB error" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await client.execute({
      sql: "SELECT role, content, created_at FROM messages WHERE session_id = ? ORDER BY created_at ASC",
      args: [sessionId],
    });
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
};

export const getSessions = async (req, res) => {
  try {
    const result = await client.execute(
      "SELECT id, updated_at FROM sessions ORDER BY updated_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};
