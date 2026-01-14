import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContext } from "../App";
import "../css/BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const isLoggedIn = Cookies.get("token");
  const toast = useContext(ToastContext);

  // Calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch blog details - FIXED: Removed toast from dependencies to prevent infinite loop
  useEffect(() => {
    let isMounted = true;
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token") || "";
        const response = await fetch(`${BASE_URL}/blog/${id}`, {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }

        const data = await response.json();
        if (isMounted) {
          setBlog(data.blog);
          setComments(data.blog.comments || []);
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
        if (isMounted && toast) {
          toast.error("Failed to load blog post. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id && BASE_URL) {
      fetchBlogDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [BASE_URL, id]); // Removed toast from dependencies to prevent infinite loop

  // Handle comment submission
  const handleCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!newComment.trim()) {
        if (toast) toast.warning("Comment cannot be empty.");
        return;
      }

      if (!isLoggedIn) {
        if (toast) toast.error("Please sign in to comment.");
        return;
      }

      try {
        const token = Cookies.get("token") || "";
        const response = await fetch(`${BASE_URL}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            blogId: id,
            text: newComment,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to post comment");
        }

        const responseData = await response.json();
        const newCommentData = responseData.comment;
        if (newCommentData) {
          // Ensure user data is properly set
          const username = Cookies.get("username");
          const userId = Cookies.get("userid");
          const commentWithUser = {
            ...newCommentData,
            user: newCommentData.user || { name: username, _id: userId }
          };
          setComments((prevComments) => [...prevComments, commentWithUser]);
          setNewComment("");
          if (toast) toast.success("Comment posted successfully!");
        }
      } catch (error) {
        console.error("Error posting comment:", error);
        if (toast) toast.error("Failed to post comment. Please try again.");
      }
    },
    [BASE_URL, id, newComment, isLoggedIn, toast]
  );

  // Handle Edit Comment
  const handleEditComment = useCallback((commentId, text) => {
    setEditingCommentId(commentId);
    setEditedCommentText(text);
  }, []);

  const handleEditCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!editedCommentText.trim()) {
        if (toast) toast.warning("Comment cannot be empty.");
        return;
      }

      try {
        const token = Cookies.get("token") || "";
        const response = await fetch(`${BASE_URL}/comment/${editingCommentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ text: editedCommentText }),
        });

        if (!response.ok) {
          throw new Error("Failed to update comment");
        }

        const updatedComment = await response.json();
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === editingCommentId
              ? { ...comment, ...updatedComment.comment }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditedCommentText("");
        if (toast) toast.success("Comment updated successfully!");
      } catch (error) {
        console.error("Error updating comment:", error);
        if (toast) toast.error("Failed to update comment. Please try again.");
      }
    },
    [BASE_URL, editingCommentId, editedCommentText, toast]
  );

  // Handle Delete Comment
  const handleDeleteComment = useCallback(
    async (commentId) => {
      if (!window.confirm("Are you sure you want to delete this comment?")) {
        return;
      }

      try {
        const token = Cookies.get("token") || "";
        const response = await fetch(`${BASE_URL}/comment/${commentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete comment");
        }

        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        if (toast) toast.success("Comment deleted successfully!");
      } catch (error) {
        console.error("Error deleting comment:", error);
        if (toast) toast.error("Failed to delete comment. Please try again.");
      }
    },
    [BASE_URL, toast]
  );

  // Handle Like/Dislike
  const handleLikeDislike = useCallback(
    async (type, itemId, isComment = false) => {
      if (!isLoggedIn) {
        if (toast) toast.warning("Please sign in to like posts and comments.");
        return;
      }

      try {
        const token = Cookies.get("token") || "";
        const endpoint = isComment ? "/like-dislike-comment" : "/like";
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            [isComment ? "commentId" : "blogId"]: itemId,
            type,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to ${type}`);
        }

        const updatedData = await response.json();
        if (isComment) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === itemId ? { ...comment, ...updatedData.comment } : comment
            )
          );
        } else {
          setBlog((prevBlog) => ({
            ...prevBlog,
            likes: updatedData.blog.likes,
            dislikes: updatedData.blog.dislikes,
          }));
          setLiked(!liked);
        }
      } catch (error) {
        console.error(`Error handling ${type}:`, error);
        if (toast) toast.error(`Failed to ${type}. Please try again.`);
      }
    },
    [BASE_URL, isLoggedIn, liked, toast]
  );

  const loggedInUserId = Cookies.get("userid");
  const readingTime = blog ? calculateReadingTime(blog.description) : 0;

  if (loading) {
    return (
      <div className="blog-details-container">
        <div className="spinner-container" style={{ minHeight: "60vh" }}>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-details-container">
        <div className="blog-not-found">
          <h2>Blog Post Not Found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/Allblog" className="btn btn-primary">
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="blog-details-container">
      {/* Reading Progress Bar */}
      <div className="reading-progress-bar">
        <div
          className="reading-progress-fill"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Login Alert */}
      {!isLoggedIn && (
        <div className="blog-login-alert">
          <div className="blog-login-alert-content">
            <i className="fas fa-info-circle"></i>
            <span>Sign in to like, comment, and engage with the community!</span>
            <Link to="/signin" className="btn btn-primary btn-sm">
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Blog Content */}
      <article className="blog-detail-article">
        {/* Header */}
        <header className="blog-detail-header">
          <div className="blog-detail-tag">
            <span>#{blog.tag}</span>
          </div>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <div className="blog-detail-avatar">
                {blog.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <div className="blog-detail-author-name">{blog.name}</div>
                <div className="blog-detail-date">
                  {formattedDate} · {readingTime} min read
                </div>
              </div>
            </div>
            <div className="blog-detail-actions">
              <button
                className={`blog-like-btn ${liked ? "liked" : ""}`}
                onClick={() => handleLikeDislike("like", blog._id)}
                disabled={!isLoggedIn}
                title={isLoggedIn ? "Like this post" : "Sign in to like"}
              >
                <i className="fas fa-heart"></i>
                <span>{blog.likes || 0}</span>
              </button>
              <button
                className="blog-share-btn"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.description,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    if (toast) toast.success("Link copied to clipboard!");
                  }
                }}
                title="Share this post"
              >
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="blog-detail-image-wrapper">
            <img
              src={blog.image}
              alt={blog.title}
              className="blog-detail-image"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="blog-detail-content">
          <div className="blog-detail-description">{blog.description}</div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="blog-comments-section">
        <div className="blog-comments-header">
          <h2>
            <i className="fas fa-comments"></i>
            Comments ({comments.length})
          </h2>
        </div>

        {isLoggedIn && (
          <form onSubmit={handleCommentSubmit} className="blog-comment-form">
            <div className="blog-comment-input-wrapper">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="blog-comment-input"
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary comment-btn">
              <i className="fas fa-paper-plane"></i>
              Post Comment
            </button>
          </form>
        )}

        <div className="blog-comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="blog-comment-item">
                <div className="blog-comment-header">
                  <div className="blog-comment-author">
                    <div className="blog-comment-avatar">
                      {comment.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="blog-comment-author-name">
                        {comment.user?.name || "Unknown"}
                      </div>
                      <div className="blog-comment-date">
                        {new Date(comment.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {editingCommentId === comment._id ? (
                  <form
                    onSubmit={handleEditCommentSubmit}
                    className="blog-comment-edit-form"
                  >
                    <textarea
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      className="blog-comment-input"
                      rows="3"
                    />
                    <div className="blog-comment-edit-actions">
                      <button type="submit" className="btn btn-success btn-sm">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingCommentId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="blog-comment-text">{comment.text}</div>
                    <div className="blog-comment-actions">
                      <button
                        className={`blog-comment-like-btn ${
                          comment.liked ? "liked" : ""
                        }`}
                        onClick={() =>
                          handleLikeDislike("like", comment._id, true)
                        }
                        disabled={!isLoggedIn}
                      >
                        <i className="fas fa-heart"></i>
                        <span>{comment.likes || 0}</span>
                      </button>
                      {comment.user?._id === loggedInUserId && (
                        <>
                          <button
                            className="blog-comment-action-btn"
                            onClick={() =>
                              handleEditComment(comment._id, comment.text)
                            }
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button
                            className="blog-comment-action-btn blog-comment-delete-btn"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="blog-comments-empty">
              <i className="fas fa-comment-slash"></i>
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
