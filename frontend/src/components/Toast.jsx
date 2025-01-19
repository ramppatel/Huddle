import React from "react";
import { Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: "shadow-lg rounded-lg p-4 text-sm",
        style: {
          fontFamily: "Inter, sans-serif",
        },
        success: {
          duration: 4000,
          className:
            "bg-gradient-to-b from-[#0A0B22] to-[#2B1D55] text-white font-semibold shadow-md border border-green-400 rounded-lg backdrop-blur-md",
          iconTheme: {
            primary: "#4ade80",
            secondary: "#fff",
          },
        },
        error: {
          duration: 5000,
          className:
            "bg-gradient-to-b from-[#0A0B22] to-[#2B1D55] text-white font-semibold shadow-md border border-red-400 rounded-lg backdrop-blur-md",
          iconTheme: {
            primary: "#f87171",
            secondary: "#fff",
          },
        },
        style: {
          fontFamily: "Inter, sans-serif",
        },
      }}
    />
  );
}

export default Toast;
