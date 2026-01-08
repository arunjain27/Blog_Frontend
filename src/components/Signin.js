import React, { useState } from "react";
import "../css/auth.css";
import Cookies from "js-cookie";

function SignIn() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Sign in failed. Please try again."
        );
        setIsLoading(false);
      } else {
        const tokenData = await response.json();
        const token = tokenData.data;
        const user = tokenData.username;

        Cookies.set("token", token);
        Cookies.set("username", user);
        Cookies.set("userid", tokenData.userid);

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
            Welcome Back to Your <br />
            <span>Blogging Oasis</span>
          </h1>
          <p>Sign In and Let Your Ideas Blossom into Captivating Stories!</p>
        </div>
        <div className="auth-card">
          <h2>Sign In</h2>
          {errorMessage && <div className="auth-error">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
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
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="auth-social">
            <p>or sign in with:</p>
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

export default SignIn;
