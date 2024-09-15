import React, { useState, useEffect } from 'react';
import {Navbar,Container,Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../css/home.css";

function NavScrollExample() {
  const [username, setUsername] = useState(Cookies.get('username'));
  const [token, setToken] = useState(Cookies.get('token'));

  useEffect(() => {
    setUsername(Cookies.get('username'));
    setToken(Cookies.get('token'));
  }, []);

  const handleSignOut = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setToken('');
    setUsername('');
    window.location.href = '/';
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
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
             <Nav.Link as={NavLink} to="/Allblog" activeClassName="active">
              AllBlog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Myblog" activeClassName="active">
              MyBlog
            </Nav.Link>
            {token ? (
              <>
                <Nav.Link as={NavLink} to="/Addblog" activeClassName="active">
                  Addblog
                </Nav.Link>
               
                <Nav.Link as={NavLink} to="/signout" activeClassName="active" onClick={handleSignOut}>
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
          </Nav>
         
          <span
            style={{
            
              color: "lightblue",
              fontWeight: "500",
            }}
          >
            Signed in as: {username ? username : "Guest"}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
