import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  // Initialize login state from localStorage synchronously
  const token = localStorage.getItem('token');
  const [isLoggedIn] = useState(!!token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // simple way to reset login state
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          BlogApp
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/create" className="nav-link">
            Create Post
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-button">
                Login
              </Link>
              <Link to="/register" className="nav-button">
                Register
              </Link>
            </>
          ) : (
            <button className="nav-button logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
