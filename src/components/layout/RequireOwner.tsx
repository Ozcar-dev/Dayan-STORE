import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { AdminSkeleton } from "@/components/sections/AdminSkeleton";

export function RequireOwner() {
  const { session, isLoading } = useAuth();

  if (isLoading) 
    return <AdminSkeleton />;
  
  if (!session) 
    return <Navigate to="/" replace />;

  return <Outlet />;
}
