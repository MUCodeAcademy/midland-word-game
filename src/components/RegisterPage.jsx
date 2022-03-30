import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button } from "@mui/material";
import useAPI from "../shared/hooks/useAPI";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passMatchError, setPassMatchError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { register: apiRegister } = useAPI();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (passwordInput !== confirmPassword) {
      setPassMatchError("Passwords do not match.");
    } else {
      setPassMatchError(null);
    }
  }, [confirmPassword]);

  const register = useCallback(async () => {
    const res = await apiRegister(usernameInput, passwordInput);
    if (!res.success) {
      setApiError(res.error);
    } else if (usernameError || passwordError || passMatchError) {
      setShowError(true);
    } else {
      navigate("/login");
    }
  });

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
          <div>
            <TextField
              style={{ width: "100%" }}
              error={showError && !!passMatchError}
              label="Confirm password"
              value={confirmPassword}
              helperText={showError ? passMatchError : ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={() => register()}>
            Register
          </Button>
        </div>
        <p>
          Already have an account?{" "}
          <span className="login-redirect" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
