import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ButtonGroup,
} from "@mui/material";

export const Menu = ({ user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      {!user && (
        <>
          <AppBar position="static">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Toolbar>
                <ButtonGroup color="secondary" variant="contained">
                  <Button>
                    <NavLink to="register" className="noTextDecor">
                      REGISTER
                    </NavLink>
                  </Button>
                  <Button>
                    <NavLink to="login" className="noTextDecor">
                      LOGIN
                    </NavLink>
                  </Button>
                  <Button>
                    <NavLink to="about" className="noTextDecor">
                      ABOUT
                    </NavLink>
                  </Button>
                </ButtonGroup>
              </Toolbar>
            </Box>
          </AppBar>
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
                <NavLink to="classic" className="noTextDecor">
                  <ListItem button>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>CLASSIC</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink to="play" className="noTextDecor">
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText>BATTLE</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink to="about" className="noTextDecor">
                  <ListItem button>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText>ABOUT</ListItemText>
                  </ListItem>
                </NavLink>
                <Divider />
                <NavLink to="login" className="noTextDecor">
                  <ListItem button>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>LOGOUT</ListItemText>
                  </ListItem>
                </NavLink>
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
