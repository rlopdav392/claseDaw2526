import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { VALIDATE_TOKEN_ENDPOINT } from "../config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const storedUserLS = localStorage.getItem("user");
    const tokenLS = localStorage.getItem("authToken");
    const [user, setUser] = useState(storedUserLS ? JSON.parse(storedUserLS) : null);
    const [token, setToken] = useState(tokenLS || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(storedUserLS ? JSON.parse(storedUserLS)?.role === "admin" : false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const navigate = useNavigate();

    const login = (userData, token) => {
        setUser(userData);  
        setIsAuthenticated(true); 
        setToken(token);
        setIsAdmin(userData.role === "admin");
        console.log("token", token);
        localStorage.setItem("authToken", token); 
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/"); 
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setToken(null);
        localStorage.removeItem("authToken");  
        localStorage.removeItem("user");  
        console.log("borrando carrito")
        localStorage.removeItem("carrito");  
        console.log("carrito borrado")
    };

    const updateUserData = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    useEffect(() => {
        const validateToken = async () => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("authToken");

            if (!storedToken || !storedUser) {
                setIsAuthenticated(false);
                setIsAuthLoading(false);
                return;
            }

            setIsAuthLoading(true);

            try {
                const response = await fetch(VALIDATE_TOKEN_ENDPOINT, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Token invalid or expired");
                }

                const data = await response.json();
                const backendUser = data?.user;

                if (!backendUser) {
                    throw new Error("Invalid validation response");
                }

                const validatedUser = {
                    id: backendUser.id,
                    name: backendUser.name,
                    email: backendUser.email,
                    role: backendUser.role,
                    address: backendUser.address,
                };

                setUser(validatedUser);
                setToken(storedToken);
                setIsAuthenticated(true);
                setIsAdmin(validatedUser.role === "admin");
                localStorage.setItem("user", JSON.stringify(validatedUser));
            } catch (error) {
                console.error("Sesion invalida o caducada:", error);
                logout();
            } finally {
                setIsAuthLoading(false);
            }
        };

        validateToken();
    }, []); // Se ejecuta al montar el componente

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, token, isAdmin, isAuthLoading, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};