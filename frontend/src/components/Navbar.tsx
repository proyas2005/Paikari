import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();

        navigate("/login");
    };

    const dashboardLink = () => {
        if (!user) return "/";

        switch (user.role) {
            case "admin":
                return "/admin-dashboard";

            case "business":
                return "/business-dashboard";

            default:
                return "/user-dashboard";
        }
    };

    return (
        <nav className="top-nav">
            <div className="container nav-content">
                <div className="nav-left">
                    <Link
                        to="/"
                        className="d-flex align-items-center text-decoration-none"
                    >
                        <div className="brand-mark">
                            P
                        </div>

                        <span className="brand-name ms-2">
                            Paikari
                        </span>
                    </Link>
                </div>

                <div className="nav-links">
                    <Link
                        className="nav-link-custom"
                        to="/"
                    >
                        Home
                    </Link>

                    <Link
                        className="nav-link-custom"
                        to="/compare"
                    >
                        Compare
                    </Link>

                    {user ? (
                        <Link
                            className="nav-link-custom"
                            to={dashboardLink()}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            className="nav-link-custom"
                            to="/login"
                        >
                            Sign in
                        </Link>
                    )}
                </div>

                <div className="nav-actions">
                    {user ? (
                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            className="btn btn-accent"
                            to="/register"
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}