import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);

    const addCourse = (course) => {
        setCourses((prev) => [...prev, course]);
    };

    const removeCourse = (id) => {
        setCourses((prev) => prev.filter((c) => c.id !== id));
    };

    return ( <
        CourseContext.Provider value = {
            { courses, addCourse, removeCourse } } > { children } <
        /CourseContext.Provider>
    );
};