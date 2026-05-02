import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
    const navigate = useNavigate();
    const { user, loading, logout } = useAuth();

    if (loading) {
        return ( <
            div className = "min-h-screen flex items-center justify-center" > Loading... < /div>
        );
    }

    if (!user) {
        return <Navigate to = "/login"
        replace / > ;
    }

    if (user.role !== "admin") {
        return <Navigate to = "/dashboard"
        replace / > ;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex justify-center py-10" >
        <
        div className = "bg-white rounded-2xl shadow-lg p-8 w-full max-w-md" >
        <
        h2 className = "text-2xl font-bold text-indigo-700 mb-6 text-center" > 👤Admin Dashboard < /h2> <
        div className = "flex items-center gap-4 mb-6" >
        <
        img src = { `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=6366f1&color=fff&size=128` }
        alt = "admin"
        className = "w-16 h-16 rounded-full shadow" /
        >
        <
        div >
        <
        p className = "font-semibold text-gray-800" > { user.email } < /p> <
        p className = "text-sm text-indigo-600 font-medium" > 🛡Role: Administrator < /p> <
        /div> <
        /div>

        <
        div className = "space-y-4 text-sm mb-6" >
        <
        div className = "flex justify-between" >
        <
        span className = "text-gray-600" > Access Level < /span> <
        span className = "font-semibold text-indigo-600" > Full Access < /span> <
        /div> <
        div className = "flex justify-between" >
        <
        span className = "text-gray-600" > Permissions < /span> <
        span className = "font-semibold" > Manage Courses & Students < /span> <
        /div> <
        div className = "flex justify-between" >
        <
        span className = "text-gray-600" > Account Status < /span> <
        span className = "font-semibold text-green-600" > Active < /span> <
        /div> <
        div className = "flex justify-between" >
        <
        span className = "text-gray-600" > User ID < /span> <
        span className = "font-semibold text-xs break-all" > { user.id } < /span> <
        /div> <
        /div>

        <
        button onClick = { handleLogout }
        className = "w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition" >
        🚪Logout <
        /button> <
        /div> <
        /div>
    );
}

export default AdminDashboard;

