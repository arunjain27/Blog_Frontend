import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

function App() {
  const [openNav, setOpenNav] = useState(false);
  const toggleNav = () => setOpenNav(!openNav);
  const token = localStorage.getItem("token");
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <NavLink
            to="/"
            className="nav-link"
            style={{ color: "rgb(7, 225, 156)" }}
          >
            Musingsss
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/Myblog" activeClassName="active">
              MyBlog
            </Nav.Link>
            {token && (
              <Nav.Link as={NavLink} to="/Addblog" activeClassName="active">
                Addblog
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/Signin" activeClassName="active">
              Signin
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Signup" activeClassName="active">
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App;
