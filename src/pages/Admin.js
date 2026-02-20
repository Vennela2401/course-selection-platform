import React, { useState } from "react";
import { useCourses } from "../context/CourseContext";

function Admin() {
    const { courses = [], addCourse, removeCourse } = useCourses();

    const [form, setForm] = useState({
        name: "",
        day: "Monday",
        start: "",
        end: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCourse = {
            id: Date.now(),
            name: form.name,
            day: form.day,
            start: parseInt(form.start),
            end: parseInt(form.end),
        };

        addCourse(newCourse);

        setForm({
            name: "",
            day: "Monday",
            start: "",
            end: "",
        });
    };

    return ( <
        div className = "page-container" >
        <
        h2 > Admin Panel < /h2>

        <
        div className = "table-wrapper" >
        <
        h3 > Add New Course < /h3>

        <
        form onSubmit = { handleSubmit }
        style = {
            { marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" } } >
        <
        input type = "text"
        placeholder = "Course Name"
        value = { form.name }
        onChange = {
            (e) =>
            setForm({...form, name: e.target.value })
        }
        required /
        >

        <
        select value = { form.day }
        onChange = {
            (e) =>
            setForm({...form, day: e.target.value })
        } >
        <
        option > Monday < /option> <
        option > Tuesday < /option> <
        option > Wednesday < /option> <
        option > Thursday < /option> <
        option > Friday < /option> <
        /select>

        <
        input type = "number"
        placeholder = "Start Hour"
        value = { form.start }
        onChange = {
            (e) =>
            setForm({...form, start: e.target.value })
        }
        required /
        >

        <
        input type = "number"
        placeholder = "End Hour"
        value = { form.end }
        onChange = {
            (e) =>
            setForm({...form, end: e.target.value })
        }
        required /
        >

        <
        button className = "btn primary"
        type = "submit" >
        Add Course <
        /button> <
        /form>

        <
        h3 > All Courses < /h3>

        {
            courses.length === 0 ? ( <
                p > No courses available. < /p>
            ) : ( <
                table className = "modern-table" >
                <
                thead >
                <
                tr >
                <
                th > Course < /th> <
                th > Schedule < /th> <
                th > Remove < /th> <
                /tr> <
                /thead> <
                tbody > {
                    courses.map((course) => ( <
                        tr key = { course.id } >
                        <
                        td > { course.name } < /td> <
                        td > { course.day }({ course.start }: 00 - { course.end }: 00) <
                        /td> <
                        td >
                        <
                        button className = "btn danger"
                        onClick = {
                            () => removeCourse(course.id) } >
                        Delete <
                        /button> <
                        /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table>
            )
        } <
        /div> <
        /div>
    );
}

export default Admin;