import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import useAPI from "../hooks/useAPI";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    dispatch(loginStart());

    const { POST } = useAPI();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const { user } = response.data;

      const authData = {
        user: {
          username: user.userName,
          email: user.email,
          token: user.token,
        },
        profile: user.profile || {},
        permissions: user.permissions || [],
      };

      dispatch(loginSuccess(authData));
      toast.success("Welcome back! You have successfully logged in.");

      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);

      dispatch(loginFailure(errorMessage));
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-900">
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
                Welcome Back
              </h2>
              <p className="text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()} // Prevent default form submission
              className="space-y-6"
            >
              <div className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
                />
              </div>

              <Button
                type="button"
                onClick={handleLogin} // Trigger login on click
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
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-gray-400 text-sm">
              Protected by industry standard encryption
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
