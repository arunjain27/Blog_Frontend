import React, { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import { Spinner } from "@chakra-ui/react";

const MyBlog = () => {
  const [userblogdetail, setUserBlogDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBlogDetails();
  }, []);

  async function getBlogDetails() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/get", {
        method: "POST",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.log("No response");
        return;
      }
      const blogData = await response.json();
      console.log(blogData.userblog);
      setUserBlogDetail(blogData.userblog);
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
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
      setUserBlogDetail((prevState) =>
        prevState.filter((blog) => blog._id !== deleteId)
      );
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Navbar />
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
        <div>
          {userblogdetail.map((blog) => (
            <Card
              _id={blog._id}
              name={blog.name}
              title={blog.title}
              tag={blog.tag}
              date={blog.date}
              description={blog.description}
              image={blog.image}
              deletefunction={handleDelete}
              deletepost={false} // Assuming you want to allow post deletion in this view
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyBlog;
