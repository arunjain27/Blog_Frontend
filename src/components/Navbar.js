import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/navbar.css';

function Navbar() {
  const [username, setUsername] = useState(Cookies.get('username') || '');
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setUsername(Cookies.get('username') || '');
    setToken(Cookies.get('token') || '');
  }, [location]);

  const handleSignOut = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('userid');
    setToken('');
    setUsername('');
    setIsMenuOpen(false);
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          Musingsss
        </NavLink>
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <ul className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink
              to="/Allblog"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              AllBlog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myblog"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              MyBlog
            </NavLink>
          </li>
          {token ? (
            <>
              <li>
                <NavLink
                  to="/addblog"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Addblog
                </NavLink>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={handleSignOut}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Signout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signin
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <span className="navbar-user">
          Signed in as: {username || 'Guest'}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
