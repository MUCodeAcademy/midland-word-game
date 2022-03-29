const express = require("express");
const router = express.Router();
const { login, register } = require("../models/user.models")
const validate = require("../shared/validate-input")
const authenticate = require("../middleware/authenticate.middleware")

router.post("/login", validate, (req, res) => {
    const { username, password } = req.body;
    login(res, username, password);
});

router.put("/register", validate, (req, res) => {
    register(res, req.body.username, req.body.password);
});

router.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    return res.send({
        data: null,
        success: true,
        error: null,
    });
});

router.get("/verify", authenticate, (req, res) => {
    return res.send({
        data: { username: req.user.username },
        success: true,
        error: null
    });
});

module.exports = router;
