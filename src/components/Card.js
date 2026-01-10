import React from "react";
import '../css/blog-card.css';
import { Link } from 'react-router-dom';

function Card({
  _id,
  name = "none",
  title = "please upload the title",
  tag = "please upload the tag",
  description = "please upload the description",
  date = "12-23-2024",
  image = "",
  deletefunction,
  deletepost,
  editpost
}) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deletefunction(_id);
    }
  };

  const indianDateTimeString = new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="blog-card">
      {image && (
        <img
          src={image}
          alt={title}
          className="blog-card-image"
          loading="lazy"
        />
      )}
      <div className="blog-card-content">
        <h3 className="blog-card-title">{title}</h3>
        <div className="blog-card-meta">
          <span className="blog-card-date">{indianDateTimeString}</span>
          <span className="blog-card-tag">#{tag}</span>
        </div>
        <p className="blog-card-description">{description}</p>
        <div className="blog-card-footer">
          <div className="blog-card-author">
            <span>Posted by: </span>
            {name}
          </div>
          <div className="blog-card-actions">
            {!deletepost && (
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete post
              </button>
            )}
            {editpost && (
              <Link
                to={`/edit-blog/${_id}`}
                className="btn btn-primary"
              >
                Edit Post
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
