import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useAPI from "../shared/hooks/useAPI";
import "./LoginPage.css";
import { setUser } from "../redux/actions";

export const LoginPage = ({ setUser }) => {
  const { login: apiLogin } = useAPI();
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (usernameInput.length > 20) {
      setUsernameError("Username must be at max 20 characters");
    } else if (usernameInput.length < 2) {
      setUsernameError("Username must be at least 2 characters");
    } else {
      setUsernameError(null);
    }
  }, [usernameInput]);

  useEffect(() => {
    if (passwordInput.length > 20) {
      setPasswordError("Password must be at max 20 characters");
    } else if (passwordInput.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError(null);
    }
  }, [passwordInput]);

  const login = useCallback(() => {
    async function init() {
      const res = await apiLogin(usernameInput, passwordInput);
      if (!res.success) {
        setApiError(res.error);
      } else {
        setUser(res.data.username);
      }
    }
    if (usernameError || passwordError) {
      setShowError(true);
    } else {
      init();
    }
  }, [usernameInput, usernameError, passwordInput, passwordError, setShowError, setApiError]);

  return (
    <div>
      <div className="login-container">
        {apiError && (
          <div className="login-error">
            <span>{apiError}</span>
          </div>
        )}
        <div className="login-input-container">
          <div className="input-container">
            <TextField
              style={{ width: "100%" }}
              error={showError && !!usernameError}
              label="Username"
              value={usernameInput}
              helperText={showError ? usernameError : ""}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
          <div className="input-container">
            <TextField
              style={{ width: "100%" }}
              error={showError && !!passwordError}
              label="Password"
              type="password"
              value={passwordInput}
              helperText={showError ? passwordError : ""}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={() => login()}>
            Login
          </Button>
        </div>
        <p>
          Don't have an account?{" "}
          <span className="login-redirect" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
