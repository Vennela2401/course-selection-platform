import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";

function Profile() {
    const { user, loading } = useAuth();
    const { courses } = useCourses();

    if (loading) {
        return ( <
            div className = "min-h-screen flex items-center justify-center" >
            Loading profile... <
            /div>
        );
    }

    if (!user) {
        return <Navigate to = "/login"
        replace / > ;
    }

    const totalCredits = courses.reduce((sum, course) => sum + (course.credits || 4), 0);
    const maxCredits = 24;
    const remainingCredits = Math.max(0, maxCredits - totalCredits);
    const creditPercent = Math.min(100, (totalCredits / maxCredits) * 100);

    let loadStatus = "Light";
    if (totalCredits >= 18) loadStatus = "Heavy";
    else if (totalCredits >= 10) loadStatus = "Moderate";

    const today = new Date().toLocaleString("en-US", { weekday: "long" });
    const upcomingClass = courses.find((c) => c.day === today);

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex justify-center py-10" >
        <
        div className = "bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl" >
        <
        div className = "flex justify-between items-center mb-6" >
        <
        h2 className = "text-2xl font-bold text-indigo-700" > 🎓Academic Profile < /h2> <
        span className = "text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full" > { user.id } <
        /span> <
        /div>

        <
        div className = "flex items-center gap-5 mb-8" >
        <
        img src = { `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=6366f1&color=fff` }
        alt = "avatar"
        className = "w-20 h-20 rounded-full" /
        >
        <
        div >
        <
        p className = "text-lg font-semibold" > { user.email } < /p> <
        p className = "text-sm text-gray-500 capitalize" > Role: { user.role || "student" } < /p> <
        p className = "text-xs text-gray-400" > Account type: Backend login < /p> <
        /div> <
        /div>

        <
        div className = "grid grid-cols-3 gap-4 mb-8" >
        <
        div className = "bg-indigo-50 p-4 rounded-lg text-center" >
        <
        p className = "text-xs text-gray-500" > Courses < /p> <
        p className = "text-xl font-bold text-indigo-600" > { courses.length } < /p> <
        /div> <
        div className = "bg-green-50 p-4 rounded-lg text-center" >
        <
        p className = "text-xs text-gray-500" > Credits < /p> <
        p className = "text-xl font-bold text-green-600" > { totalCredits } < /p> <
        /div> <
        div className = "bg-yellow-50 p-4 rounded-lg text-center" >
        <
        p className = "text-xs text-gray-500" > Remaining < /p> <
        p className = "text-xl font-bold text-yellow-600" > { remainingCredits } < /p> <
        /div> <
        /div>

        <
        div className = "mb-6" >
        <
        p className = "text-sm text-gray-600 mb-2" > Credit Utilization({ loadStatus }
            Load) < /p> <
        div className = "w-full bg-gray-200 rounded-full h-3" >
        <
        div className = "bg-indigo-600 h-3 rounded-full transition-all duration-500"
        style = {
            { width: `${creditPercent}%` } }
        /> <
        /div> <
        p className = "text-xs text-gray-500 mt-1" > { totalCredits }
        / {maxCredits} credits</p >
        <
        /div>

        <
        div className = "bg-blue-50 p-4 rounded-lg mb-6" >
        <
        p className = "text-sm font-semibold text-blue-700" > 📅Upcoming Class < /p> {
            upcomingClass ? ( <
                p className = "text-sm mt-1" > { upcomingClass.name }— { upcomingClass.start }: 00 < /p>
            ) : ( <
                p className = "text-sm text-gray-500 mt-1" > No class scheduled today < /p>
            )
        } <
        /div>

        <
        div className = "text-xs text-gray-400 border-t pt-4" >
        Session is managed by the backend authentication service. <
        /div> <
        /div> <
        /div>
    );
}

export default Profile;

