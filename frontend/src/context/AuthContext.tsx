import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import api from "../services/api";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;

    login: (
        email: string,
        password: string
    ) => Promise<User>;

    register: (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string,
        role: string
    ) => Promise<void>;

    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchUser();
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await api.get("/me");

            setUser(response.data.user);
        } catch (error) {
            console.error(error);

            localStorage.removeItem("token");

            setUser(null);
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string,
        role: string
    ): Promise<void> => {
        await api.post("/register", {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            role,
        });
    };

    const login = async (
        email: string,
        password: string
    ): Promise<User> => {
        const response = await api.post("/login", {
            email,
            password,
        });

        localStorage.setItem(
            "token",
            response.data.token
        );

        setUser(response.data.user);

        return response.data.user;
    };

    const logout = async (): Promise<void> => {
        try {
            await api.post("/logout");
        } finally {
            localStorage.removeItem("token");

            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider."
        );
    }

    return context;
};