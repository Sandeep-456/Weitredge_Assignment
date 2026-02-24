import React from "react";
import { useEffect } from "react";
import { BiBot, BiUser } from "react-icons/bi";

const ChatWindow = ({ messages, loading, scrollRef, isDark }) => {
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar no-scrollbar">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-3`}
        >
          <div
            className={`flex gap-3 max-w-[88%] md:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-inner ${msg.role === "user" ? "bg-blue-600" : "bg-slate-700"}`}
            >
              {msg.role === "user" ?
                <BiUser className="text-white text-lg" />
              : <BiBot className="text-white text-lg" />}
            </div>
            <div
              className={`py-2 px-4 rounded-2xl flex flex-col text-[14px] leading-relaxed shadow-sm ${
                msg.role === "user" ?
                  "bg-blue-600 text-white rounded-tr-none"
                : `rounded-tl-none border  ${isDark ? "text-slate-200 border-slate-800 bg-gray-900" : "border-slate-200 text-black bg-gray-100/50"}`
              }`}
            >
              <span className="text-[10px] self-end mt-1  text-slate-400 font-medium">
                {formatTime(msg.created_at || new Date())}
              </span>
              <p className="pt-2">{msg.content}</p>
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="glass px-6 py-4 rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-800">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        </div>
      )}
      <div ref={scrollRef} className="h-1" />
    </div>
  );
};

export default ChatWindow;
