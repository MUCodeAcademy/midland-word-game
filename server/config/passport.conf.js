const passport = require("passport");
const { Strategy } = require("passport-jwt");
const query = require("./mysql.conf");

const cookieExtractor = (req) => {
  if (!req || !req.cookies) {
    return null;
  }
  return req.cookies.access_token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  "jwt",
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      if (!jwt_payload || !jwt_payload.uuid) {
        return done(null, false, "Invalid Credentials");
      }
      const [user] = await query("SELECT username, uuid FROM users WHERE users.uuid = ?", [jwt_payload.uuid]);
      if (!user) {
        return done(null, false, "Invalid Credentials");
      }
      return done(null, user);
    } catch (error) {
      return done("Something went wrong.");
    }
  })
);

module.exports = passport;
