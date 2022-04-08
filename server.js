require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const userRoutes = require("./server/routes/user.routes");
const passport = require("./server/config/passport.conf");
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const socketConf = require("./server/config/socket.conf");
const chatConf = require("./server/config/chat.conf");

const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});
socketConf(io);
chatConf(io);

app.use(express.json());
app.use(express.static(__dirname + "/build"));
app.use(cookieParser());
// the passport.initialize line should work once we complete the passport.conf
app.use(passport.initialize());
// the following line needs to have the correct path (could change, may be the same)
app.use("/api/users", userRoutes);
app.get("*", (req, res) => {
  if (process.env.NODE_ENV === "production" && !req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
