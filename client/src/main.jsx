import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./socket/socket";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#fff",
            color: "#0f172a",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "14px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#7c3aed", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
      <App />
    </AuthProvider>
  </StrictMode>
);
