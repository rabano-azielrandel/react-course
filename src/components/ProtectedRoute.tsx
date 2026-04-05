import { Navigate } from "react-router-dom";
import { CONTAINS_TOKEN } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  console.log("token:", CONTAINS_TOKEN());

  if (!CONTAINS_TOKEN()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
