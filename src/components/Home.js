import React, { useEffect, useState } from "react";
import "../css/home.css";

import Sidebar from "./Sidebar";
import Rightsidebar from "./Rightsidebar";
import CardComponent from "./Card";
import { Spinner } from "@chakra-ui/react";

const Home = () => {
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
      const response = await fetch("http://localhost:8000/allpost", {
        method: "POST",
        headers: {
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }

      const blogData = await response.json();
      console.log(blogData.username);
      setloading(false);
      setusername(blogData.username);
      setUserblogdetail(blogData.userblog);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  }

  const handleDelete = async (deleteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/${deleteId}`, {
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
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <div className="home-head">
        <div>
          <Sidebar username={username} handleSignOut={handleSignOut} />
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
        <div className="">
          <Rightsidebar />
        </div>
      </div>
    </>
  );
};

export default Home;
