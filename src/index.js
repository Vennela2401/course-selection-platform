import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import { RegistrationProvider } from "./context/RegistrationContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render( <
    React.StrictMode >
    <
    AuthProvider >
    <
    CourseProvider >
    <
    RegistrationProvider >
    <
    App / >
    <
    /RegistrationProvider> <
    /CourseProvider> <
    /AuthProvider> <
    /React.StrictMode>
);

