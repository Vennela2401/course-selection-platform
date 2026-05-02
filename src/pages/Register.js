import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { user, loading, register, error, setError } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingLocal, setLoadingLocal] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            navigate(user.role === "admin" ? "/admin" : "/dashboard");
        }
    }, [user, loading, navigate]);

    const handleRegister = async(e) => {
        e.preventDefault();
        setError(null);
        setLoadingLocal(true);
        try {
            const response = await register({
                email,
                password,
                role: "Student",
                name: email.split("@")[0],
            });
            if (response && response.data && response.data.user) {
                navigate("/dashboard");
            }
        } catch (err) {
            // handled in AuthContext
        } finally {
            setLoadingLocal(false);
        }
    };

    return ( <
        div className = "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center" >
        <
        form onSubmit = { handleRegister }
        className = "bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100" >
        <
        h2 className = "text-2xl font-bold text-indigo-600 mb-4" > Create an Account < /h2> {
            error && ( <
                p className = "mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" > { error } <
                /p>
            )
        } <
        div className = "mb-4" >
        <
        label className = "block text-sm font-medium text-gray-700 mb-1" > Email < /label> <
        input type = "email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value) }
        className = "w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
        required /
        >
        <
        /div> <
        div className = "mb-6" >
        <
        label className = "block text-sm font-medium text-gray-700 mb-1" > Password < /label> <
        input type = "password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        className = "w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
        required minLength = { 6 }
        /> <
        /div> <
        button type = "submit"
        disabled = { loadingLocal }
        className = "w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700" >
        Register <
        /button> <
        /form> <
        /div>
    );
}

export default Register;

