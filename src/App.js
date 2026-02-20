import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CourseProvider } from "./context/CourseContext";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Schedule from "./pages/Schedule";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return ( <
        CourseProvider >
        <
        Router >
        <
        Header / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/courses"
        element = { < Courses / > }
        /> <
        Route path = "/schedule"
        element = { < Schedule / > }
        /> <
        Route path = "/admin"
        element = { < Admin / > }
        /> <
        Route path = "/about"
        element = { < About / > }
        /> < /
        Routes > <
        Footer / >
        <
        /Router> < /
        CourseProvider >
    );
}

export default App;