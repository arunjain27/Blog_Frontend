import React, { useEffect, useState, useCallback, useMemo } from "react";
import Card from "./Card";
import Cookies from "js-cookie";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import '../css/Searchbar.css';
import '../css/Readmore.css';
import '../css/home.css';

const ITEMS_PER_PAGE = 6;

const MyBlog = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [userblogdetail, setUserBlogDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getBlogDetails();
  }, []);

  const getBlogDetails = useCallback(async () => {
    try {
      setLoading(true);
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
      setUserBlogDetail(blogData.userblog || []);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    } finally {
      setLoading(false);
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
    <div className="home-container">
      <div className="home-content">
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search blogs ..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <Alert />
        ) : (
          <>
            {currentBlogs.length > 0 ? (
              <>
                <div className="blog-list-container">
                  {currentBlogs.map(blog => (
                    <div key={blog._id} className="blog-list-item">
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
                      <Link to={`/blog/${blog._id}`} className="read-more-link">
                        Read More
                      </Link>
                    </div>
                  ))}
                </div>

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
            ) : (
              <div className="empty-state">
                <p>No blogs found{searchQuery ? ' matching your search query.' : '.'}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBlog;
