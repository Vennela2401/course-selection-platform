import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h2>Course Selection Platform</h2>
        </Link>
        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/courses" className={`nav-link ${isActive('/courses')}`}>
            Courses
          </Link>
          <Link to="/schedule" className={`nav-link ${isActive('/schedule')}`}>
            Schedule
          </Link>
          <Link to="/registration" className={`nav-link ${isActive('/registration')}`}>
            Registration
          </Link>
          <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
            Admin
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
