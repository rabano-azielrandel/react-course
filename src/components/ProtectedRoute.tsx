import { Navigate } from "react-router-dom";
import { CONTAINS_TOKEN } from "@/lib/utils";

export default function ProtectedRoute({ children }: any) {
  console.log("token:", CONTAINS_TOKEN());

  if (!CONTAINS_TOKEN()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
