import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li href="/" ><img src="/logo/lite-view-logo.png" width="50"/></li>
        <li href="/" className="logo">Lite View</li>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>

        {isAuthenticated ? (
          <>
            <li>
              <button
                onClick={() =>
                  logout({ returnTo: window.location.origin })
                }
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => loginWithRedirect()}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
