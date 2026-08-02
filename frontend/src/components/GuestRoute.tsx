import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface GuestRouteProps {
    children: JSX.Element;
}

export default function GuestRoute({
    children,
}: GuestRouteProps) {
    const { user } = useAuth();

    if (user) {
        switch (user.role) {
            case "admin":
                return (
                    <Navigate
                        to="/admin-dashboard"
                        replace
                    />
                );

            case "business":
                return (
                    <Navigate
                        to="/business-dashboard"
                        replace
                    />
                );

            default:
                return (
                    <Navigate
                        to="/user-dashboard"
                        replace
                    />
                );
        }
    }

    return children;
}