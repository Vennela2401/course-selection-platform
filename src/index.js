import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CourseProvider } from "./context/CourseContext";
import "./index.css"; // ← REQUIRED for Tailwind

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render( <
    React.StrictMode >
    <
    CourseProvider >
    <
    App / >
    <
    /CourseProvider> <
    /React.StrictMode>
);