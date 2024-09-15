// App.jsx
import React, { Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Addblog = React.lazy(() => import("./components/Addblog"));
const Myblog = React.lazy(() => import("./components/Myblog"));
const Signin = React.lazy(() => import("./components/Signin"));
const Signup = React.lazy(() => import("./components/Signup"));
const Home = React.lazy(() => import("./components/Home"));
const Allblog = React.lazy(() => import("./components/AllBlog"));
const Footer = React.lazy(() => import("./components/Footer"));
const BlogDetails = React.lazy(() => import("./components/BlogDetails")); // Add this line
const EditBlog = React.lazy(() => import("./components/EditBlog")); // Add this line
function App() {
  const AppContainer = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    color: #333;
    max-width: 100%;
    margin: 0 auto;
    padding: 0px;
    overflow-x: hidden;
  `;

  return (
    <AppContainer>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Allblog" element={<Allblog />} />
              <Route path="/myblog" element={<Myblog />} />
              <Route path="/addblog" element={<Addblog />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/blog/:id" element={<BlogDetails />} /> {/* Add this line */}
              <Route path="/edit-blog/:id" element={<EditBlog />} />

            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </AppContainer>
  );
}

export default App;
