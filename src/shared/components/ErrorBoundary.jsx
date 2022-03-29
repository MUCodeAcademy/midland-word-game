import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material/Alert";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Alert severity="error">
            <AlertTitle>
              Your request could not be processed at this time. Click{" "}
              <NavLink to="home">here</NavLink> to go back home.
            </AlertTitle>
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}
