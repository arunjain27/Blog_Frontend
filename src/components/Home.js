import React, { useEffect, useState } from 'react';
import '../css/home.css';

import Sidebar from './Sidebar';
import Rightsidebar from './Rightsidebar';
import CardComponent from './Card';

const Home = () => {
  const [userblogdetail, setUserblogdetail] = useState([]);
  const[username,setusername]=useState("None");
  let deletepost=true;
  useEffect(() => {
    getBlogDetails();
  },[]);

  const handleSignOut = () => { 
    // Remove the authentication token from local storage
    localStorage.removeItem('token');
    setusername('none'); 
    // You might also want to perform additional tasks like redirecting to the sign-in page
  };


  async function getBlogDetails() {
    try {
      let token = localStorage.getItem('token');
      if(!token)
      {
        token="";
      }
      const response = await fetch('http://localhost:8000/allpost', {
        method: 'POST',
        headers: {
          'auth-token': token,
        }, 
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts'); 
      }
     
      const blogData = await response.json();
      console.log(blogData.username)
      setusername(blogData.username);
      setUserblogdetail(blogData.userblog);
    } catch (error) { 
      console.error('Error fetching blog posts:', error);
    }
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
      setUserblogdetail(userblogdetail.filter(blog => blog.key !== deleteId));
      console.log('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
     
      <div className='home-head'>
        <div>
          <Sidebar username={username} handleSignOut={handleSignOut}/>
        </div>
        <div className='home-head-inner2'>
          {userblogdetail.map((blog) => (
            <div key={blog._id} className='home-head-inner2-card'>
              <CardComponent
                
               _id={blog._id}
                name={blog.name}
                title={blog.title}
                tag={blog.tag}
                description={blog.description}
                image={blog.image}
                deletefunction={handleDelete} 
                deletepost={deletepost}
              />
            </div>
          ))}
        </div>
        <div className=''>
          <Rightsidebar />
        </div>
      </div>
    </>
  );
}

export default Home;
