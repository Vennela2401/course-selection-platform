import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CourseProvider } from "./context/CourseContext";

/* Pages */
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Schedule from "./pages/Schedule";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/AdminProfile";
import AdminDashboard from "./pages/AdminDashboard";

/* Components */
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute, {
    ProtectedAdminRoute,
} from "./components/ProtectedRoute";

function App() {
    return ( <
        CourseProvider >
        <
        Router >
        <
        Header / >

        <
        Routes > { /* ========== PUBLIC ROUTES ========== */ } <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/about"
        element = { < About / > }
        />

        { /* ========== STUDENT PROTECTED ROUTES ========== */ } <
        Route path = "/dashboard"
        element = { <
            ProtectedRoute >
            <
            Dashboard / >
            <
            /ProtectedRoute>
        }
        />

        <
        Route path = "/profile"
        element = { <
            ProtectedRoute >
            <
            Profile / >
            <
            /ProtectedRoute>
        }
        />

        <
        Route path = "/courses"
        element = { <
            ProtectedRoute >
            <
            Courses / >
            <
            /ProtectedRoute>
        }
        />

        <
        Route path = "/schedule"
        element = { <
            ProtectedRoute >
            <
            Schedule / >
            <
            /ProtectedRoute>
        }
        />

        { /* ========== ADMIN PROTECTED ROUTES ========== */ } <
        Route path = "/admin"
        element = { <
            ProtectedAdminRoute >
            <
            Admin / >
            <
            /ProtectedAdminRoute>
        }
        />

        <
        Route path = "/admin-dashboard"
        element = { <
            ProtectedAdminRoute >
            <
            AdminDashboard / >
            <
            /ProtectedAdminRoute>
        }
        />

        <
        Route path = "/admin-profile"
        element = { <
            ProtectedAdminRoute >
            <
            AdminProfile / >
            <
            /ProtectedAdminRoute>
        }
        /> <
        /Routes>

        <
        Footer / >
        <
        /Router> <
        /CourseProvider>
    );
}

export default App;