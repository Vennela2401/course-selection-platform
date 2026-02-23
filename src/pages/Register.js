import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async(e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User created successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    return ( <
        form onSubmit = { handleRegister } >
        <
        input type = "email"
        placeholder = "Email"
        onChange = {
            (e) => setEmail(e.target.value) }
        required /
        >
        <
        input type = "password"
        placeholder = "Password (min 6 chars)"
        onChange = {
            (e) => setPassword(e.target.value) }
        required /
        >
        <
        button type = "submit" > Sign Up < /button> <
        /form>
    );
}

export default Register;