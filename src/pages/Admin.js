import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Admin() {
    const navigate = useNavigate();
    const { courses = [], addCourse, removeCourse } = useCourses();

    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        day: "Monday",
        start: "",
        end: "",
    });

    /* 🔐 CHECK ADMIN ROLE */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            if (!currentUser) {
                setRole(null);
                setRoleLoading(false);
                return;
            }

            try {
                const snap = await getDoc(doc(db, "users", currentUser.uid));
                setRole(snap.exists() ? snap.data().role : "student");
            } catch {
                setRole("student");
            }

            setRoleLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /* 🚪 LOGOUT FUNCTION */
    const handleLogout = async() => {
        await signOut(auth);
        navigate("/login");
    };

    /* ➕ ADD COURSE */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!addCourse) {
            alert("CourseContext error");
            return;
        }

        addCourse({
            id: Date.now(),
            name: form.name,
            day: form.day,
            start: Number(form.start),
            end: Number(form.end),
        });

        setForm({ name: "", day: "Monday", start: "", end: "" });
    };

    /* ⏳ LOADING */
    if (roleLoading) {
        return ( <
            div className = "min-h-screen flex items-center justify-center" >
            <
            p className = "text-lg font-semibold" >
            Loading Admin Panel... <
            /p> <
            /div>
        );
    }

    /* 🚫 NOT ADMIN */
    if (role !== "admin") {
        return ( <
            div className = "min-h-screen flex items-center justify-center" >
            <
            p className = "text-xl font-semibold text-red-600" > ❌Access Denied– Admins Only <
            /p> <
            /div>
        );
    }

    /* ✅ ADMIN UI */
    return ( <
        div className = "min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8" >
        <
        div className = "max-w-6xl mx-auto" >

        { /* HEADER */ } <
        div className = "flex justify-between items-center mb-8" >
        <
        h2 className = "text-3xl font-bold text-indigo-700" > 🛠Admin Panel <
        /h2>

        <
        div className = "flex gap-3" >
        <
        button onClick = {
            () => navigate("/admin-profile") }
        className = "bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700" >
        👤Profile <
        /button>

        <
        button onClick = { handleLogout }
        className = "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" >
        🚪Logout <
        /button> <
        /div> <
        /div>

        { /* ADD COURSE CARD */ } <
        div className = "bg-white rounded-xl shadow-md p-6 mb-10" >
        <
        h3 className = "text-xl font-semibold text-gray-800 mb-4" > ➕Add New Course <
        /h3>

        <
        form onSubmit = { handleSubmit }
        className = "grid grid-cols-1 md:grid-cols-5 gap-4" >
        <
        input type = "text"
        placeholder = "Course Name"
        value = { form.name }
        onChange = {
            (e) =>
            setForm({...form, name: e.target.value })
        }
        className = "border p-2 rounded"
        required /
        >

        <
        select value = { form.day }
        onChange = {
            (e) =>
            setForm({...form, day: e.target.value })
        }
        className = "border p-2 rounded" >
        <
        option > Monday < /option> <
        option > Tuesday < /option> <
        option > Wednesday < /option> <
        option > Thursday < /option> <
        option > Friday < /option> <
        /select>

        <
        input type = "number"
        placeholder = "Start Hour"
        value = { form.start }
        onChange = {
            (e) =>
            setForm({...form, start: e.target.value })
        }
        className = "border p-2 rounded"
        required /
        >

        <
        input type = "number"
        placeholder = "End Hour"
        value = { form.end }
        onChange = {
            (e) =>
            setForm({...form, end: e.target.value })
        }
        className = "border p-2 rounded"
        required /
        >

        <
        button type = "submit"
        className = "bg-green-600 text-white rounded hover:bg-green-700" >
        Add Course <
        /button> <
        /form> <
        /div>

        { /* COURSES TABLE */ } <
        div className = "bg-white rounded-xl shadow-md p-6" >
        <
        h3 className = "text-xl font-semibold mb-4" > 📚All Courses <
        /h3>

        {
            courses.length === 0 ? ( <
                p className = "text-gray-500" >
                No courses available <
                /p>
            ) : ( <
                table className = "w-full border-collapse" >
                <
                thead >
                <
                tr className = "bg-indigo-100 text-indigo-800" >
                <
                th className = "p-3 text-left" > Course < /th> <
                th className = "p-3 text-left" > Schedule < /th> <
                th className = "p-3 text-center" > Action < /th> <
                /tr> <
                /thead>

                <
                tbody > {
                    courses.map((course) => ( <
                        tr key = { course.id }
                        className = "border-b hover:bg-gray-50" >
                        <
                        td className = "p-3 font-medium" > { course.name } <
                        /td> <
                        td className = "p-3" > { course.day }({ course.start }: 00– { course.end }: 00) <
                        /td> <
                        td className = "p-3 text-center" >
                        <
                        button onClick = {
                            () =>
                            removeCourse(course.id)
                        }
                        className = "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" >
                        Delete <
                        /button> <
                        /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table>
            )
        } <
        /div>

        <
        /div> <
        /div>
    );
}

export default Admin;