import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";

export const Menu = () => {
  const [battleOptions, setBattleOptions] = useState(false);
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isActive] = useState();
  const battleClick = () => {
    setBattleOptions(true);
  };

  return (
    <>
      {!user && (
        <>
          <NavLink
            to="register"
            className={({ isActive }) => (isActive ? "activeLink" : "link")}
          >
            Register
          </NavLink>
          <NavLink
            to="login"
            className={({ isActive }) => (isActive ? "activeLink" : "link")}
          >
            Login
          </NavLink>
        </>
      )}
      {user && (
        <>
          <Button onClick={() => setDrawerOpen(true)}>Menu</Button>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box width=" 250px" textAlign="center" role="presentation">
              <NavLink to="about">About</NavLink>
              <NavLink to="classic">Classic</NavLink>
              <NavLink to="play" onClick={battleClick}>
                Battle
              </NavLink>
              {battleOptions && (
                <div>
                  <NavLink to="create">Create Battle</NavLink>
                  <NavLink to="join">Join Battle</NavLink>
                </div>
              )}
              <NavLink to="login">Logout</NavLink>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
