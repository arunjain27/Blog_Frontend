import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTheme } from '../hooks/useTheme';
import '../css/navbar.css';

function Navbar() {
  const [username, setUsername] = useState(Cookies.get('username') || '');
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setUsername(Cookies.get('username') || '');
    setToken(Cookies.get('token') || '');
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-icon">✍️</span>
          <span className="brand-text">Musingsss</span>
        </NavLink>
        
        <button 
          className="navbar-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <ul className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink
              to="/Allblog"
              className="nav-link"
              onClick={closeMenu}
            >
              All Blogs
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/myblog"
                className="nav-link"
                onClick={closeMenu}
              >
                My Blogs
              </NavLink>
            </li>
          )}
          {token ? (
            <>
              <li>
                <NavLink
                  to="/addblog"
                  className="nav-link nav-link-primary"
                  onClick={closeMenu}
                >
                  Write
                </NavLink>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/signin"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="nav-link nav-link-primary"
                  onClick={closeMenu}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          {username && (
            <li className="navbar-user">
              {username}
            </li>
          )}
        </ul>
        
        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;