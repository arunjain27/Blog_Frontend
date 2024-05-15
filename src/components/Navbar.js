import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
function App() {
  const token = Cookies.get("token");
  const user = Cookies.get("username");

  const [checktoken, setchecktoken] = useState(token);
  const [username, setUsername] = useState(user);

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    setchecktoken("");
    window.location.href = "/Myblog";
    setUsername("None");
  };
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
            {checktoken ? (
              <>
                <Nav.Link as={NavLink} to="/Addblog" activeClassName="active">
                  Addblog
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/signout"
                  activeClassName="active"
                  onClick={handleSignOut}
                >
                  Signout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/Signin" activeClassName="active">
                  Signin
                </Nav.Link>
                <Nav.Link as={NavLink} to="/Signup" activeClassName="active">
                  Signup
                </Nav.Link>
              </>
            )}

            <Nav.Link
              style={{
                marginLeft: "30px",
                color: "lightblue",
                fontWeight: "500",
              }}
            >
              Signed in as :{username}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App;
