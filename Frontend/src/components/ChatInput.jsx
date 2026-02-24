import React from "react";
import { HiOutlinePaperAirplane, HiPlus } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";

const ChatInput = ({
  input,
  setInput,
  onSend,
  onNewChat,
  isResetting,
  loading,
  isDark,
}) => {
  const handelNewChat = () => {
    onNewChat();
  };

  return (
    <footer
      className={`p-4 md:p-6 ${isDark ? "border-slate-800 bg-gray-900" : "border-slate-200 bg-gray-100"} border-t `}
    >
      <div className="max-w-4xl mx-auto flex gap-3 items-center">
        <button
          onClick={handelNewChat}
          disabled={isResetting}
          type="button"
          className={`md:hidden flex items-center justify-center min-w-[48px] h-[48px] rounded-xl border text-blue-500 ${isDark ? "bg-slate-800 :border-slate-800" : "bg-slate-100 border-slate-200"} transition-all disabled:opacity-50`}
          title="New Chat"
        >
          {isResetting ?
            <BiLoaderAlt className="animate-spin text-xl" />
          : <HiPlus className="text-xl" />}
        </button>

        {/* Input Form */}
        <form onSubmit={onSend} className="flex-1 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our products..."
            className={`flex-1 border ${isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-slate-100  border-slate-200"}  rounded-2xl px-5 py-3 md:py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm `}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 md:px-6 rounded-2xl disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-blue-600/20"
          >
            <HiOutlinePaperAirplane className="rotate-90 text-xl" />
          </button>
        </form>
      </div>
    </footer>
  );
};

export default ChatInput;
