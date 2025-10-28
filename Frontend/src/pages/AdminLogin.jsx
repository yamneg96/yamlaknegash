// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, user } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    // if login succeeded, store will have user -> redirect
    const current = JSON.parse(localStorage.getItem("token") ? "{}" : "{}"); // dummy to avoid linter
    if (localStorage.getItem("token")) navigate("/admin-dashboard");
  };

  return (
    <div className="pt-24 px-4 min-h-screen flex justify-center items-start">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border rounded mb-3" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full p-3 border rounded mb-3" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
