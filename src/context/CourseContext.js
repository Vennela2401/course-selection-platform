import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
} from "firebase/firestore";

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ===============================
       AUTH LISTENER
    ================================ */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser);
            setCourses([]);
            setLoading(true);

            if (!currentUser) {
                setLoading(false);
                return;
            }

            // Load registered courses from Firestore
            const snapshot = await getDocs(
                collection(db, "users", currentUser.uid, "registeredCourses")
            );

            const loadedCourses = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setCourses(loadedCourses);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /* ===============================
       ADD COURSE (SAVE TO FIRESTORE)
    ================================ */
    const addCourse = async(course) => {
        if (!user) return;

        const courseRef = doc(
            db,
            "users",
            user.uid,
            "registeredCourses",
            course.id.toString()
        );

        await setDoc(courseRef, course);

        setCourses((prev) => [...prev, course]);
    };

    /* ===============================
       REMOVE COURSE (DELETE FROM FIRESTORE)
    ================================ */
    const removeCourse = async(id) => {
        if (!user) return;

        const courseRef = doc(
            db,
            "users",
            user.uid,
            "registeredCourses",
            id.toString()
        );

        await deleteDoc(courseRef);

        setCourses((prev) => prev.filter((c) => c.id !== id));
    };

    return ( <
        CourseContext.Provider value = {
            {
                courses,
                addCourse,
                removeCourse,
                loading,
            }
        } >
        {!loading && children } <
        /CourseContext.Provider>
    );
};