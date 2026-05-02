import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const { courses } = useCourses();
  const [darkMode, setDarkMode] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const today = new Date().toLocaleString("en-US", { weekday: "long" }).toLowerCase();
  const todaysClasses = (courses || [])
    .filter((c) => {
      if (!c.section || !c.section.day) return false;
      return c.section.day.toLowerCase() === today;
    })
    .sort((a, b) => ((a.section && a.section.start) || 0) - ((b.section && b.section.start) || 0));

  const maxCredits = 24;
  const totalCredits = (courses || []).reduce((sum, c) => sum + (c.credits || 0), 0);
  const creditPercent = Math.min(100, (totalCredits / maxCredits) * 100);
  const notificationCount = todaysClasses.length;

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-indigo-50 to-purple-100"
      } py-6`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">🎓 Student Dashboard</h1>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-indigo-200 text-indigo-800 hover:bg-indigo-300"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-4 py-2 rounded-lg bg-red-200 text-red-700 hover:bg-red-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div
          className={`flex items-center gap-4 mb-8 p-6 rounded-xl shadow transition ${
            darkMode ? "bg-gray-800" : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center text-xl font-bold">
            {(user && user.name && user.name.charAt(0) && user.name.charAt(0).toUpperCase()) ||
             (user && user.email && user.email.charAt(0) && user.email.charAt(0).toUpperCase()) ||
             "U"}
          </div>

          <div>
            <h2 className="text-lg font-semibold">Welcome back 👋</h2>
            <p className={`text-sm ${darkMode ? "opacity-70" : "opacity-90"}`}>{user && user.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Registered Courses",
              value: (courses && courses.length) || 0,
              color: "text-green-600",
            },
            {
              title: "Today’s Classes",
              value: todaysClasses.length,
              color: "text-blue-600",
            },
            {
              title: "Total Credits",
              value: totalCredits,
              color: "text-purple-600",
            },
            {
              title: "Notifications",
              value: notificationCount,
              color: "text-red-600",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow transition ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <p className="text-sm opacity-70">{item.title}</p>
              <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className={`p-6 rounded-xl shadow mb-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="font-semibold mb-3">📊 Credit Utilization</h3>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${creditPercent}%` }}
            />
          </div>
          <p className="text-sm mt-2 opacity-70">{totalCredits} / {maxCredits} credits used</p>
        </div>

        <div className={`p-6 rounded-xl shadow mb-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="font-semibold mb-4">📅 Today’s Classes</h3>
          {todaysClasses.length === 0 ? (
            <p className="opacity-70">No classes today 🎉</p>
          ) : (
            <ul className="space-y-3">
              {todaysClasses.map((c) => (
                <li
                  key={c.id}
                  className={`flex justify-between p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                >
                  <span className="font-medium">{c.name}</span>
                  <span>{c.section.start}:00 – {c.section.end}:00</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-700 mb-3">📘 Courses</h3>
            <button
              onClick={() => navigate("/courses")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              View Courses →
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-semibold text-green-700 mb-3">🗓 Schedule</h3>
            <button
              onClick={() => navigate("/schedule")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              View Schedule →
            </button>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold text-purple-700 mb-3">⚙ Profile</h3>
            <button
              onClick={() => navigate("/profile")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Manage Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

