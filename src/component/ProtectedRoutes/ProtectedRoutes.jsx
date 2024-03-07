import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function ProtectedRoutes({ children }) {
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  JSON.parse(userId);
  console.log(JSON.parse(userId));
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    localStorage.setItem("userId", JSON.stringify(decoded.id));
    localStorage.setItem("userName", JSON.stringify(decoded.name));

  } catch (error) {
    console.log("errors", error);
    localStorage.clear();
    return <Navigate to="/signin" />;
  }
  if (token) return children;
  return <Navigate to="/signin" />;
}
