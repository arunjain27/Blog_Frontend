import React, { useEffect, useState, useCallback, Suspense } from "react";
import "../css/home.css";
import Sidebar from "./Sidebar";
import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

const Card = React.lazy(() => import("./Card"));

const Home = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [userblogdetail, setUserblogdetail] = useState([]);
  const [username, setUsername] = useState("none");
  const [loading, setLoading] = useState(false);
  let deletepost = true;

  useEffect(() => {
    const cachedBlogs = JSON.parse(localStorage.getItem("cachedBlogs"));
    if (cachedBlogs) {
      setUserblogdetail(cachedBlogs);
    }
  }, []);

  useEffect(() => {
    if (userblogdetail.length === 0) {
      getBlogDetails();
    }
  }, [userblogdetail]);

  const getBlogDetails = useCallback(async () => {
    try {
      setLoading(true);
      let token = Cookies.get("token") || "";
      const response = await fetch(`${BASE_URL}/allpost`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }

      const blogData = await response.json();
      localStorage.setItem("cachedBlogs", JSON.stringify(blogData.userblog)); // Cache fetched data
      setLoading(false);
      setUsername(blogData.username);
      setUserblogdetail(blogData.userblog);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  }, [BASE_URL]);

  const handleDelete = async (deleteId) => {
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
      setUserblogdetail(userblogdetail.filter((blog) => blog.key !== deleteId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner
          thickness="8px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          style={{ marginLeft: "50%" }}
        />
      ) : (
        <div className="home-head">
          <Suspense fallback={<div>Loading...</div>}>
            {userblogdetail.map((blog) => (
              <div key={blog._id} className="home-head-inner2-card">
                <Card
                  _id={blog._id}
                  name={blog.name}
                  title={blog.title}
                  tag={blog.tag}
                  description={blog.description}
                  image={blog.image}
                  date={blog.date}
                  deletefunction={handleDelete}
                  deletepost={deletepost}
                />
              </div>
            ))}
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Home;
