import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, isPrivate, children }) => {
  const redirectTo = isPrivate ? "/login" : "/play";
  if ((user && isPrivate) || (!user && !isPrivate)) {
    return <>{children}</>;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
