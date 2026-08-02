import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const navigate = useNavigate();

    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [passwordConfirmation, setPasswordConfirmation] =
        useState("");

    const [role, setRole] = useState("user");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        try {
            setLoading(true);

            await register(
                name,
                email,
                password,
                passwordConfirmation,
                role
            );

            alert("Registration successful.");

            navigate("/login");
        } catch (error: any) {
            console.error(error);

            if (error.response?.status === 422) {
                const errors = error.response.data.errors;

                const message = Object.values(errors)
                    .flat()
                    .join("\n");

                alert(message);
            } else {
                alert(
                    error.response?.data?.message ??
                    "Something went wrong. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Join Paikari to share and compare prices."
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Full name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />
                </div>

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
                        Account type
                    </label>

                    <select
                        className="form-select"
                        value={role}
                        onChange={(event) =>
                            setRole(event.target.value)
                        }
                    >
                        <option value="user">
                            General User
                        </option>

                        <option value="business">
                            Business User
                        </option>
                    </select>
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

                <div className="mb-3">
                    <label className="form-label">
                        Confirm password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={passwordConfirmation}
                        onChange={(event) =>
                            setPasswordConfirmation(
                                event.target.value
                            )
                        }
                    />
                </div>

                <button
                    className="btn btn-success w-100"
                    disabled={loading}
                >
                    Register
                </button>
            </form>

            <p className="text-center mt-4 mb-0">
                Already have an account?{" "}
                <Link to="/login">Sign in</Link>
            </p>
        </AuthLayout>
    );
}