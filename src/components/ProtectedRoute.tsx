import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");

  console.log("token:", token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
