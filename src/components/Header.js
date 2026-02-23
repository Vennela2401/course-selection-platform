import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './Header.css';

const Header = () => {
    const location = useLocation();
    // Show Admin nav item only when logged-in user has role "admin" (Firestore: users/{uid}.role)
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                setUserRole(null);
                return;
            }
            try {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                const role = userDoc.exists() && userDoc.data().role ? userDoc.data().role : "student";
                setUserRole(role);
            } catch {
                setUserRole("student");
            }
        });
        return () => unsubscribe();
    }, []);

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return ( <
        header className = "header" >
        <
        div className = "header-container" >

        <
        Link to = "/"
        className = "logo" >
        <
        h2 > Course Selection Platform < /h2> <
        /Link>

        <
        nav className = "nav" >
        <
        Link to = "/"
        className = { `nav-link ${isActive('/')}` } >
        Home <
        /Link>

        <
        Link to = "/courses"
        className = { `nav-link ${isActive('/courses')}` } >
        Courses <
        /Link>

        <
        Link to = "/schedule"
        className = { `nav-link ${isActive('/schedule')}` } >
        Schedule <
        /Link>

        <
        Link to = "/registration"
        className = { `nav-link ${isActive('/registration')}` } >
        Registration <
        /Link>

        { userRole === "admin" && ( <
        Link to = "/admin"
        className = { `nav-link ${isActive('/admin')}` } >
        Admin <
        /Link>
        ) }

        <
        Link to = "/about"
        className = { `nav-link ${isActive('/about')}` } >
        About <
        /Link>

        { /* Updated Here */ } <
        Link to = "/login"
        className = { `nav-link ${isActive('/login')}` } >
        Sign Up / Register <
        /Link> <
        /nav>

        <
        /div> <
        /header>
    );
};

export default Header;