import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

export const Menu = ({ user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          <IconButton size="large" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box width=" 250px">
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <NavLink to="classic" className="noTextDecor">
                      CLASSIC
                    </NavLink>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <NavLink to="play" className="noTextDecor">
                      BATTLE
                    </NavLink>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <NavLink to="about" className="noTextDecor">
                      ABOUT
                    </NavLink>
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <NavLink to="login" className="noTextDecor">
                      LOGOUT
                    </NavLink>
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
