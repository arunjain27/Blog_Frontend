import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import Cookies from "js-cookie";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import '../css/Searchbar.css'; // Import the searchbar CSS file

const MyBlog = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [userblogdetail, setUserBlogDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Add search state

  useEffect(() => {
    getBlogDetails();
  }, []);

  const getBlogDetails = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_URL}/get`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user blogs");
      }

      const blogData = await response.json();
      setUserBlogDetail(blogData.userblog);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      setLoading(true);
    }
  }, [BASE_URL]);

  const handleDelete = useCallback(async (deleteId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_URL}/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setUserBlogDetail(prevState => prevState.filter(blog => blog._id !== deleteId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }, [BASE_URL]);

  // Filter blogs by search query (title, tag, or description)
  const filteredBlogs = userblogdetail.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="search-bar">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Search blogs ..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} // Update search query
        />
      </div>

      {loading ? (
        <Alert />
      ) : (
        <div>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <div key={blog._id}>
                <Card
                  _id={blog._id}
                  name={blog.name}
                  title={blog.title}
                  tag={blog.tag}
                  date={blog.date}
                  description={blog.description}
                  image={blog.image}
                  deletefunction={handleDelete}
                  deletepost={false}
                  editpost={true}
                />
                <Link to={`/blog/${blog._id}`} className="read-more-link">Read More</Link>
              </div>
            ))
          ) : (
            <p>No blogs found matching your search query.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MyBlog;
