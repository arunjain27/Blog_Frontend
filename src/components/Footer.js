import React from 'react';
import '../css/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-social">
          <a
            href="https://www.facebook.com/profile.php?id=100009855137195"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link facebook"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://x.com/arunjain2002"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link twitter"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/arunjain2704/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link instagram"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/arunjain27"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link linkedin"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://github.com/arunjain27"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link github"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div className="footer-text">
          Musingsss : share your thoughts
        </div>
      </div>
    </footer>
  );
}
