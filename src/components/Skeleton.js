import React from 'react';
import '../css/skeleton.css';

const Skeleton = ({ variant = 'text', width, height, className = '' }) => {
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <span className="skeleton-shimmer"></span>
    </div>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <div className="blog-card-skeleton">
      <Skeleton variant="rectangular" height="200px" className="skeleton-image" />
      <div className="skeleton-content">
        <Skeleton variant="text" width="60%" height="24px" />
        <Skeleton variant="text" width="40%" height="16px" />
        <Skeleton variant="text" width="100%" height="16px" />
        <Skeleton variant="text" width="80%" height="16px" />
        <div className="skeleton-footer">
          <Skeleton variant="circular" width="40px" height="40px" />
          <div>
            <Skeleton variant="text" width="100px" height="16px" />
            <Skeleton variant="text" width="80px" height="14px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
