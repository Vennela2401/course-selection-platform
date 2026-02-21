import React from "react";
import { useCourses } from "../context/CourseContext";

const timeSlots = [
    { label: "9:00 - 11:00", start: 9, end: 11 },
    { label: "10:00 - 12:00", start: 10, end: 12 },
    { label: "14:00 - 16:00", start: 14, end: 16 },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Schedule() {
    const { courses } = useCourses();

    const getCourseForSlot = (day, slot) => {
        return courses.find(
            (c) =>
            c.day === day &&
            c.start === slot.start &&
            c.end === slot.end
        );
    };

    return ( <
        div className = "page-container" >
        <
        h2 > Weekly Timetable < /h2>

        <
        table className = "modern-table" >
        <
        thead >
        <
        tr >
        <
        th > Time < /th> {
            days.map((day) => ( <
                th key = { day } > { day } < /th>
            ))
        } <
        /tr> <
        /thead>

        <
        tbody > {
            timeSlots.map((slot) => ( <
                tr key = { slot.label } >
                <
                td > { slot.label } < /td>

                {
                    days.map((day) => {
                        const course = getCourseForSlot(day, slot);
                        return ( <
                            td key = { day } > {
                                course ? ( <
                                    span className = "time-badge" > { course.name } <
                                    /span>
                                ) : (
                                    "-"
                                )
                            } <
                            /td>
                        );
                    })
                } <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
}

export default Schedule;