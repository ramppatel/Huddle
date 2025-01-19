import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import { motion } from "framer-motion";

import axios from "axios";

import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const create = async () => {
    setError("");
    setIsLoading(true);
    dispatch(loginStart());

    try {
      const response = await axios.post(
        "http://localhost:3001/dashboard/api/signup",
        {
          email,
          userId: userName,
          fullName,
          password,
        },
        {
          withCredentials: true, // Equivalent to credentials: 'include'
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      
      console.log("Signup successful");
      // dispatch(loginSuccess(response.data.user));
      navigate("/login");
    } catch (err) {
      // Axios wraps the response error in err.response
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 mx-4"
      >
        <div className="bg-gray-800 backdrop-blur-lg bg-opacity-50 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              Huddle
            </h1>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 mb-6"
            >
              <p className="text-red-500 text-center text-sm">{error}</p>
            </motion.div>
          )}

          <form className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
              />
              <Input
                label="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter username"
                className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
              />
              <Input
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
              />
            </div>

            <Button
              type="submit"
              onClick={create}
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                text-white font-medium transition-all duration-200 transform hover:scale-[1.02] 
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            By signing up, you agree to our Terms of Service
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
