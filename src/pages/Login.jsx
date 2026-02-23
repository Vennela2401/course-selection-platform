import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,   // ✅ ADDED
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const redirectByRole = () => {
    if (role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  /* ===============================
     LOGIN / SIGNUP
  ================================ */
  const handleContinue = async () => {
    setError("");
    setLoading(true);

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
        redirectByRole();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully. Please login.");
        setIsLoginMode(true);
        resetForm();
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Account already exists. Please login.");
        setIsLoginMode(true);
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found. Please sign up.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     FORGOT PASSWORD (NEW)
  ================================ */
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email 📧");
    } catch (err) {
      setError(err.message);
    }
  };

  /* ===============================
     GOOGLE LOGIN
  ================================ */
  const handleGoogle = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      redirectByRole();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">

        <h2 className="text-2xl font-bold text-indigo-600 mb-2">
          Course Selection Platform
        </h2>

        <p className="text-gray-600 mb-6">
          Secure student course registration
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* ✅ FORGOT PASSWORD ADDED HERE */}
        {isLoginMode && (
          <div className="text-right mb-4">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Login as
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white"
          >
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 mb-4"
        >
          {isLoginMode ? "Login" : "Register"}
        </button>

        <div className="text-center text-gray-400 mb-4">or</div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50"
        >
          Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-center mt-6">
          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              resetForm();
            }}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            {isLoginMode
              ? "Don't have an account? Sign up"
              : "Already a user? Login"}
          </button>
        </p>

        <p className="text-xs text-gray-500 text-center mt-6">
          🔒 Your login is protected with Firebase Authentication.
        </p>
      </div>
    </div>
  );
}

export default Login;