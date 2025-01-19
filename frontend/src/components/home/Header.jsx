import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import Logo from "./Logo";
import { useSelector } from "react-redux";

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Space",
      to: "/channels/@me",
    },
    {
      name: "Profile",
      to: "/profile",
    },
    {
      name: "About Us",
      to: "/aboutus",
    },
    {
      name: "Login",
      to: "/login",
    },
    {
      name: "Signup",
      to: "/signup",
    },
  ];

  return (
    <header className="fixed w-full top-0 z-50">
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-md" />

      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="logo-container flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Logo />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {navItems.map((item) =>
              (item.name === "Login" || item.name === "Signup") &&
              isAuthenticated ? null : (
                <button
                  key={item.name}
                  onClick={() => navigate(item.to)}
                  className="nav-item relative px-4 py-2 text-sm font-medium text-blue-300 hover:text-white transition-colors duration-200 rounded-md group"
                >
                  <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-200" />
                  <span className="relative">{item.name}</span>
                </button>
              )
            )}

            {isAuthenticated && (
              <div className="nav-item ml-2">
                <LogoutBtn className="px-4 py-2 text-sm font-medium text-red-300 hover:text-red-400 transition-colors duration-200 rounded-md" />
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
    </header>
  );
}
