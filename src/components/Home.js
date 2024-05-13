import React, { useEffect, useState, Suspense } from "react";
import "../css/home.css";
import Sidebar from "./Sidebar";
import { Spinner } from "@chakra-ui/react";
import importedComponent from "react-imported-component";

const Home = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;

  const [userblogdetail, setUserblogdetail] = useState([]);
  const [username, setusername] = useState("None");
  const [loading, setloading] = useState(false);

  let deletepost = true;

  useEffect(() => {
    getBlogDetails();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setusername("none");
  };

  async function getBlogDetails() {
    try {
      setloading(true);
      let token = localStorage.getItem("token");
      if (!token) {
        token = "";
      }
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
      setloading(false);
      setusername(blogData.username);
      setUserblogdetail(blogData.userblog);
    } catch (error) {}
  }

  const CardComponent = importedComponent(() => import('./Card'));

  const handleDelete = async (deleteId) => {
    try {
      const token = localStorage.getItem("token");
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
    } catch (error) {}
  };

  return (
    <>
      <div className="home-head">
        <div>
          <Sidebar username={username} handleSignOut={handleSignOut} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {loading ? (
            <div style={{ marginRight: "40%" }}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          ) : (
            <div className="home-head-inner2">
              {userblogdetail.map((blog) => (
                <div key={blog._id} className="home-head-inner2-card">
                  <CardComponent
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
            </div>
          )}
        </Suspense>
      </div>
    </>
  );
};

export default Home;
