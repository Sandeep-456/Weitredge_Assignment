import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { getOrSetSession, resetSession } from "./utils/session";
import { sendMessage, getHistory, setupInterceptors } from "./api/chatService";
import { HiMoon, HiSun } from "react-icons/hi";

function App() {
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toast = useRef(null);

  // Helper function for Toasts
  const showToast = (severity, summary, detail) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  useEffect(() => {
    setupInterceptors(showToast);
    const session = getOrSetSession();
    fetchHistory(session);
    document.documentElement.classList.add("dark");
  }, []);

  const fetchHistory = async (session) => {
    try {
      const { data } = await getHistory(session);
      setMessages(data);
    } catch (err) {
      showToast("error", "History Error", "Could not load previous messages.");
    }
  };

  const handleNewChat = async () => {
    setIsResetting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      resetSession();
      setMessages([]);
      showToast("success", "New Session", "Chat history has been reset.");
    } catch (err) {
      showToast("error", "Reset Failed", "Try again later.");
    } finally {
      setIsResetting(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const userMsg = input.trim();
    const now = new Date().toISOString();
    if (!userMsg) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMsg, created_at: now },
    ]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await sendMessage(getOrSetSession(), userMsg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full transition-all duration-500 ease-in-out">
      <Toast ref={toast} position="top-right" />

      <Sidebar
        onNewChat={handleNewChat}
        isResetting={isResetting}
        isDark={isDark}
      />

      <div
        className={`flex flex-col flex-1 relative transition-opacity duration-300 ${isResetting ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        <header
          className={`h-20 flex items-center justify-between px-8 border-b ${isDark ? "border-slate-800 bg-gray-900" : "border-slate-200 bg-gray-100"}`}
        >
          <div>
            <h2 className="font-bold text-xl tracking-tight">Support Portal</h2>
            <p className="text-[10px] text-blue-500 font-mono uppercase tracking-widest">
              Active • Get your queries answered in seconds
            </p>
            <button
              onClick={() => {
                setIsDark(!isDark);
                document.documentElement.classList.toggle("dark");
              }}
              className={`p-3 cursor-pointer fixed right-3 top-3 rounded-xl border ${isDark ? "border-slate-800 bg-gray-900 hover:bg-slate-800 " : "border-slate-300 bg-white hover:bg-slate-100"} transition-all `}
            >
              {isDark ?
                <HiSun className="text-yellow-400 text-xl" />
              : <HiMoon className="text-slate-700 text-xl" />}
            </button>
          </div>
        </header>

        <ChatWindow
          messages={messages}
          loading={loading}
          isDark={isDark}
          scrollRef={scrollRef}
        />
        <ChatInput
          isDark={isDark}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
