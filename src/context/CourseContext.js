import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export function CourseProvider({ children }) {
    const [registeredCourses, setRegisteredCourses] = useState([]);

    const registerCourse = (course) => {
        setRegisteredCourses([...registeredCourses, course]);
    };

    const unregisterCourse = (id) => {
        setRegisteredCourses(
            registeredCourses.filter((c) => c.id !== id)
        );
    };

    return ( <
        CourseContext.Provider value = {
            { registeredCourses, registerCourse, unregisterCourse } } >
        { children } <
        /CourseContext.Provider>
    );
}

export const useCourses = () => useContext(CourseContext);