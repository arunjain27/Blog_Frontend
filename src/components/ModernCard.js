import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import '../css/modern-card.css';

function ModernCard({
  _id,
  name = "Author",
  title = "Blog Title",
  tag = "tag",
  description = "Description",
  date,
  image = "",
  likes = 0,
  commentsCount = 0,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgRef, isIntersecting, hasIntersected] = useIntersectionObserver();
  
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  const truncatedDescription =
    description.length > 150
      ? description.substring(0, 150) + '...'
      : description;

  return (
    <article className="modern-card" ref={imgRef}>
      <Link to={`/blog/${_id}`} className="modern-card-link">
        {image && hasIntersected && (
          <div className="modern-card-image-wrapper">
            {!imageLoaded && (
              <div className="modern-card-image-placeholder">
                <div className="skeleton skeleton-rectangular" style={{ width: '100%', height: '100%' }} />
              </div>
            )}
            <img
              src={image}
              alt={title}
              className={`modern-card-image ${imageLoaded ? 'loaded' : ''}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="modern-card-overlay">
              <span className="modern-card-tag">#{tag}</span>
            </div>
          </div>
        )}
        <div className="modern-card-content">
          <h3 className="modern-card-title">{title}</h3>
          <p className="modern-card-description">{truncatedDescription}</p>
          <div className="modern-card-meta">
            <div className="modern-card-author">
              <div className="modern-card-avatar">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="modern-card-author-name">{name}</div>
                <div className="modern-card-date">{formattedDate}</div>
              </div>
            </div>
            <div className="modern-card-stats">
              <span className="modern-card-stat">
                <i className="fas fa-heart"></i> {likes || 0}
              </span>
             
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ModernCard;
