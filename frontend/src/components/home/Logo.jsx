import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-6 h-6"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-7.41l4.29-4.29c.63-.63.18-1.71-.71-1.71H8c-.55 0-1 .45-1 1v4.59c0 .89 1.08 1.34 1.71.71L10 12.59zm4 1.41-4.29 4.29c-.63.63-.18 1.71.71 1.71h4.59c.55 0 1-.45 1-1v-4.59c0-.89-1.08-1.34-1.71-.71L14 14.41z" />
        </svg>
      </div>
      {/* Text */}
      <span className="text-2xl font-bold text-white tracking-wide">
        Huddle
      </span>
    </div>
  );
}

export default Logo;
