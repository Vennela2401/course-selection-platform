import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Header.css";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // 🔔 Notification states
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    // Example notifications (later you can fetch from backend)
    const notifications = [
        "📢 Data Structures class at 9:00 AM",
        "✅ Course registered successfully"
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser);

            if (!currentUser) {
                setUserRole(null);
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                const role =
                    userDoc.exists() && userDoc.data().role ?
                    userDoc.data().role :
                    "student";
                setUserRole(role);
            } catch {
                setUserRole("student");
            }
        });

        return () => unsubscribe();
    }, []);

    // Close notification dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(e.target)
            ) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isActive = (path) =>
        location.pathname === path ? "active-link" : "";

    const handleLogout = async() => {
        await signOut(auth);
        setSidebarOpen(false);
        navigate("/login");
    };

    return ( <
        > { /* ===== HEADER ===== */ } <
        header className = "header" >
        <
        div className = "header-left" > {
            user && ( <
                span className = "hamburger"
                onClick = {
                    () => setSidebarOpen(true) } >
                ☰
                <
                /span>
            )
        }

        <
        Link to = "/"
        className = "logo" >
        Course Selection Platform <
        /Link> <
        /div>

        { /* ===== HEADER RIGHT ===== */ } {
            user && ( <
                div className = "header-right"
                ref = { notificationRef } > { /* 🔔 Notification Bell */ } <
                div className = "bell"
                onClick = {
                    () =>
                    setShowNotifications(!showNotifications)
                } >
                🔔{
                    notifications.length > 0 && ( <
                        span className = "badge" > { notifications.length } <
                        /span>
                    )
                } <
                /div>

                { /* 🔽 Notification Dropdown */ } {
                    showNotifications && ( <
                        div className = "notification-dropdown" >
                        <
                        p className = "notification-title" >
                        Notifications <
                        /p>

                        {
                            notifications.length === 0 ? ( <
                                p className = "notification-empty" >
                                No new notifications <
                                /p>
                            ) : (
                                notifications.map((note, index) => ( <
                                    div key = { index }
                                    className = "notification-item" >
                                    { note } <
                                    /div>
                                ))
                            )
                        } <
                        /div>
                    )
                } <
                /div>
            )
        } <
        /header>

        { /* ===== SIDEBAR ===== */ } {
            sidebarOpen && ( <
                >
                <
                div className = "overlay"
                onClick = {
                    () => setSidebarOpen(false) } >
                < /div>

                <
                div className = "sidebar" >
                <
                h2 className = "sidebar-title" > Student Panel < /h2>

                <
                Link to = "/dashboard"
                className = { `sidebar-link dashboard ${isActive(
                                "/dashboard"
                            )}` }
                onClick = {
                    () => setSidebarOpen(false) } >
                🏠Dashboard <
                /Link>

                <
                Link to = "/courses"
                className = { `sidebar-link courses ${isActive(
                                "/courses"
                            )}` }
                onClick = {
                    () => setSidebarOpen(false) } >
                📚Courses <
                /Link>

                <
                Link to = "/schedule"
                className = { `sidebar-link schedule ${isActive(
                                "/schedule"
                            )}` }
                onClick = {
                    () => setSidebarOpen(false) } >
                🗓Schedule <
                /Link>

                <
                Link to = "/profile"
                className = { `sidebar-link profile ${isActive(
                                "/profile"
                            )}` }
                onClick = {
                    () => setSidebarOpen(false) } >
                👤Profile <
                /Link>

                {
                    userRole === "admin" && ( <
                        Link to = "/admin"
                        className = { `sidebar-link admin ${isActive(
                                    "/admin"
                                )}` }
                        onClick = {
                            () => setSidebarOpen(false) } >
                        ⚙Admin <
                        /Link>
                    )
                }

                <
                button className = "logout-btn"
                onClick = { handleLogout } >
                🚪Logout <
                /button> <
                /div> <
                />
            )
        } <
        />
    );
};

export default Header;