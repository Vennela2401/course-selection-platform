import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
    getCourses,
    getStudentSchedule,
    registerStudentCourse,
    unregisterStudentCourse,
    addCourseToCatalog,
    deleteCourseFromCatalog as deleteCourseCatalogApi,
} from "../api";

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async() => {
            setLoading(true);
            try {
                const courseResponse = await getCourses();
                setAvailableCourses(courseResponse.data || []);

                if (user && user.id) {
                    const scheduleResponse = await getStudentSchedule(user.id);
                    setCourses(scheduleResponse.data || []);
                } else {
                    setCourses([]);
                }
            } catch (err) {
                console.error(err);
                setError((err && err.response && err.response.data) || err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, [user]);

    const addCourse = async(course) => {
        if (!user || !user.id) {
            throw new Error("Please login to register for courses.");
        }

        await registerStudentCourse(user.id, course.id);
        setCourses((prev) => [...prev, course]);
    };

    const removeCourse = async(courseId) => {
        if (!user || !user.id) {
            throw new Error("Please login to unregister from courses.");
        }

        await unregisterStudentCourse(user.id, courseId);
        setCourses((prev) => prev.filter((c) => c.id !== courseId));
    };

    const createCourse = async(course) => {
        const response = await addCourseToCatalog(course);
        setAvailableCourses((prev) => [...prev, response.data]);
        return response.data;
    };

    const deleteCourseFromCatalog = async(courseId) => {
        await deleteCourseCatalogApi(courseId);
        setAvailableCourses((prev) => prev.filter((c) => c.id !== courseId));
        setCourses((prev) => prev.filter((c) => c.id !== courseId));
    };

    return ( <
        CourseContext.Provider value = {
            {
                courses,
                availableCourses,
                addCourse,
                removeCourse,
                createCourse,
                deleteCourseFromCatalog,
                loading,
                error,
            }
        } >
        {!loading && children } <
        /CourseContext.Provider>
    );
};

