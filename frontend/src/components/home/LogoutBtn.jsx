import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn({ className }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button className={`${className}`} onClick={logoutHandler}>
      Logout
    </button>
  );
}
