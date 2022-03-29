const query = require("../config/mysql.conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

async function register(res, username, password) {
  try {
    //! Grab a user from the table with the provided username
    const [user] = await query(
      "SELECT * FROM users WHERE users.username = ?",
      [username]
    );
    if (user) {
      //! If there IS one send an error back
      return res.send({
        data: null,
        success: false,
        error: "Username already in use",
      });
    }
    //! Hash the plain text password
    const hashed = await bcrypt.hash(password, 10);
    //! Add the new user to the table
    await query(
      "INSERT INTO users (username, password, uuid) VALUES (?,?,?)",
      [username, hashed, uuid]
    );
    return res.send({
      data: "Successfully Registered!",
      success: true,
      error: null,
    });
  } catch (err) {
    //! Handle errors in catch block
    return res.send({
      data: null,
      success: false,
      error: "Something went wrong, please try again.",
    });
  }
}

async function login(res, username, password) {
  //! Grab a user from the table with the provided username
  try {
    const [user] = await query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (!user) {
      //! If there isn't one send an error back
      return res.send({
        data: null,
        success: false,
        error: "Invalid username or password",
      });
    }
    //! Compare provided password to hashed (from database)
    const match = await bcrypt.compare(password, user.password);
    //! If they don't match, send an error back
    if (!match) {
      return res.send({
        data: null,
        success: false,
        error: "Invalid username or password",
      });
    }
    //! Otherwise send back the "sanitized" user
    const token = jwt.sign({ uuid: user.uuid }, process.env.SECRET_KEY);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .send({
      data: {
        username: user.username,
      },
      success: true,
      error: null,
    });
  } catch (err) {
    //! Handle errors in catch block
    return res.send({
      data: null,
      success: false,
      error: "Something went wrong, please try again.",
    });
  }
}

module.exports = {register, login};