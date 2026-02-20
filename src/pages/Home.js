import { Link } from "react-router-dom";

function Home() {
    return ( <
        >
        <
        section className = "hero" >
        <
        h1 > Online Student Course Selection and Scheduling Platform < /h1> <
        p >
        Streamline your academic journey with our intuitive course selection and scheduling system. <
        /p>

        <
        div className = "hero-buttons" >
        <
        Link to = "/courses"
        className = "primary-btn" > Browse Courses < /Link> <
        Link to = "/schedule"
        className = "secondary-btn" > View Schedule < /Link> <
        /div> <
        /section>

        <
        section className = "features" >
        <
        h2 > Key Features < /h2>

        <
        div className = "feature-grid" >
        <
        div className = "card" >
        <
        h3 > Course Selection < /h3> <
        p > Easily browse and register
        for available courses. < /p> <
        /div>

        <
        div className = "card" >
        <
        h3 > Schedule Management < /h3> <
        p > Build schedules and avoid time conflicts. < /p> <
        /div>

        <
        div className = "card" >
        <
        h3 > Admin Control < /h3> <
        p > Admins manage courses and registrations. < /p> <
        /div> <
        /div> <
        /section> <
        />
    );
}

export default Home;