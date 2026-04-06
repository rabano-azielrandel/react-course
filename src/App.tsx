import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <Routes>
        {/* ✅ PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* ✅ PROTECTED ONLY */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* UNKNOWN PATH == LOGIN */}
        {/* <Route path="*" element={<Login />} /> */}
      </Routes>
    </div>
  );
}
