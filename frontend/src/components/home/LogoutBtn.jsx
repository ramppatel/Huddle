import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogoutBtn({ className }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(logout());

    const res = await axios.get("http://localhost:3001/dashboard/api/logout",{
      withCredentials: true, // Equivalent to credentials: 'include'
          headers: {
            "Content-Type": "application/json",
          },
    });

    console.log(res.data.message);

    navigate("/");
  };

  return (
    <button className={`${className}`} onClick={logoutHandler}>
      Logout
    </button>
  );
}
