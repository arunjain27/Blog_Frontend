import React, { useEffect, useState, useCallback, useMemo } from "react";
import '../css/home.css';
import '../css/Searchbar.css';
import '../css/Readmore.css';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Card from './Card';

const ITEMS_PER_PAGE = 6;

const AllBlog = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [userblogdetail, setUserblogdetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blog details
  const getBlogDetails = useCallback(async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token") || "";
      const controller = new AbortController();
      
      const response = await fetch(`${BASE_URL}/allpost`, {
        method: "POST",
        headers: { "auth-token": token },
        credentials: 'include',
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Failed to fetch blog posts");
      const blogData = await response.json();
      setUserblogdetail(blogData.userblog || []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error fetching blog posts:", error);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [BASE_URL]);

  useEffect(() => {
    getBlogDetails();
  }, [getBlogDetails]);

  // Filter blogs by search query
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return userblogdetail;
    
    const query = searchQuery.toLowerCase();
    return userblogdetail.filter(blog =>
      blog.title?.toLowerCase().includes(query) ||
      blog.description?.toLowerCase().includes(query) ||
      blog.tag?.toLowerCase().includes(query)
    );
  }, [userblogdetail, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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

      if (!response.ok) throw new Error("Failed to delete post");
      
      setUserblogdetail(prevBlogs => prevBlogs.filter(blog => blog._id !== deleteId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }, [BASE_URL]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search blogs ..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div className="home-loading">
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
            <h5>🌟 Discover the World through My Blog! 🌟</h5>
            <p>Welcome to my corner of the internet! While it might take a little time to load because I'm using a free deployment platform, trust me, it's worth the wait! 🚀</p>
          </div>
        ) : (
          <>
            {currentBlogs.length > 0 ? (
              <div className="blog-list-container">
                {currentBlogs.map(blog => (
                  <div key={blog._id} className="blog-list-item">
                    <Card
                      _id={blog._id}
                      name={blog.name}
                      title={blog.title}
                      tag={blog.tag}
                      description={blog.description}
                      image={blog.image}
                      date={blog.date}
                      deletefunction={handleDelete}
                      deletepost={true}
                    />
                    <Link to={`/blog/${blog._id}`} className="read-more-link">
                      Read More
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No blogs found{searchQuery ? ' matching your search.' : '.'}</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
