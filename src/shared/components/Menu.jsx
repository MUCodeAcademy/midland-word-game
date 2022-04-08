import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/PersonAdd";
import { clearUser } from "../../redux/actions";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Toolbar,
} from "@mui/material";
import useAPI from "../hooks/useAPI";

export const Menu = ({ user, clearUser }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout: logoutApi } = useAPI();

  const logout = useCallback(async () => {
    const res = await logoutApi();
    if (res.success) {
      clearUser();
      setDrawerOpen(false);
    }
  }, [logoutApi, clearUser, setDrawerOpen]);

  return (
    <>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <img
            className="menu-icon"
            alt="word-battle-icon"
            src="/word-game-logo.png"
          />
          <IconButton
            style={{ alignSelf: "flex-end", color: "#faf8d4" }}
            size="large"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      >
        <Box width=" 250px">
          <List>
            {!user && (
              <>
                <NavLink
                  to="register"
                  className="menu-link"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItem button className="menu-item">
                    <ListItemIcon>
                      <RegisterIcon />
                    </ListItemIcon>
                    <ListItemText>Register</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  to="login"
                  className="menu-link"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItem button className="menu-item">
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                  </ListItem>
                </NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink
                  to="classic"
                  className="menu-link"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItem button className="menu-item">
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Classic</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink
                  to="play"
                  className="menu-link"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItem button className="menu-item">
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText>Battle</ListItemText>
                  </ListItem>
                </NavLink>
              </>
            )}
            <NavLink
              to="about"
              className="menu-link"
              onClick={() => setDrawerOpen(false)}
            >
              <ListItem button className="menu-item">
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
              </ListItem>
            </NavLink>
            <Divider />
            {user && (
              <>
                <NavLink to="" className="menu-link" onClick={() => logout()}>
                  <ListItem button className="menu-item">
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </ListItem>
                </NavLink>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
