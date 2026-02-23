import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCourses } from "../context/CourseContext";

function Profile() {
    const navigate = useNavigate();
    const { courses } = useCourses();

    const [role, setRole] = useState("student");
    const [loading, setLoading] = useState(true);

    const user = auth.currentUser;

    useEffect(() => {
        const fetchRole = async() => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists() && userSnap.data().role) {
                    setRole(userSnap.data().role);
                } else {
                    setRole("student"); // default
                }
            } catch (error) {
                console.error("Error fetching role:", error);
                setRole("student");
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [user]);

    if (loading) {
        return ( <
            div className = "min-h-screen flex items-center justify-center" >
            Loading profile... <
            /div>
        );
    }

    if (!user) {
        navigate("/login");
        return null;
    }

    // Calculate academic metrics
    const totalCredits = courses.reduce(
        (sum, course) => sum + (course.credits || 4),
        0
    );

    const maxCredits = 24;
    const remainingCredits = maxCredits - totalCredits;
    const creditPercent = (totalCredits / maxCredits) * 100;

    // Academic load level
    let loadStatus = "Light";
    if (totalCredits >= 18) loadStatus = "Heavy";
    else if (totalCredits >= 10) loadStatus = "Moderate";

    // Upcoming class logic (simple version)
    const today = new Date().toLocaleString("en-US", { weekday: "long" });
    const upcomingClass = courses.find(c => c.day === today);

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex justify-center py-10" >
        <
        div className = "bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl" >

        { /* Header */ } <
        div className = "flex justify-between items-center mb-6" >
        <
        h2 className = "text-2xl font-bold text-indigo-700" > 🎓Academic Profile <
        /h2> <
        span className = "text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full" >
        UID: { user.uid.slice(0, 6) }... <
        /span> <
        /div>

        { /* User Info */ } <
        div className = "flex items-center gap-5 mb-8" >
        <
        img src = { `https://ui-avatars.com/api/?name=${user.email}&background=6366f1&color=fff` }
        alt = "avatar"
        className = "w-20 h-20 rounded-full" /
        >
        <
        div >
        <
        p className = "text-lg font-semibold" > { user.email } < /p> <
        p className = "text-sm text-gray-500 capitalize" >
        Role: { role } <
        /p> <
        p className = "text-xs text-gray-400" >
        Email Verified: { user.emailVerified ? "Yes" : "No" } <
        /p> <
        /div> <
        /div>

        { /* Academic Metrics */ } <
        div className = "grid grid-cols-3 gap-4 mb-8" >
        <
        div className = "bg-indigo-50 p-4 rounded-lg text-center" >
        <
        p className = "text-xs text-gray-500" > Courses < /p> <
        p className = "text-xl font-bold text-indigo-600" > { courses.length } <
        /p> <
        /div>

        <
        div className = "bg-green-50 p-4 rounded-lg text-center" >
        <
        p className = "text-xs text-gray-500" > Credits < /p> <
        p className = "text-xl font-bold text-green-600" > { totalCredits } <
        /p> <
        /div>

        <
        div className = "bg-yellow-50 p-4 rounded-lg text-center" >
        <
        p className = "text-xs text-gray-500" > Remaining < /p> <
        p className = "text-xl font-bold text-yellow-600" > { remainingCredits } <
        /p> <
        /div> <
        /div>

        { /* Credit Progress */ } <
        div className = "mb-6" >
        <
        p className = "text-sm text-gray-600 mb-2" >
        Credit Utilization({ loadStatus }
            Load) <
        /p> <
        div className = "w-full bg-gray-200 rounded-full h-3" >
        <
        div className = "bg-indigo-600 h-3 rounded-full transition-all duration-500"
        style = {
            { width: `${creditPercent}%` } } >
        < /div> <
        /div> <
        p className = "text-xs text-gray-500 mt-1" > { totalCredits }
        / {maxCredits} credits <
        /p> <
        /div>

        { /* Upcoming Class */ } <
        div className = "bg-blue-50 p-4 rounded-lg mb-6" >
        <
        p className = "text-sm font-semibold text-blue-700" > 📅Upcoming Class <
        /p> {
            upcomingClass ? ( <
                p className = "text-sm mt-1" > { upcomingClass.name }— { upcomingClass.start }: 00 <
                /p>
            ) : ( <
                p className = "text-sm text-gray-500 mt-1" >
                No class scheduled today <
                /p>
            )
        } <
        /div>

        { /* System Info */ } <
        div className = "text-xs text-gray-400 border-t pt-4" >
        Last Login: { new Date(user.metadata.lastSignInTime).toLocaleString() } <
        /div> <
        /div> <
        /div>
    );
}

export default Profile;