import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useDebounce } from "../hooks/useDebounce";
import ModernCard from "./ModernCard";
import { BlogCardSkeleton } from "./Skeleton";
import { useToast } from "../hooks/useToast";
import "../css/allblog.css";
import Cookies from "js-cookie";

const ITEMS_PER_PAGE = 12;

const AllBlog = () => {
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const toast = useToast();
  const [loadMoreRef, isNearBottom] = useIntersectionObserver({ threshold: 0.1 });

  // Fetch blogs with pagination
  const fetchBlogs = useCallback(
    async (page = 1, append = false) => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const token = Cookies.get("token") || "";
        const response = await fetch(`${BASE_URL}/allpost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          credentials: "include",
          body: JSON.stringify({
            page,
            limit: ITEMS_PER_PAGE,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }

        const data = await response.json();
        const newBlogs = data.userblog || [];
        const pagination = data.pagination || {};

        if (append) {
          setBlogs((prev) => [...prev, ...newBlogs]);
        } else {
          setBlogs(newBlogs);
        }

        setCurrentPage(pagination.currentPage || page);
        setTotalPages(pagination.totalPages || 1);
        setHasMore(pagination.hasMore || false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        toast.error("Failed to load blogs. Please try again.");
        if (!append) {
          setBlogs([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [BASE_URL, toast]
  );

  // Initial load
  useEffect(() => {
    fetchBlogs(1, false);
  }, [BASE_URL]);

  // Load more when near bottom
  useEffect(() => {
    if (isNearBottom && hasMore && !loadingMore && !loading) {
      fetchBlogs(currentPage + 1, true);
    }
  }, [isNearBottom, hasMore, loadingMore, loading, currentPage, fetchBlogs]);

  // Filter blogs by search query (client-side for now)
  const filteredBlogs = useMemo(() => {
    if (!debouncedSearch.trim()) return blogs;

    const query = debouncedSearch.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(query) ||
        blog.description?.toLowerCase().includes(query) ||
        blog.tag?.toLowerCase().includes(query)
    );
  }, [blogs, debouncedSearch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="allblog-container">
      <div className="allblog-header">
        <h1 className="allblog-title">All Blogs</h1>
        <p className="allblog-subtitle">Discover stories, ideas, and perspectives</p>
      </div>

      <div className="allblog-content">
        <div className="allblog-search-wrapper">
          <div className="allblog-search">
            <i className="fas fa-search allblog-search-icon"></i>
            <input
              type="text"
              placeholder="Search blogs by title, description, or tag..."
              value={searchQuery}
              onChange={handleSearch}
              className="allblog-search-input"
            />
            {searchQuery && (
              <button
                className="allblog-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="allblog-grid">
            {[...Array(6)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <>
            <div className="allblog-grid">
              {filteredBlogs.map((blog) => (
                <ModernCard
                  key={blog._id}
                  _id={blog._id}
                  name={blog.name}
                  title={blog.title}
                  tag={blog.tag}
                  description={blog.description}
                  image={blog.image}
                  date={blog.date}
                  likes={blog.likes?.length || 0}
                  commentsCount={blog.comments?.length || 0}
                
                />
              ))}
            </div>

            {!debouncedSearch && (
              <>
                {loadingMore && (
                  <div className="allblog-loading-more">
                    <div className="spinner"></div>
                    <span>Loading more blogs...</span>
                  </div>
                )}
                {hasMore && !loadingMore && (
                  <div ref={loadMoreRef} className="allblog-load-more-trigger" />
                )}
                {!hasMore && blogs.length > ITEMS_PER_PAGE && (
                  <div className="allblog-end">
                    <p>You've reached the end! 🎉</p>
                  </div>
                )}
              </>
            )}

            {debouncedSearch && filteredBlogs.length === 0 && (
              <div className="allblog-empty">
                <i className="fas fa-search allblog-empty-icon"></i>
                <p>No blogs found matching "{debouncedSearch}"</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="allblog-empty">
            <i className="fas fa-blog allblog-empty-icon"></i>
            <p>No blogs available yet.</p>
            <p className="allblog-empty-subtitle">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
