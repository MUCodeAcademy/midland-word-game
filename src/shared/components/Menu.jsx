import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import { clearUser } from "../../redux/actions"
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
import useAPI from "../hooks/useAPI";

export const Menu = ({ user, clearUser }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout: logoutApi } = useAPI()

  const logout = useCallback(async() => {
    const res = await logoutApi()
    if(res.success){
      clearUser()
      setDrawerOpen(false)
    }
  }, [logoutApi, clearUser, setDrawerOpen])

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
                <NavLink to="classic" className="noTextDecor" onClick={() => setDrawerOpen(false)}>
                  <ListItem button>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>CLASSIC</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink to="play" className="noTextDecor" onClick={() => setDrawerOpen(false)}>
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText>BATTLE</ListItemText>
                  </ListItem>
                </NavLink>
                <NavLink to="about" className="noTextDecor" onClick={() => setDrawerOpen(false)}>
                  <ListItem button>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText>ABOUT</ListItemText>
                  </ListItem>
                </NavLink>
                <Divider />
                <NavLink to="" className="noTextDecor" onClick={() => logout()}>
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

const mapDispatchToProps = {
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
