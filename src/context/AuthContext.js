import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
    loginUser,
    registerUser,
    googleLogin as googleLoginApi,
    forgotPassword as forgotPasswordApi,
} from "../api";

const AuthContext = createContext();
const STORAGE_KEY = "courseSelectionUser";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

const getApiErrorMessage = (error) => {
    return (error && error.response && error.response.data && error.response.data.message) ||
        (error && error.message) ||
        "Action failed";
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    const persistUser = (userData) => {
        if (!userData) {
            localStorage.removeItem(STORAGE_KEY);
            setUser(null);
            return;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
    };

    const login = async({ email, password }) => {
        try {
            setError(null);
            const response = await loginUser({ email, password });
            const apiUser = response.data.user;
            persistUser({
                id: apiUser.id,
                name: apiUser.name || "",
                email: apiUser.email,
                role: apiUser.role ? apiUser.role.toLowerCase() : "student",
            });
            return response;
        } catch (err) {
            const message = getApiErrorMessage(err);
            setError(message);
            throw err;
        }
    };

    const register = async({ email, password, role, name }) => {
        try {
            setError(null);
            const response = await registerUser({
                email,
                password,
                role: role ? role.toUpperCase() : "STUDENT",
                name: name || email.split("@")[0],
            });
            const apiUser = response.data.user;
            persistUser({
                id: apiUser.id,
                name: apiUser.name || "",
                email: apiUser.email,
                role: apiUser.role ? apiUser.role.toLowerCase() : "student",
            });
            return response;
        } catch (err) {
            const message = getApiErrorMessage(err);
            setError(message);
            throw err;
        }
    };

    const googleLogin = async() => {
        try {
            setError(null);
            const response = await googleLoginApi();
            const apiUser = (response.data && response.data.user) || {};
            const googleUser = {
                id: apiUser.id || 0,
                name: apiUser.name || "Google User",
                email: apiUser.email || "google.user@demo.com",
                role: apiUser.role ? apiUser.role.toLowerCase() : "student",
            };
            persistUser(googleUser);
            return googleUser;
        } catch (err) {
            const message = getApiErrorMessage(err);
            setError(message);
            throw err;
        }
    };

    const forgotPassword = async(email) => {
        try {
            setError(null);
            const response = await forgotPasswordApi(email);
            return response;
        } catch (err) {
            const message = getApiErrorMessage(err);
            setError(message);
            throw err;
        }
    };

    const logout = () => {
        persistUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            register,
            googleLogin,
            forgotPassword,
            logout,
            setError,
        }), [user, loading, error]
    );

    return <AuthContext.Provider value = { value } > { children } < /AuthContext.Provider>;
};