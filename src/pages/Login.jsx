import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const {
    user,
    loading,
    login,
    register,
    googleLogin,
    forgotPassword,
    error,
    setError,
  } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [loadingLocal, setLoadingLocal] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, loading, navigate]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };

  const redirectByRole = (roleFromUser) => {
    const normalizedRole = (roleFromUser || role || "student").toLowerCase();
    if (normalizedRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  const handleContinue = async () => {
    setError(null);
    setLoadingLocal(true);
    try {
      if (isLoginMode) {
        const response = await login({ email, password });
        const roleFromUser = response.data && response.data.user && response.data.user.role;
        redirectByRole(roleFromUser);
      } else {
        const response = await register({
          email,
          password,
          role,
          name: email.split("@")[0],
        });
        const roleFromUser = response.data && response.data.user && response.data.user.role;
        redirectByRole(roleFromUser);
      }
    } catch (err) {
      // error is handled in AuthContext
    } finally {
      setLoadingLocal(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    try {
      await forgotPassword(email);
      alert("Password reset link sent to your email 📧");
    } catch (err) {
      // error is handled in auth context
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoadingLocal(true);
    try {
      const googleUser = await googleLogin();
      redirectByRole(googleUser.role);
    } catch (err) {
      // error is handled in auth context
    } finally {
      setLoadingLocal(false);
    }
  };

  if (!loading && user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">
          Course Selection Platform
        </h2>

        <p className="text-gray-600 mb-6">Secure student course registration</p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

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

        {!isLoginMode && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Register as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white"
            >
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={loadingLocal}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 mb-4"
        >
          {isLoginMode ? "Login" : "Register"}
        </button>

        <div className="text-center text-gray-400 mb-4">or</div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loadingLocal}
          className="w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <p className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              resetForm();
            }}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            {isLoginMode ? "Don't have an account? Sign up" : "Already a user? Login"}
          </button>
        </p>

        <p className="text-xs text-gray-500 text-center mt-6">
          🔒 Your login is now connected to the backend API.
        </p>
      </div>
    </div>
  );
}

export default Login;

