import { Navigate } from "react-router-dom";
import { useAuth } from "../../feature/auth/context/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p className="p-6 text-white">Carregant...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}