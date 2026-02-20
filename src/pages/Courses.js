import React from "react";
import { useCourses } from "../context/CourseContext";

const courseList = [
    { id: 1, name: "Data Structures", day: "Monday", start: 9, end: 11 },
    { id: 2, name: "Operating Systems", day: "Monday", start: 10, end: 12 },
    { id: 3, name: "Database Systems", day: "Tuesday", start: 14, end: 16 },
    { id: 4, name: "Computer Networks", day: "Wednesday", start: 9, end: 11 },
    { id: 5, name: "Mathematical Optimization", day: "Thursday", start: 10, end: 12 },
    { id: 6, name: "Artificial Intelligence & ML", day: "Friday", start: 14, end: 16 },
    { id: 7, name: "Software Engineering", day: "Tuesday", start: 9, end: 11 },
    { id: 8, name: "Cloud Computing", day: "Wednesday", start: 14, end: 16 },
];

function Courses() {
    const { registeredCourses, registerCourse, unregisterCourse } = useCourses();

    const isRegistered = (id) =>
        registeredCourses.some((c) => c.id === id);

    const hasConflict = (newCourse) =>
        registeredCourses.some(
            (c) =>
            c.day === newCourse.day &&
            newCourse.start < c.end &&
            newCourse.end > c.start
        );

    return ( <
        div className = "page-container" >
        <
        h2 > Available Courses < /h2>

        <
        div className = "table-wrapper" >
        <
        table className = "modern-table" >
        <
        thead >
        <
        tr >
        <
        th > Course < /th> <
        th > Action < /th> <
        /tr> <
        /thead>

        <
        tbody > {
            courseList.map((course) => ( <
                tr key = { course.id } >
                <
                td > { course.name } < /td> <
                td > {
                    isRegistered(course.id) ? ( <
                        button className = "btn danger"
                        onClick = {
                            () => unregisterCourse(course.id) } >
                        Unregister <
                        /button>
                    ) : ( <
                        button className = "btn primary"
                        onClick = {
                            () => {
                                if (hasConflict(course)) {
                                    alert("Schedule conflict detected!");
                                } else {
                                    registerCourse(course);
                                }
                            }
                        } >
                        Register <
                        /button>
                    )
                } <
                /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div> <
        /div>
    );
}

export default Courses;