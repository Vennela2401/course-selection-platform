import React, { useState } from "react";
import { useCourses } from "../context/CourseContext";

/* ================= COURSE DATA ================= */
const courseList = [{
        id: 1,
        name: "Data Structures",
        credits: 4,
        type: "Core",
        sections: [
            { sec: "A", day: "Monday", start: 9, end: 11, seats: 60 },
            { sec: "B", day: "Monday", start: 11, end: 13, seats: 80 },
            { sec: "C", day: "Tuesday", start: 9, end: 11, seats: 40 },
            { sec: "D", day: "Wednesday", start: 9, end: 11, seats: 55 },
            { sec: "E", day: "Thursday", start: 14, end: 16, seats: 70 },
            { sec: "F", day: "Friday", start: 10, end: 12, seats: 65 },
        ],
    },
    {
        id: 2,
        name: "Operating Systems",
        credits: 4,
        type: "Core",
        sections: [
            { sec: "A", day: "Monday", start: 10, end: 12, seats: 55 },
            { sec: "B", day: "Tuesday", start: 10, end: 12, seats: 80 },
            { sec: "C", day: "Wednesday", start: 10, end: 12, seats: 65 },
            { sec: "D", day: "Thursday", start: 9, end: 11, seats: 60 },
            { sec: "E", day: "Friday", start: 11, end: 13, seats: 70 },
            { sec: "F", day: "Saturday", start: 9, end: 11, seats: 50 },
        ],
    },
    {
        id: 3,
        name: "Database Systems",
        credits: 3,
        type: "Core",
        sections: [
            { sec: "A", day: "Tuesday", start: 14, end: 16, seats: 70 },
            { sec: "B", day: "Wednesday", start: 14, end: 16, seats: 80 },
            { sec: "C", day: "Thursday", start: 14, end: 16, seats: 50 },
            { sec: "D", day: "Monday", start: 9, end: 11, seats: 60 },
            { sec: "E", day: "Friday", start: 9, end: 11, seats: 65 },
            { sec: "F", day: "Saturday", start: 10, end: 12, seats: 55 },
        ],
    },
    {
        id: 4,
        name: "Computer Networks",
        credits: 4,
        type: "Core",
        sections: [
            { sec: "A", day: "Wednesday", start: 9, end: 11, seats: 60 },
            { sec: "B", day: "Thursday", start: 9, end: 11, seats: 80 },
            { sec: "C", day: "Friday", start: 11, end: 13, seats: 70 },
            { sec: "D", day: "Monday", start: 14, end: 16, seats: 55 },
            { sec: "E", day: "Tuesday", start: 14, end: 16, seats: 65 },
            { sec: "F", day: "Saturday", start: 9, end: 11, seats: 50 },
        ],
    },
    {
        id: 5,
        name: "Mathematical Optimization",
        credits: 3,
        type: "Elective",
        sections: [
            { sec: "A", day: "Thursday", start: 10, end: 12, seats: 60 },
            { sec: "B", day: "Friday", start: 10, end: 12, seats: 80 },
            { sec: "C", day: "Monday", start: 14, end: 16, seats: 55 },
            { sec: "D", day: "Tuesday", start: 9, end: 11, seats: 65 },
            { sec: "E", day: "Wednesday", start: 11, end: 13, seats: 70 },
            { sec: "F", day: "Saturday", start: 10, end: 12, seats: 50 },
        ],
    },
    {
        id: 6,
        name: "Artificial Intelligence & ML",
        credits: 4,
        type: "Elective",
        sections: [
            { sec: "A", day: "Friday", start: 14, end: 16, seats: 75 },
            { sec: "B", day: "Monday", start: 14, end: 16, seats: 80 },
            { sec: "C", day: "Tuesday", start: 10, end: 12, seats: 65 },
            { sec: "D", day: "Wednesday", start: 9, end: 11, seats: 60 },
            { sec: "E", day: "Thursday", start: 11, end: 13, seats: 70 },
            { sec: "F", day: "Saturday", start: 9, end: 11, seats: 55 },
        ],
    },
    {
        id: 7,
        name: "Software Engineering",
        credits: 3,
        type: "Core",
        sections: [
            { sec: "A", day: "Tuesday", start: 9, end: 11, seats: 60 },
            { sec: "B", day: "Wednesday", start: 9, end: 11, seats: 80 },
            { sec: "C", day: "Thursday", start: 14, end: 16, seats: 65 },
            { sec: "D", day: "Friday", start: 11, end: 13, seats: 70 },
            { sec: "E", day: "Monday", start: 10, end: 12, seats: 55 },
            { sec: "F", day: "Saturday", start: 10, end: 12, seats: 50 },
        ],
    },
    {
        id: 8,
        name: "Cloud Computing",
        credits: 3,
        type: "Elective",
        sections: [
            { sec: "A", day: "Wednesday", start: 14, end: 16, seats: 70 },
            { sec: "B", day: "Thursday", start: 14, end: 16, seats: 80 },
            { sec: "C", day: "Monday", start: 9, end: 11, seats: 60 },
            { sec: "D", day: "Tuesday", start: 11, end: 13, seats: 65 },
            { sec: "E", day: "Friday", start: 9, end: 11, seats: 70 },
            { sec: "F", day: "Saturday", start: 10, end: 12, seats: 50 },
        ],
    },
];

