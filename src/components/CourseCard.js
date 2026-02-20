import React from 'react';
import { useRegistration } from '../context/RegistrationContext';
import { hasConflictWithList } from '../utils/conflictDetection';
import './CourseCard.css';

const CourseCard = ({ course, showRegisterButton = true }) => {
  const { registerCourse, unregisterCourse, isRegistered, registeredCourses } = useRegistration();
  const registered = isRegistered(course.id);
  const hasConflict = hasConflictWithList(course, registeredCourses);
  const isFull = course.enrolled >= course.capacity;

  const handleRegister = () => {
    if (hasConflict) {
      alert(`Warning: This course conflicts with your registered courses!`);
      return;
    }
    if (isFull) {
      alert('This course is full!');
      return;
    }
    registerCourse(course);
  };

  const handleUnregister = () => {
    unregisterCourse(course.id);
  };

  return (
    <div className={`course-card ${hasConflict && registered ? 'has-conflict' : ''}`}>
      <div className="course-header">
        <h3 className="course-code">{course.code}</h3>
        <span className={`status-badge ${isFull ? 'full' : 'available'}`}>
          {isFull ? 'Full' : `${course.capacity - course.enrolled} spots left`}
        </span>
      </div>
      <h4 className="course-name">{course.name}</h4>
      <div className="course-info">
        <p className="instructor">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="credits">
          <strong>Credits:</strong> {course.credits}
        </p>
        {course.schedule && (
          <div className="schedule-info">
            <p><strong>Days:</strong> {course.schedule.days.join(', ')}</p>
            <p><strong>Time:</strong> {course.schedule.time}</p>
            <p><strong>Room:</strong> {course.schedule.room}</p>
          </div>
        )}
        {course.description && (
          <p className="description">{course.description}</p>
        )}
      </div>
      {hasConflict && registered && (
        <div className="conflict-warning">
          ⚠️ Schedule conflict detected!
        </div>
      )}
      {showRegisterButton && (
        <div className="course-actions">
          {registered ? (
            <button
              className="btn btn-danger"
              onClick={handleUnregister}
            >
              Unregister
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleRegister}
              disabled={isFull}
            >
              {isFull ? 'Course Full' : 'Register'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;
