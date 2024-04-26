import React, { useEffect, useState } from 'react';
import Card from './Card';
import Navbar from './Navbar';

const Myblog = () => {
  const [userblogdetail, setUserblogdetail] = useState([]);
  const [username, setusername] = useState("none");

  useEffect(() => {
    getBlogDetails();
  }, []);

  async function getBlogDetails() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/get', {
      method: 'POST',
      headers: {
        'auth-token': token,
      },
    });

    if (!response.ok) {
      console.log("No response");
      return;
    }

    const blogData = await response.json();
    setUserblogdetail(blogData.userblog);
    setusername(blogData.user)
    
  }

  const handleDelete = async (deleteId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setUserblogdetail(userblogdetail.filter(blog => blog._id !== deleteId));
      console.log('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  return (
  <>
      <Navbar />
        
      
      <div>
      {userblogdetail.map((blog) => (
        <Card
          key={blog._id}
          _id={blog.user}
          name={username}
          title={blog.title}
          tag={blog.tag}
          description={blog.description}
          image={blog.image}
          deletefunction={handleDelete} 
        />
      ))}
      </div>
    
    </>
  );
}

export default Myblog;
