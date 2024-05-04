import React, { useState } from "react";
import "../css/signup.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Spinner } from "@chakra-ui/react";
import Navbar from "./Navbar";

function App() {
  const BASE_URL='https://blog-backend-hcpk.onrender.com' 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  let verify = "";
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Sign up failed. Please try again."
        );
      } else {
        setErrorMessage(null);
        const token = await response.json();
     
        localStorage.setItem("token", token.data);

        verify = localStorage.getItem("token");

        if (verify) {
          window.location.href = "/";
        } else {
          
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {verify}
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
        style={{ height: "100vh" }}
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Claim Your Spot
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                {" "}
                in the Blogosphere
              </span>
            </h1>
            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Sign Up and Be Part of an Ever-Expanding Community of Bloggers!
            </p>
          </MDBCol>
          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>
            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Name"
                  id="form1"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form3"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn
                  className="w-100 mb-4"
                  size="md"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="red.500" /> : "Sign up"}
                </MDBBtn>
                {errorMessage && (
                  <p className="text-danger text-center">{errorMessage}</p>
                )}
                <div className="text-center">
                  <p>or sign up with:</p>
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="twitter" size="sm" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="github" size="sm" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default App;
