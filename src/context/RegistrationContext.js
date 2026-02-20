import React, { createContext, useContext, useState, useEffect } from 'react';

const RegistrationContext = createContext();

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

export const RegistrationProvider = ({ children }) => {
  const [registeredCourses, setRegisteredCourses] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('registeredCourses');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever registeredCourses changes
  useEffect(() => {
    localStorage.setItem('registeredCourses', JSON.stringify(registeredCourses));
  }, [registeredCourses]);

  const registerCourse = (course) => {
    setRegisteredCourses(prev => {
      // Check if course is already registered
      if (prev.find(c => c.id === course.id)) {
        return prev;
      }
      return [...prev, course];
    });
  };

  const unregisterCourse = (courseId) => {
    setRegisteredCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const isRegistered = (courseId) => {
    return registeredCourses.some(c => c.id === courseId);
  };

  const clearAllRegistrations = () => {
    setRegisteredCourses([]);
  };

  const value = {
    registeredCourses,
    registerCourse,
    unregisterCourse,
    isRegistered,
    clearAllRegistrations
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
