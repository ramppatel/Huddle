import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAPI from "../../hooks/useAPI";

export default function LogoutBtn({ className }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { GET } = useAPI();

  const logoutHandler = async () => {
    try {
      dispatch(logout());

      const res = await axios.get(
        "http://localhost:3001/api/user/logout",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("You have successfully logged out. See you soon!");

      navigate("/");
    } catch (err) {
      toast.error("Logout failed! Please try again.");
    }
  };

  return (
    <button className={`${className}`} onClick={logoutHandler}>
      Logout
    </button>
  );
}
