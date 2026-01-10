import React, { useState } from 'react';
import '../css/footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you'd send this to your backend
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Musingsss</h3>
            <p className="footer-description">
              A platform for sharing thoughts, ideas, and stories. Join our community of writers and readers.
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/profile.php?id=100009855137195"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://x.com/arunjain2002"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/arunjain2704/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/arunjain27"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/arunjain27"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/Allblog">All Blogs</a></li>
              <li><a href="/addblog">Write a Blog</a></li>
              <li><a href="/signup">Sign Up</a></li>
              <li><a href="/signin">Sign In</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-newsletter-text">
              Stay updated with our latest blogs and stories.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-newsletter-input"
                required
              />
              <button
                type="submit"
                className="footer-newsletter-button"
                disabled={subscribed}
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Musingsss. All rights reserved.
          </p>
          <p className="footer-tagline">Share your thoughts, inspire the world.</p>
        </div>
      </div>
    </footer>
  );
}
