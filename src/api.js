import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
    withCredentials: true,
});

export const loginUser = (payload) => api.post("/api/auth/login", payload);
export const registerUser = (payload) => api.post("/api/auth/register", payload);
export const googleLogin = () => api.post("/api/auth/google");
export const forgotPassword = (email) => api.post("/api/auth/forgot-password", { email });

export const getCourses = () => api.get("/api/courses");
export const addCourseToCatalog = (course) => api.post("/api/courses", course);
export const deleteCourseFromCatalog = (courseId) => api.delete(`/api/courses/${courseId}`);

export const getStudentSchedule = (studentId) => api.get(`/api/registrations/student/${studentId}`);
export const registerStudentCourse = (studentId, courseId) =>
    api.post("/api/registrations/register", null, {
        params: { studentId, courseId },
    });
export const unregisterStudentCourse = (studentId, courseId) =>
    api.delete("/api/registrations/register", {
        params: { studentId, courseId },
    });

export default api;

