const express = require("express");
const router = express.Router();
const { login, register } = require("../models/user.models")

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    login(res, username, password);
});

router.put("/register", (req, res) => {
    console.log(req.body, "Console log for Register Route! Things are all good here!")
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

router.get("/verify", (req, res) => {
    return res.send({
        data: { username: req.user.username },
        success: true,
        error: null
    });
});

module.exports = router;
