import React, { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContext } from "../App";
import ModernCard from "./ModernCard";
import { BlogCardSkeleton } from "./Skeleton";
import '../css/myblog.css';

const ITEMS_PER_PAGE = 9;

const MyBlog = () => {
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const [userblogdetail, setUserBlogDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useContext(ToastContext);
  const username = Cookies.get("username");

  useEffect(() => {
    getBlogDetails();
  }, []);

  const getBlogDetails = useCallback(async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        if (toast) toast.error("Please log in to view your blogs.");
        setLoading(false);
        return;
      }

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
      setUserBlogDetail(blogData.userblog || []);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      if (toast) toast.error("Failed to load your blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, toast]);

  const handleDelete = useCallback(async (deleteId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

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
      if (toast) toast.success("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      if (toast) toast.error("Failed to delete blog post. Please try again.");
    }
  }, [BASE_URL, toast]);

  // Filter blogs by search query
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return userblogdetail;
    
    const query = searchQuery.toLowerCase();
    return userblogdetail.filter(blog =>
      blog.title?.toLowerCase().includes(query) ||
      blog.tag?.toLowerCase().includes(query) ||
      blog.description?.toLowerCase().includes(query)
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

  return (
    <div className="myblog-page">
      <div className="myblog-container">
        <div className="myblog-header">
          <h1 className="myblog-title">
            <span className="myblog-title-icon">📝</span>
            My Blog Posts
          </h1>
          <p className="myblog-subtitle">
            {username ? `Welcome back, ${username}!` : "Manage your blog posts"}
          </p>
        </div>

        <div className="myblog-stats">
          <div className="myblog-stat-card">
            <div className="myblog-stat-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="myblog-stat-content">
              <div className="myblog-stat-value">{userblogdetail.length}</div>
              <div className="myblog-stat-label">Total Posts</div>
            </div>
          </div>
          <div className="myblog-stat-card">
            <div className="myblog-stat-icon">
              <i className="fas fa-search"></i>
            </div>
            <div className="myblog-stat-content">
              <div className="myblog-stat-value">{filteredBlogs.length}</div>
              <div className="myblog-stat-label">Filtered Posts</div>
            </div>
          </div>
          <div className="myblog-stat-card">
            <div className="myblog-stat-icon">
              <i className="fas fa-book-open"></i>
            </div>
            <div className="myblog-stat-content">
              <div className="myblog-stat-value">{currentPage}</div>
              <div className="myblog-stat-label">Current Page</div>
            </div>
          </div>
        </div>

        <div className="myblog-search-wrapper">
          <div className="myblog-search">
            <i className="fas fa-search myblog-search-icon"></i>
            <input
              type="text"
              placeholder="Search your blogs by title, tag, or description..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="myblog-search-input"
            />
            {searchQuery && (
              <button
                className="myblog-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="myblog-grid">
            {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {currentBlogs.length > 0 ? (
              <>
                <div className="myblog-grid">
                  {currentBlogs.map(blog => (
                    <div key={blog._id} className="myblog-card-wrapper">
                      <ModernCard
                        _id={blog._id}
                        name={blog.name}
                        title={blog.title}
                        tag={blog.tag}
                        date={blog.date}
                        description={blog.description}
                        image={blog.image}
                      />
                      <div className="myblog-card-actions">
                        <Link
                          to={`/blog/${blog._id}`}
                          className="myblog-action-btn myblog-action-view"
                        >
                          <i className="fas fa-eye"></i>
                          View
                        </Link>
                        <Link
                          to={`/edit-blog/${blog._id}`}
                          className="myblog-action-btn myblog-action-edit"
                        >
                          <i className="fas fa-edit"></i>
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="myblog-action-btn myblog-action-delete"
                        >
                          <i className="fas fa-trash"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="myblog-pagination">
                    <button
                      className="myblog-pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      <i className="fas fa-chevron-left"></i>
                      Previous
                    </button>
                    <div className="myblog-pagination-info">
                      <span className="myblog-pagination-text">
                        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                      </span>
                      <span className="myblog-pagination-count">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredBlogs.length)} of {filteredBlogs.length}
                      </span>
                    </div>
                    <button
                      className="myblog-pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                    >
                      Next
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="myblog-empty-state">
                <div className="myblog-empty-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h2 className="myblog-empty-title">
                  {searchQuery ? "No blogs found" : "No blog posts yet"}
                </h2>
                <p className="myblog-empty-description">
                  {searchQuery
                    ? `No blogs match "${searchQuery}". Try a different search term.`
                    : "Start sharing your thoughts with the world! Create your first blog post."}
                </p>
                {!searchQuery && (
                  <Link to="/addblog" className="myblog-empty-cta">
                    <i className="fas fa-plus"></i>
                    Create Your First Blog
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBlog;
