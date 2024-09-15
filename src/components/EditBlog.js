import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import '../css/EditBlog.css'; // Assuming you store the CSS in EditBlog.css

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;

  const [blog, setBlog] = useState({
    title: '',
    tag: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  const getBlogDetails = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_URL}/get/${id}`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog details");
      }

      const blogData = await response.json();
      setBlog(blogData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setLoading(false);
    }
  }, [BASE_URL, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prevBlog => ({
      ...prevBlog,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_URL}/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      navigate('/myblog'); // Redirect to MyBlog page after update
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="edit-blog-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className="edit-blog-form" onSubmit={handleSubmit}>
          <h2>Edit Blog</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={blog.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag:</label>
            <input
              type="text"
              id="tag"
              name="tag"
              className="form-control"
              value={blog.tag}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={blog.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Update Blog</button>
        </form>
      )}
    </div>
  );
};

export default EditBlog;
