import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <MDBNavbar expand='lg' dark bgColor='dark'>
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <NavLink to="/" className="nav-link">
            Navbar
          </NavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={openNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <NavLink to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to="/Myblog" className="nav-link" activeClassName="active">
                MyBlog
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to="/Addblog" className="nav-link" activeClassName="active">
                Addblog
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to="/Signin" className="nav-link" activeClassName="active">
                Signin
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to="/Signup" className="nav-link" activeClassName="active">
                Signup
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <NavLink to="/front" className="nav-link" activeClassName="active">
                Front
              </NavLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
