import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  const [battleOptions, setBattleOptions] = useState(false);

  const battleClick = () => {
    setBattleOptions(true);
  };
  return (
    <nav>
      {!user && (
        <div>
          <NavLink to="register">Register</NavLink>
          <NavLink to="login">Login</NavLink>
        </div>
      )}
      {user && (
        <div>
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
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
