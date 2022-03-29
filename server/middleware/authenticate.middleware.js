const passport = require("passport");

async function authenticate(req, res, next) {
  await passport.authenticate("jwt", (err, user, info) => {
    if (err || !user) {
      res.clearCookie("access_token");
      return res.send({ success: false, data: null, error: info });
    }
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = authenticate;