/* ================= COMPONENT ================= */
function Courses() {
    const { courses, addCourse, removeCourse } = useCourses();
    const [selectedSections, setSelectedSections] = useState({});

    const totalCredits = courses.reduce(
        (sum, c) => sum + c.credits,
        0
    );

    const isRegistered = (id) =>
        courses.some((c) => c.id === id);

    const hasConflict = (newSec) =>
        courses.some(
            (c) =>
            c.section &&
            c.section.day === newSec.day &&
            newSec.start < c.section.end &&
            newSec.end > c.section.start
        );

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-10" >
        <
        h2 className = "text-3xl font-bold text-center text-indigo-700 mb-2" > 📚Available Courses <
        /h2>

        <
        p className = "text-center text-gray-600 mb-8" >
        Registered Credits: < b > { totalCredits } < /b> /
        24 <
        /p>

        <
        div className = "max-w-6xl mx-auto grid gap-8" > {
            courseList.map((course) => {
                const selected = selectedSections[course.id];

                return ( <
                    div key = { course.id }
                    className = "relative bg-white rounded-2xl shadow-lg border overflow-hidden" >
                    <
                    div className = { `absolute left-0 top-0 h-full w-2 ${
                  course.type === "Core"
                    ? "bg-indigo-500"
                    : "bg-purple-500"
                }` }
                    />

                    <
                    div className = "p-6 pl-8" >
                    <
                    div className = "flex justify-between mb-4" >
                    <
                    h3 className = "text-xl font-bold" > { course.name } <
                    /h3> <
                    span className = "px-3 py-1 text-xs rounded-full bg-gray-100" > { course.type } <
                    /span> <
                    /div>

                    <
                    div className = "flex gap-3 mb-4 text-sm" >
                    <
                    span className = "bg-green-100 text-green-700 px-3 py-1 rounded-full" > 🎓{ course.credits }
                    Credits <
                    /span> <
                    span className = "bg-gray-100 px-3 py-1 rounded-full" >
                    Sections: { course.sections.length } <
                    /span> <
                    /div>

                    <
                    select className = "border p-3 rounded-lg w-full md:w-1/2 mb-4"
                    value = { selected ? selected.sec : "" }
                    onChange = {
                        (e) => {
                            const sec = course.sections.find(
                                (s) => s.sec === e.target.value
                            );
                            setSelectedSections({
                                ...selectedSections,
                                [course.id]: sec,
                            });
                        }
                    } >
                    <
                    option value = "" > Select Section < /option> {
                        course.sections.map((s) => ( <
                            option key = { s.sec }
                            value = { s.sec }
                            disabled = { s.seats >= 80 } >
                            Sec { s.sec }— { s.day }({ s.start }: 00 - { s.end }: 00) { s.seats >= 80 ? " [FULL]" : "" } <
                            /option>
                        ))
                    } <
                    /select>

                    {
                        isRegistered(course.id) ? ( <
                            button onClick = {
                                () => removeCourse(course.id) }
                            className = "bg-red-100 text-red-600 px-6 py-2 rounded-xl" >
                            Unregister <
                            /button>
                        ) : ( <
                            button onClick = {
                                () => {
                                    if (!selected)
                                        return alert("Select a section");
                                    if (selected.seats >= 80)
                                        return alert("Section full");
                                    if (hasConflict(selected))
                                        return alert("Schedule conflict");
                                    if (totalCredits + course.credits > 24)
                                        return alert("Credit limit exceeded");

                                    addCourse({
                                        ...course,
                                        section: selected,
                                    });
                                }
                            }
                            className = "bg-green-600 text-white px-6 py-2 rounded-xl" >
                            Register <
                            /button>
                        )
                    } <
                    /div> <
                    /div>
                );
            })
        } <
        /div> <
        /div>
    );
}

export default Courses;