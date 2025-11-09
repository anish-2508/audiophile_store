import React, { createContext, useState, useEffect } from "react";
// Removed: import api from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) setUser({ token, role });
  }, []);

  const login = async (email, password) => {
    // Removed: const res = await api.post("/auth/login", { email, password });
    // Removed: localStorage.setItem("token", res.data.token);
    // Removed: localStorage.setItem("role", res.data.role);
    // Removed: setUser({ token: res.data.token, role: res.data.role });
  };

  const register = async (email, password) => {
    // Removed: const res = await api.post("/auth/register", { email, password });
    // Removed: localStorage.setItem("token", res.data.token);
    // Removed: localStorage.setItem("role", res.data.role);
    // Removed: setUser({ token: res.data.token, role: res.data.role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
