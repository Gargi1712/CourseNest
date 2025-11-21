import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          CourseNest
        </Link>
      </div>

      <div className="nav-buttons">
         <Link to="/">Home</Link>
         <Link to="/about">
            <button>About</button>
          </Link>
        <Link to="/my-courses">
          <button className="your-courses-btn">Your Courses</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button className="signup">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
