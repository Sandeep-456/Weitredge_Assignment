import express from "express";
import {
  handleChat,
  getHistory,
  getSessions,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", handleChat);
router.get("/conversations/:sessionId", getHistory);
router.get("/sessions", getSessions);

export default router;
