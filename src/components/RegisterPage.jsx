import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TextField, Button } from "@mui/material";
import useAPI from "../shared/hooks/useAPI";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const { register: apiRegister } = useAPI();
  const navigate = useNavigate();

  const usernameError = useMemo(() => {
    return (
      usernameTouched && (usernameInput.length > 20 || usernameInput.length < 2)
    );
  }, [usernameInput, usernameTouched]);

  const passwordError = useMemo(() => {
    return (
      passwordTouched && (passwordInput.length > 20 || passwordInput.length < 6)
    );
  }, [passwordInput, passwordTouched]);

  const confirmError = useMemo(() => {
    return (
      (passwordTouched || confirmTouched) && passwordInput !== confirmPassword
    );
  }, [confirmPassword, passwordTouched, passwordInput, confirmTouched]);

  const register = useCallback(async () => {
    if (
      passwordError ||
      confirmError ||
      usernameError ||
      !usernameTouched ||
      !passwordTouched ||
      !confirmTouched
    ) {
      return;
    }
    setApiError(null);
    setApiSuccess(null);
    const res = await apiRegister(usernameInput, passwordInput);
    if (!res.success) {
      setApiError(res.error);
    } else {
      setApiSuccess("Successfully signed up!");
      resetForm();
    }
  });

  const resetForm = () => {
    setConfirmPassword("");
    setUsernameInput("");
    setPasswordInput("");
    setConfirmTouched(false);
    setUsernameTouched(false);
    setPasswordTouched(false);
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-message">
          {apiError && (
            <div className="login-error">
              <span>{apiError}</span>
            </div>
          )}
          {apiSuccess && (
            <div className="login-success">
              <span>{apiSuccess}</span>
            </div>
          )}
        </div>

        <div className="login-input-container">
          <div className="input-container">
            <TextField
              style={{ width: "100%" }}
              error={usernameError && usernameTouched}
              label="Username"
              value={usernameInput}
              helperText={"Must be between 2 and 20 characters"}
              onChange={(e) => {
                setUsernameInput(e.target.value);
                setUsernameTouched(true);
              }}
            />
          </div>
          <div className="input-container">
            <TextField
              style={{ width: "100%" }}
              error={passwordError && passwordTouched}
              label="Password"
              type="password"
              value={passwordInput}
              helperText={"Must be between 6 and 20 characters"}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordTouched(true);
              }}
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              error={confirmError}
              label="Confirm password"
              type="password"
              value={confirmPassword}
              helperText={
                confirmPassword !== passwordInput || confirmPassword === ""
                  ? "Passwords must match"
                  : "Passwords Match"
              }
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmTouched(true);
              }}
            />
          </div>
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            onClick={() => register()}
          >
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
