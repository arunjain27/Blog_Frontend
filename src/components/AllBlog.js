import React, { useEffect, useState, useCallback } from "react";
import "../css/home.css";
import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";
import LazyLoad from 'react-lazyload';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import '../css/Searchbar.css';
import '../css/Readmore.css';
import debounce from 'lodash.debounce';
const Card = React.lazy(() => import('./Card'));

const Home = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [userblogdetail, setUserblogdetail] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all blog details
  const getBlogDetails = useCallback(async () => {
    const controller = new AbortController();
    const { signal } = controller;

    try {
      setLoading(true);
      const token = Cookies.get("token") || "";
      const response = await fetch(`${BASE_URL}/allpost`, {
        method: "POST",
        headers: { "auth-token": token },
        credentials: 'include',  // This will include the cookies (for CORS)

        signal,
      });

      if (!response.ok) throw new Error("Failed to fetch blog posts");
      const blogData = await response.json();
      setUserblogdetail(blogData.userblog);
      setFilteredBlogs(blogData.userblog);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [BASE_URL]);

  // Fetch blog details on component mount
  useEffect(() => {
    getBlogDetails();
  }, [getBlogDetails]);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((query) => {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = userblogdetail.filter(blog =>
        blog.title.toLowerCase().includes(lowerCaseQuery) ||
        blog.description.toLowerCase().includes(lowerCaseQuery) ||
        blog.tag?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredBlogs(filtered);
    }, 300),
    [userblogdetail]
  );

  // Handle search input change
  const onSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Handle blog deletion
  const handleDelete = useCallback(async (deleteId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_URL}/${deleteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "auth-token": token },
      });

      if (!response.ok) throw new Error("Failed to delete post");
      setUserblogdetail(prevBlogs => prevBlogs.filter(blog => blog._id !== deleteId));
      setFilteredBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== deleteId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }, [BASE_URL]);

  return (
    <>
      {loading ? (
        <>
          <Spinner
            thickness="8px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            style={{ marginLeft: "48%" }}
          />
          <h5 style={{ textAlign: 'center' }}>🌟 Discover the World through My Blog! 🌟</h5>
          <p style={{ textAlign: 'center', fontWeight: '600' }}>Welcome to my corner of the internet! While it might take a little time to load because I'm using a free deployment platform, trust me, it's worth the wait! 🚀</p>
        </>
      ) : (
        <div className="home-head">
          <div className="search-bar">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search blogs ..."
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>

          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <LazyLoad key={blog._id} height={200} offset={100}>
                <div className="home-head-inner2-card">
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
                  <Link to={`/blog/${blog._id}`} className="read-more-link">Read More</Link>
                </div>
              </LazyLoad>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No blogs found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
