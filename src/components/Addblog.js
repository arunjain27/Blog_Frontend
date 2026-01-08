import React, { useState } from "react";
import '../css/addblog.css';
import Cookies from 'js-cookie';

const Addblog = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleGenerateAI = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/generateText`, {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          tag: formData.tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate AI text");
      }

      const data = await response.json();
      setGeneratedData(data);
      setFormData((prevData) => ({
        ...prevData,
        title: data.generatedTitle,
        tag: data.generatedTag,
        description: data.generatedDescription,
      }));
    } catch (error) {
      setErrorMessage("Failed to generate AI text. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = Cookies.get("token");

    if (!token) {
      setIsLoading(false);
      setErrorMessage("Please log in to add a blog.");
      return;
    }

    // Validate form fields
    if (!formData.title || !formData.description || !formData.tag || !formData.image) {
      setIsLoading(false);
      setErrorMessage("All fields are required.");
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

      window.location.href = "/";
      setErrorMessage("");
      setFormData({
        title: "",
        description: "",
        tag: "",
        image: null,
      });
      setGeneratedData(null);
    } catch (error) {
      setErrorMessage(error.message || "Failed to submit form data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="addblog-container">
      {isLoading && !generatedData ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <form className="addblog-form" onSubmit={handleSubmit}>
          <h2 className="addblog-title">Add New Blog</h2>
          {errorMessage && <div className="addblog-error">{errorMessage}</div>}
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter the description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              id="tag"
              name="tag"
              placeholder="Enter the tag"
              value={formData.tag}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
            <div className="form-helper">We'll never share your data.</div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-generate"
              onClick={handleGenerateAI}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate AI Text"}
            </button>
          </div>

          {generatedData && (
            <div className="generated-text">
              <label htmlFor="generatedDescription">Generated Text</label>
              <textarea
                id="generatedDescription"
                name="generatedText"
                value={generatedData.generatedDescription || ""}
                readOnly
              />
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Blog"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Addblog;
