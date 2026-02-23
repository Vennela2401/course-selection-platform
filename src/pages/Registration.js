import React from "react";
import { useCourses } from "../context/CourseContext";

function Registration() {
    const { courses, removeCourse } = useCourses();

    return ( <
        div className = "page-container" >
        <
        h2 > My Registered Courses < /h2>

        {
            courses.length === 0 ? ( <
                p > No courses registered yet. < /p>
            ) : ( <
                table className = "modern-table" >
                <
                thead >
                <
                tr >
                <
                th > Course < /th> <
                th > Day < /th> <
                th > Time < /th> <
                th > Action < /th> < /
                tr > <
                /thead> <
                tbody > {
                    courses.map((course) => ( <
                        tr key = { course.id } >
                        <
                        td > { course.name } < /td> <
                        td > { course.day } < /td> <
                        td > { course.start }: 00 - { course.end }: 00 <
                        /td> <
                        td >
                        <
                        button className = "btn danger"
                        onClick = {
                            () => removeCourse(course.id)
                        } >
                        Remove <
                        /button> < /
                        td > <
                        /tr>
                    ))
                } <
                /tbody> < /
                table >
            )
        } <
        /div>
    );
}

export default Registration;