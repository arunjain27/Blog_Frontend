import React, { useState } from "react";
import "../css/auth.css";
import Cookies from 'js-cookie';

function Signup() {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Sign up failed. Please try again."
        );
        setIsLoading(false);
      } else {
        const tokenData = await response.json();
        const token = tokenData.data;
        const userid = tokenData.userid;

        Cookies.set("token", token);
        Cookies.set("username", name); 
        Cookies.set("userid", userid);

        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background-shape auth-shape-1"></div>
      <div className="auth-background-shape auth-shape-2"></div>
      <div className="auth-content">
        <div className="auth-welcome">
          <h1>
            Claim Your Spot
            <br />
            <span>in the Blogosphere</span>
          </h1>
          <p>Sign Up and Be Part of an Ever-Expanding Community of Bloggers!</p>
        </div>
        <div className="auth-card">
          <h2>Sign Up</h2>
          {errorMessage && <div className="auth-error">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="auth-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px', marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }}></span>
                  Signing up...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <div className="auth-social">
            <p>or sign up with:</p>
            <div className="auth-social-icons">
              <a href="#" className="auth-social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="auth-social-icon" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="auth-social-icon" aria-label="Google">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="auth-social-icon" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
