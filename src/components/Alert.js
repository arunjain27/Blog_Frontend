import { useState } from "react";
import '../css/global.css';

function Alert() {
  return (
    <div className="home-loading">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      <h5>Welcome to the Blogging Platform!</h5>
      <p>
        Ready to share your thoughts and ideas with the world? Dive into the
        world of blogging by <strong>signing up or signing in</strong>.
      </p>
    </div>
  );
}

export default Alert;
