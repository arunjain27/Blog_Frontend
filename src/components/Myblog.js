import React, { useEffect, useState } from "react";
import Card from "./Card";

import { Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Alert from "./Alert";
const MyBlog = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  console.log(BASE_URL);
  const [userblogdetail, setUserBlogDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogDetails();
  }, []);

  async function getBlogDetails() {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_URL}/get`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        return;
      }
      const blogData = await response.json();

      setUserBlogDetail(blogData.userblog);
     setLoading(false);
    } catch (error) {}
  }
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
      setUserBlogDetail((prevState) =>
        prevState.filter((blog) => blog._id !== deleteId)
      );
      
    } catch (error) {}
  };

  return (
    <>
      {loading? (
        <Alert />
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
