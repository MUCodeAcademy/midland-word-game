import React from "react";
import { connect } from "react-redux";

export const ProtectedRoute = (props) => {
  return <div>ProtectedRoute</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
