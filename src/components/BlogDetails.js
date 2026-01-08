import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const isLoggedIn = Cookies.get("token");

  // Fetch blog details and comments on load
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
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
        setBlog(data.blog);
        setComments(data.blog.comments || []);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [BASE_URL, id]);

  // Handle comment submission
  const handleCommentSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
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

      const responseData = await response.json();

      if (!response.ok) {
        alert("Failed to post comment. Please try again.");
        return;
      }

      const newCommentData = responseData.comment;
      if (newCommentData) {
        setComments((prevComments) => [...prevComments, newCommentData]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("An error occurred while posting the comment.");
    }
  }, [BASE_URL, id, newComment]);

  // Handle Edit Comment
  const handleEditComment = useCallback((commentId, text) => {
    setEditingCommentId(commentId);
    setEditedCommentText(text);
  }, []);

  const handleEditCommentSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!editedCommentText.trim()) {
      alert("Comment cannot be empty.");
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
        alert("Failed to update comment. Please try again.");
        return;
      }

      const updatedComment = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === editingCommentId ? { ...comment, ...updatedComment.comment } : comment
        )
      );
      setEditingCommentId(null);
      setEditedCommentText("");
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("An error occurred while updating the comment.");
    }
  }, [BASE_URL, editingCommentId, editedCommentText]);

  // Handle Delete Comment
  const handleDeleteComment = useCallback(async (commentId) => {
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
        const errorData = await response.json();
        alert(errorData.message || "Failed to delete comment. Please try again.");
        return;
      }

      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("An error occurred while deleting the comment.");
    }
  }, [BASE_URL]);

  // Handle Like/Dislike for blog and comments
  const handleLikeDislike = useCallback(async (type, itemId, isComment = false) => {
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
        throw new Error(`Failed to ${type} ${isComment ? "comment" : "blog"}`);
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
      }
    } catch (error) {
      console.error(`Error handling ${type}:`, error);
    }
  }, [BASE_URL]);

  // Get logged-in user's ID
  const loggedInUserId = Cookies.get("userid");

  if (loading) {
    return (
      <div className="blog-details">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-details">
      {!isLoggedIn && (
        <div className="login-alert">
          Please Login or Sign Up to add a blog, like, or comment on posts and engage with our community!
        </div>
      )}
      
      {blog && (
        <div className="blog-detail">
          <h1>{blog.title}</h1>
          <p className="description">{blog.description}</p>
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="blog-image" loading="lazy" />
          )}
          <p className="info">
            <strong>Posted by:</strong> {blog?.name} | <strong>Date:</strong>{" "}
            {new Date(blog.date).toLocaleDateString()}
          </p>
          <div className="like-dislike">
            <button onClick={() => handleLikeDislike("like", blog._id)}>
              Like {blog.likes ? blog.likes : 0}
            </button>
          </div>
        </div>
      )}

      <div className="comments-section">
        <h2>Comments</h2>
        {isLoggedIn && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
            />
            <button type="submit">Post Comment</button>
          </form>
        )}

        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment-container">
                <div className="comment-header">
                  <div className="author-info">
                    <span className="author">
                      {comment.user?.name || "Unknown"}
                    </span>
                  </div>
                  <span className="date">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                {editingCommentId === comment._id ? (
                  <form onSubmit={handleEditCommentSubmit} className="edit-comment-form">
                    <textarea
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      placeholder="Edit your comment..."
                    />
                    <div className="btn-group">
                      <button type="submit" className="btn btn-success">Update Comment</button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditingCommentId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="comment-text">{comment.text}</div>
                    <div className="comment-actions">
                      <div className="like-dislike">
                        <button onClick={() => handleLikeDislike("like", comment._id, true)}>
                          Like {comment.likes ? comment.likes : 0}
                        </button>
                        <button onClick={() => handleLikeDislike("dislike", comment._id, true)}>
                          Dislike {comment.dislikes ? comment.dislikes : 0}
                        </button>
                      </div>
                      {comment.user && comment.user._id === loggedInUserId && (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={() => handleEditComment(comment._id, comment.text)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
