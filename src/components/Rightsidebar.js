import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

import '../css/home.css'
import '../css/sidebar.css'
import { border } from '@chakra-ui/react';
import { color } from 'framer-motion';
 
const Sidebar = () => {

  let obj={fontWeight:'500',fontSize:'1rem',fontFamily: "sans-serif",color:'rgb(231, 247, 248)',fontFamily:'cursive'};
  let objcat={fontWeight:'bold',fontSize:'1.2rem',fontFamily: "sans-serif",color:'rgb(231, 247, 248)'};

  // let background="linear-gradient(90deg, rgba(214,243,236,1) 0%, rgba(255,252,252,1) 0%, rgba(208,255,247,1) 0%, rgba(247,247,247,1) 100%)"
  let background="rgb(16, 57, 59)"
  return (
    <div >
      {/* Add a wrapper div with width 100% */}
      <div >
        <CDBSidebar textColor="rgb(86, 86, 86)" backgroundColor={background} style={{height:'100vh',boxShadow: "1px 1px 2px 1px rgb(202, 201, 201)",color:'white'}}>
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns" style={objcat}>Categories</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Myblog" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table" style={obj} >Entertainment</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Addblog" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user"  style={obj}> Business</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Signin" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line" style={obj}>Sports</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/Signup" tactiveClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle" style={obj}>Fashion</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
 
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
