function About() {
    return ( <
        div className = "page-container" >
        <
        div className = "about-card" >
        <
        h2 > About FSAD - PS48 < /h2>

        <
        p >
        FSAD - PS48 is an online student course selection and scheduling platform developed using React. <
        /p>

        <
        ul >
        <
        li > 👩‍🎓Students can select courses and build schedules < /li> <
        li > 🛠️Admins manage courses and registrations < /li> <
        li > ⚡Prevents scheduling conflicts < /li> <
        /ul>

        <
        p className = "tech" >
        Built with React, React Router, and modern UI principles. <
        /p> <
        /div> <
        /div>
    );
}

export default About;