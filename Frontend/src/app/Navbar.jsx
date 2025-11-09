import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const isVisualizerPage = location.pathname === '/visualizer';

  // Reset navbar visibility when navigating away from visualizer
  useEffect(() => {
    if (!isVisualizerPage) {
      setIsNavbarVisible(true);
      // Ensure scrolling is enabled when leaving visualizer
      document.body.style.overflow = 'auto';
    } else {
      setIsNavbarVisible(false);
    }
  }, [isVisualizerPage]);

  // Prevent body scroll ONLY when navbar is open on visualizer page
  useEffect(() => {
    // Only lock scroll if we're on visualizer AND navbar is visible
    if (isVisualizerPage && isNavbarVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

  }, [isVisualizerPage, isNavbarVisible]);

  const toggleNavbar = () => {
    if (isVisualizerPage) {
      setIsNavbarVisible(!isNavbarVisible);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button - Only visible in visualizer when navbar is hidden */}
      {isVisualizerPage && !isNavbarVisible && (
        <button 
          className="navbar-toggle-btn"
          onClick={toggleNavbar}
          aria-label="Open menu"
        >
          <span className="hamburger-icon">☰</span>
        </button>
      )}

      {/* Backdrop - rendered BEFORE navbar to be behind it */}
      {isVisualizerPage && isNavbarVisible && (
        <div className="navbar-backdrop" onClick={toggleNavbar}></div>
      )}

      {/* Navbar */}
      <nav className={`navbar ${isVisualizerPage ? 'navbar-overlay' : ''} ${!isNavbarVisible ? 'navbar-hidden' : ''}`}>
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src="/logo/lite-view-logo.jpg" alt="Logo" />
          </Link>
        </div>

        <ul className="navbar-links">
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/about">About</Link></li>
          {isAuthenticated && (
            <li><Link to="/visualizer">Visualizer</Link></li>
          )}
        </ul>

        <div className="navbar-right">
          {isLoading ? (
            <span>Loading...</span>
          ) : isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                className="login-btn"
                onClick={() => logout({ 
                  logoutParams: { returnTo: window.location.origin } 
                })}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button 
              className="login-btn"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          )}

          {/* Close button - Only visible in visualizer when navbar is open */}
          {isVisualizerPage && isNavbarVisible && (
            <button 
              className="navbar-close-btn"
              onClick={toggleNavbar}
              aria-label="Close menu"
            >
              ✕
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;