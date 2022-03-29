function validate(req, res, next) {
    const { username, password } = req.body
    if (!username ||
        !password ||
        username.length < 2 ||
        username.length > 20 ||
        password.length < 6 ||
        password.length > 20) {
        return res.send({
            data: null,
            success: false,
            error: "Credentials fail to meet criteria."
        })
    }
    return next();
}

module.exports = validate