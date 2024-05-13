import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  FormHelperText,
  Spinner,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
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
      const generatedData = await response.json();
      setGeneratedData(generatedData);
      setFormData({
        ...formData,
        title: generatedData.generatedTitle,
        tag: generatedData.generatedTag,
        description: generatedData.generatedDescription,
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to generate AI text. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      setErrorMessage("Please log in to add a blog.");
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
        throw new Error("Failed to submit form data");
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
      setErrorMessage("Failed to submit form data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      {isLoading ? (
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
          <FormControl>
            <FormLabel style={{ textAlign: "center", fontSize: "1.7rem" }}>
              Title
            </FormLabel>
            <Input
              type="text"
              name="title"
              placeholder="Enter the title"
              value={formData.title}
              onChange={handleChange}
              style={{ backgroundColor: "rgb(249, 249, 249)" }}
            />
            <FormLabel style={{ textAlign: "center", fontSize: "1.7rem" }}>
              Description
            </FormLabel>
            <Textarea
              type="text"
              name="description"
              placeholder="Enter the description"
              value={formData.description}
              onChange={handleChange}
              style={{ backgroundColor: "rgb(249, 249, 249)" }}
            />
            <FormLabel style={{ textAlign: "center", fontSize: "1.7rem" }}>
              Tag
            </FormLabel>
            <Input
              type="text"
              name="tag"
              placeholder="Enter the tag"
              value={formData.tag}
              onChange={handleChange}
              style={{ backgroundColor: "rgb(249, 249, 249)" }}
            />
            <FormLabel style={{ textAlign: "center", fontSize: "1.7rem" }}>
              Upload Image
            </FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleChange}
              style={{ backgroundColor: "rgb(249, 249, 249)" }}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <Button type="button" onClick={handleGenerateAI}>
              Generate AI Text
            </Button>
            <FormLabel style={{ textAlign: "center", fontSize: "1.7rem" }}>
              Generated Text
            </FormLabel>
            <Textarea
              type="text"
              name="generatedText"
              value={generatedData ? generatedData.generatedDescription : ""}
              readOnly
              style={{ backgroundColor: "rgb(249, 249, 249)" }}
            />
            <Button type="button" onClick={handleSubmit}>
              Submit Blog
            </Button>
            {/* Spinner */}

            {/* Error message */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </FormControl>
        </div>
      )}
    </div>
  );
};
export default Addblog;
