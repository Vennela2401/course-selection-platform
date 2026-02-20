import React from 'react';
import { useRegistration } from '../context/RegistrationContext';
import { getAllConflicts } from '../utils/conflictDetection';
import CourseCard from '../components/CourseCard';
import './Registration.css';

const Registration = () => {
  const { registeredCourses, clearAllRegistrations } = useRegistration();
  const conflicts = getAllConflicts(registeredCourses);

  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to unregister from all courses?')) {
      clearAllRegistrations();
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-header">
        <h1>My Registrations</h1>
        <p>Manage your registered courses</p>
      </div>

      {registeredCourses.length === 0 ? (
        <div className="no-registrations">
          <p>You haven't registered for any courses yet.</p>
          <p>Visit the <a href="/courses">Courses</a> page to register for courses.</p>
        </div>
      ) : (
        <>
          <div className="registration-summary">
            <div className="summary-card">
              <h3>Total Courses</h3>
              <p className="summary-value">{registeredCourses.length}</p>
            </div>
            <div className="summary-card">
              <h3>Total Credits</h3>
              <p className="summary-value">{totalCredits}</p>
            </div>
            <div className="summary-card">
              <h3>Conflicts</h3>
              <p className={`summary-value ${conflicts.length > 0 ? 'has-conflict' : ''}`}>
                {conflicts.length}
              </p>
            </div>
            <div className="summary-card">
              <button className="btn btn-danger" onClick={handleClearAll}>
                Clear All
              </button>
            </div>
          </div>

          {conflicts.length > 0 && (
            <div className="conflicts-warning">
              <h3>⚠️ Schedule Conflicts Detected</h3>
              <p>The following courses have overlapping schedules:</p>
              <ul>
                {conflicts.map((conflict, index) => (
                  <li key={index}>
                    <strong>{conflict.course1.code}</strong> ({conflict.course1.schedule.days.join(', ')} {conflict.course1.schedule.time}) 
                    conflicts with 
                    <strong> {conflict.course2.code}</strong> ({conflict.course2.schedule.days.join(', ')} {conflict.course2.schedule.time})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="registered-courses">
            <h2>Registered Courses ({registeredCourses.length})</h2>
            <div className="courses-grid">
              {registeredCourses.map(course => (
                <CourseCard key={course.id} course={course} showRegisterButton={true} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Registration;
