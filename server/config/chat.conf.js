const colors = [
  "IndianRed",
  "Red",
  "Crimson",
  "Orange",
  "HotPink",
  "SteelBlue",
  "Green",
  "Fuchsia",
  "Brown",
  "SaddleBrown",
  "Salmon",
  "SeaGreen",
  "MidnightBlue",
  "Olive",
  "GoldenRod",
  "Indigo",
];

const chatConf = (io) => {
  io.on("connection", (socket) => {
    const { roomId, user } = socket.handshake.query;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    socket.join(roomId);
    socket.emit("color assignment", { color: randomColor });
    io.to(roomId).emit({
      user: "SYSTEM",
      color: "grey",
      body: `${user} has entered the chat.`,
    });
    socket.on("chat message", (message) => {
      io.to(roomId).emit("new message", message);
    });
  });
  io.on("disconnection", () => {
    io.to(roomId).emit({
      user: SYSTEM,
      color: "grey",
      body: `${user} has left the chat.`,
    });
  });
};
module.exports = chatConf;
