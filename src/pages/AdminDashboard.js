import React from "react";
import { auth } from "../firebase";

function AdminProfile() {
    const admin = auth.currentUser;

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex justify-center py-10" >
        <
        div className = "bg-white rounded-2xl shadow-lg p-8 w-full max-w-md" >

        <
        h2 className = "text-2xl font-bold text-indigo-700 mb-6" > 👤Admin Profile <
        /h2>

        <
        div className = "flex items-center gap-4 mb-6" >
        <
        img src = { `https://ui-avatars.com/api/?name=${admin && admin.email}&background=6366f1&color=fff` }
        alt = "admin"
        className = "w-16 h-16 rounded-full" /
        >
        <
        div >
        <
        p className = "font-semibold text-gray-800" > { admin && admin.email } <
        /p> <
        p className = "text-sm text-gray-500" >
        Role: Administrator <
        /p> <
        /div> <
        /div>

        <
        div className = "space-y-3 text-sm" >
        <
        div className = "flex justify-between" >
        <
        span className = "text-gray-600" > Access Level < /span> <
        span className = "font-semibold" > Full < /span> <
        /div>

        <
        div className = "flex justify-between" >
        <
        span className = "text-gray-600" > Permissions < /span> <
        span className = "font-semibold" > Manage Courses < /span> <
        /div>

        <
        div className = "flex justify-between" >
        <
        span className = "text-gray-600" > Account Status < /span> <
        span className = "font-semibold text-green-600" > Active < /span> <
        /div> <
        /div>

        <
        /div> <
        /div>
    );
}

export default AdminProfile;