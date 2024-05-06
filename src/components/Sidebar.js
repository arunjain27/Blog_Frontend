import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "../css/home.css";



const Sidebar = ({ username, handleSignOut }) => {
  let obj = {
    fontWeight: "bold",
    fontSize: "1.1rem",
    fontFamily: "sans-serif",
    color: "rgb(231, 247, 248)",
  };
  let obj1 = {
    fontWeight: "500",
    fontSize: "1rem",
    fontFamily: "Times New Roman",
    color: "rgb(231, 247, 248)",
  };

  const token = localStorage.getItem("token");

  let background = "rgb(16, 57, 59)";

  const authToken = localStorage.getItem("token");
 
  return (
    <div>
      <div>
        <CDBSidebar
          textColor="rgb(86, 86, 86)"
          backgroundColor={background}
          style={{
            height: "100vh",
            boxShadow: "1px 1px 2px 1px rgb(202, 201, 201)",
            color: "white",
          }}
        >
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <p style={obj1}>{username}</p>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns" style={obj}>
                  Home
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Myblog" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table" style={obj}>
                  Myblog
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/Addblog" activeClassName="activeClicked">
                {token ? (
                  <CDBSidebarMenuItem icon="user" style={obj}>
                    {" "}
                    Addblog
                  </CDBSidebarMenuItem>
                ) : (
                  ""
                )}
              </NavLink>

              {authToken ? (
                <CDBSidebarMenuItem
                  icon="chart-line"
                  style={obj}
                  onClick={handleSignOut}
                >
                  Sign Out
                </CDBSidebarMenuItem>
              ) : (
                <div>
                  <NavLink exact to="/Signin" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="chart-line" style={obj}>
                      Sign In
                    </CDBSidebarMenuItem>
                  </NavLink>

                  <NavLink exact to="/Signup" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="exclamation-circle" style={obj}>
                      Sign Up
                    </CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
