import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from "./components/Login";
import BidForm from "./components/BidForm";
import Signup from "./components/Signup";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<BidForm />} />
        <Route path="/dashboard" element={<App/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  </StrictMode>
);
