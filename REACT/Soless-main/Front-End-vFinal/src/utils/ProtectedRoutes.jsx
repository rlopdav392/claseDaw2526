import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context_providers/AuthProvider";

const ProtectedRoutes = () => {
    const { isAuthenticated, isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return null;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes