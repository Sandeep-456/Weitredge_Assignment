import React from "react";
import { HiOutlineChatAlt2, HiPlus } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Robot from "../assets/robot.lottie";

const Sidebar = ({ onNewChat, isResetting, isDark }) => {
  return (
    <div
      className={`hidden md:flex w-72 flex-col border-r ${isDark ? "border-slate-800 bg-gray-900" : "border-slate-200 bg-gray-100"} p-6`}
    >
      <div className="flex items-center gap-3 mb-10 font-bold text-2xl text-blue-500">
        <DotLottieReact src={Robot} loop autoplay className="w-[40%]" />
        <span className="tracking-tight text-lg">AI Support</span>
      </div>

      <button
        onClick={onNewChat}
        className="flex items-center cursor-pointer justify-center gap-2 w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-500/30 font-semibold text-sm"
      >
        {isResetting ?
          <BiLoaderAlt className="animate-spin" />
        : <HiPlus />}
        <span>{isResetting ? "Resetting..." : "New Chat"}</span>
      </button>

      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 text-center">
          sandeep • 2024 • all rights reserved
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
