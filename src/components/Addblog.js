import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import '../css/addblog.css';
import Cookies from 'js-cookie';
import { ToastContext } from "../App";

const Addblog = () => {
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useContext(ToastContext);
  const username = Cookies.get("username");

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleGenerateAI = async () => {
    if (!formData.title && !formData.description && !formData.tag) {
      if (toast) toast.warning("Please fill in at least one field to generate AI content.");
      return;
    }

    setIsGenerating(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${BASE_URL}/generateText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title || "No title provided",
          description: formData.description || "No description provided",
          tag: formData.tag || "Use according to the content",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate AI text");
      }

      const data = await response.json();
      setGeneratedData(data);
      setFormData((prevData) => ({
        ...prevData,
        title: data.generatedTitle || prevData.title,
        tag: data.generatedTag || prevData.tag,
        description: data.generatedDescription || prevData.description,
      }));
      
      if (toast) toast.success("AI content generated successfully!");
    } catch (error) {
      const errorMsg = "Failed to generate AI text. Please try again later.";
      setErrorMessage(errorMsg);
      if (toast) toast.error(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = Cookies.get("token");

    if (!token) {
      setIsLoading(false);
      const errorMsg = "Please log in to add a blog.";
      setErrorMessage(errorMsg);
      if (toast) toast.error(errorMsg);
      return;
    }

    // Validate form fields
    if (!formData.title || !formData.description || !formData.tag || !formData.image) {
      setIsLoading(false);
      const errorMsg = "All fields are required.";
      setErrorMessage(errorMsg);
      if (toast) toast.warning(errorMsg);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("tag", formData.tag);
      formDataToSend.append("image", formData.image);

      const response = await fetch(`${BASE_URL}/blogdetail`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form data");
      }

      if (toast) toast.success("Blog posted successfully!");
      window.location.href = "/";
    } catch (error) {
      const errorMsg = error.message || "Failed to submit form data. Please try again later.";
      setErrorMessage(errorMsg);
      if (toast) toast.error(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="addblog-page">
      <div className="addblog-container">
        <div className="addblog-header">
          <h1 className="addblog-main-title">
            <span className="addblog-title-icon">✍️</span>
            Create Your Blog Post
          </h1>
          <p className="addblog-subtitle">
            Share your thoughts, ideas, and stories with the world
          </p>
        </div>

        <div className="addblog-form-wrapper">
          <form className="addblog-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="addblog-error">
                <i className="fas fa-exclamation-circle"></i>
                {errorMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">
                <i className="fas fa-heading"></i>
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter a captivating title for your blog..."
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tag">
                <i className="fas fa-tag"></i>
                Category / Tag
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                placeholder="e.g., Technology, Lifestyle, Travel..."
                value={formData.tag}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                <i className="fas fa-align-left"></i>
                Blog Content
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Write your blog post content here... Share your thoughts, ideas, and experiences."
                value={formData.description}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="12"
              />
              <div className="form-helper">
                <i className="fas fa-info-circle"></i>
                Tip: Write engaging content that captures your readers' attention
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="image">
                <i className="fas fa-image"></i>
                Featured Image
              </label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="file-input"
                />
                <label htmlFor="image" className="file-upload-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>{imagePreview ? "Change Image" : "Choose Image"}</span>
                </label>
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="form-helper">
                <i className="fas fa-image"></i>
                Recommended: High-quality images (JPG, PNG) up to 5MB
              </div>
            </div>

            <div className="form-divider">
              <span>or</span>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-generate"
                onClick={handleGenerateAI}
                disabled={isGenerating || isLoading}
              >
                {isGenerating ? (
                  <>
                    <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                    Generating AI Content...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magic"></i>
                    Generate with AI
                  </>
                )}
              </button>
            </div>

            {generatedData && (
              <div className="generated-content">
                <div className="generated-content-header">
                  <i className="fas fa-sparkles"></i>
                  <span>AI Generated Content</span>
                </div>
                <div className="generated-content-body">
                  <p className="generated-notice">
                    <i className="fas fa-lightbulb"></i>
                    Review and edit the AI-generated content below. You can modify it as needed.
                  </p>
                </div>
              </div>
            )}

            <div className="form-submit-section">
              <button
                type="submit"
                className="btn btn-submit"
                disabled={isLoading || isGenerating}
              >
                {isLoading ? (
                  <>
                    <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Publish Blog Post
                  </>
                )}
              </button>
              <Link to="/Allblog" className="btn-cancel">
                <i className="fas fa-times"></i>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addblog;
