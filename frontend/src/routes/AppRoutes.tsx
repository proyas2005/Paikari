import {
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import ComparePage from "../pages/ComparePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import UserDashboard from "../pages/UserDashboard";
import BusinessDashboard from "../pages/BusinessDashboard";
import AdminDashboard from "../pages/AdminDashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";

export default function AppRoutes() {
    const location = useLocation();

    return (
        <Routes>
            {/* public routes */}

            <Route path="/" element={<HomePage />} />

            <Route
                path="/compare"
                element={<ComparePage />}
            />

            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <GuestRoute>
                        <RegisterPage />
                    </GuestRoute>
                }
            />

            {/* user routes */}

            <Route
                path="/user-dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["user"]}
                    >
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />

            {/* business routes */}

            <Route
                path="/business-dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["business"]}
                    >
                        <BusinessDashboard />
                    </ProtectedRoute>
                }
            />

            {/* admin routes */}

            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                    >
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                        state={{ from: location }}
                    />
                }
            />
        </Routes>
    );
}