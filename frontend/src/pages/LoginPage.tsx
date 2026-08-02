import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        try {
            setLoading(true);

            const loggedInUser = await login(
                email,
                password
            );

            if (loggedInUser.role === "admin") {
                navigate("/admin-dashboard");
            } else if (
                loggedInUser.role === "business"
            ) {
                navigate("/business-dashboard");
            } else {
                navigate("/user-dashboard");
            }
        } catch (error) {
            console.error(error);

            alert("Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to Paikari."
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Email address
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />
                </div>

                <button
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    Log in
                </button>
            </form>

            <p className="text-center mt-4 mb-0">
                New to Paikari?{" "}
                <Link to="/register">
                    Create an account
                </Link>
            </p>
        </AuthLayout>
    );
}