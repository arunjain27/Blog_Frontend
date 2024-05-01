import React from "react";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  let obj = {
    fontWeight: "500",
    fontSize: "1rem",
    color: "rgb(231, 247, 248)",
    fontFamily: "cursive",
  };
  let objcat = {
    fontWeight: "bold",
    fontSize: "1.2rem",
    fontFamily: "sans-serif",
    color: "rgb(231, 247, 248)",
  };

  let background = "rgb(16, 57, 59)";
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
          <CDBSidebarHeader
            prefix={<i className="fa fa-bars fa-large"></i>}
          ></CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns" style={objcat}>
                  Categories
                  <span
                    style={{
                      color: "lightgrey",
                      fontSize: "0.5rem",
                      marginLeft: "5px",
                    }}
                  >
                    (beta)
                  </span>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Myblog" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table" style={obj}>
                  Entertainment
                  <span
                    style={{
                      color: "lightgrey",
                      fontSize: "0.5rem",
                      marginLeft: "5px",
                    }}
                  >
                    (beta)
                  </span>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Addblog" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user" style={obj}>
                  {" "}
                  Business
                  <span
                    style={{
                      color: "lightgrey",
                      fontSize: "0.5rem",
                      marginLeft: "5px",
                    }}
                  >
                    (beta)
                  </span>
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Signin" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line" style={obj}>
                  Sports
                  <span
                    style={{
                      color: "lightgrey",
                      fontSize: "0.5rem",
                      marginLeft: "5px",
                    }}
                  >
                    (beta)
                  </span>{" "}
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/Signup" tactiveClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle" style={obj}>
                  Fashion{" "}
                  <span
                    style={{
                      color: "lightgrey",
                      fontSize: "0.5rem",
                      marginLeft: "5px",
                    }}
                  >
                    (beta)
                  </span>
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
