// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { useAuthStore } from "./Store/useAuthStore";

// Fetch current user if token present
const token = localStorage.getItem("token");
if (token) {
  // lazy import to avoid calling hooks here: we directly call service instead
  import("./Services/authService").then(({ getCurrentUser }) => {
    getCurrentUser().catch(() => { /* ignore */ });
  });
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
