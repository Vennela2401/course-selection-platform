import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CourseProvider } from "./context/CourseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render( <
    CourseProvider >
    <
    App / >
    <
    /CourseProvider>
);