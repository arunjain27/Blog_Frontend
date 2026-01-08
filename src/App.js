import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './css/global.css';

const Addblog = React.lazy(() => import("./components/Addblog"));
const Myblog = React.lazy(() => import("./components/Myblog"));
const Signin = React.lazy(() => import("./components/Signin"));
const Signup = React.lazy(() => import("./components/Signup"));
const Home = React.lazy(() => import("./components/Home"));
const Allblog = React.lazy(() => import("./components/AllBlog"));
const BlogDetails = React.lazy(() => import("./components/BlogDetails"));
const EditBlog = React.lazy(() => import("./components/EditBlog"));

const LoadingFallback = () => (
  <div className="spinner-container" style={{ minHeight: '50vh' }}>
    <div className="spinner"></div>
  </div>
);

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Allblog" element={<Allblog />} />
              <Route path="/myblog" element={<Myblog />} />
              <Route path="/addblog" element={<Addblog />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/edit-blog/:id" element={<EditBlog />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
