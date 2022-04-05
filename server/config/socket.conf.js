const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { getRandomWord, isValidWord } = require("../shared/words");
const {
  getUsername,
  createRoom,
  getPlayer,
  addPlayer,
  removePlayer,
  startGame,
  startRound,
  isGameRunning,
  isValidRoom,
  isHost,
  isRoundRunning,
  getRoundWord,
  endRound,
  endGame,
  hasWon,
  getAllPlayers,
  isRoomFull,
  submitWord,
} = require("../shared/rooms");

//still needs game over logic
const socketConf = (io) => {
  io.on("connection", (socket) => {
    console.log("connect");
    const cookies = cookie.parse(socket.request.headers.cookie || "");
    if (cookies && cookies.access_token) {
      try {
        var decoded = jwt.verify(cookies.access_token, process.env.SECRET_KEY);
        if (!decoded.uuid) {
          throw "no cookie";
        }
      } catch (err) {
        socket.emit("not authenticated");
        socket.disconnect();
      }
    }
    let username;
    let userRoomId = null;

    socket.on("create room", () => {
      console.log("creating room");
      const newRoomId = createRoom();
      if (newRoomId) {
        //when user gets this they run send join room
        socket.emit("room created", { roomId: newRoomId });
      } else {
        socket.emit("failed room create");
      }
    });

    socket.on("join room", async (roomId) => {
      console.log("join room");
      if (!isValidRoom(roomId)) {
        socket.emit("invalid room");
      } else if (isRoomFull(roomId)) {
        socket.emit("room full");
      } else {
        if (userRoomId) {
          socket.leave(userRoomId);
          userRoomId = null;
        }
        username = await getUsername(decoded.uuid);
        if (!username) {
          socket.emit("not authorized");
          socket.disconnect();
        } else if (getPlayer(roomId, username)) {
          socket.emit("already joined");
        } else if (addPlayer(roomId, username)) {
          console.log("added player");
          io.to(roomId).emit("player join", { player: getPlayer(roomId, username) });
          userRoomId = roomId;
          socket.join(roomId);
          if (isRoundRunning(roomId)) {
            socket.emit("player data", {
              players: getAllPlayers(roomId),
              player: getPlayer(roomId, username),
              isRunningGame: isGameRunning(roomId),
              isRoundRunning: isRoundRunning(roomId),
              roundWord: getRoundWord(roomId),
            });
          } else {
            socket.emit("player data", {
              players: getAllPlayers(roomId),
              player: getPlayer(roomId, username),
              isRunningGame: isGameRunning(roomId),
              isRoundRunning: isRoundRunning(roomId),
            });
          }
        } else {
          socket.emit("failed join");
        }
      }
    });

    // socket.on("leave room", () => {
    //     console.log("leave room")
    //   if (userRoomId) {
    //     if (removePlayer(userRoomId, username)) {
    //       if(isValidRoom){
    //         //socket.leave(userRoomId);
    //         io.to(userRoomId).emit("player leave", { username });
    //         io.to(userRoomId).emit("player data update", {
    //           players: getAllPlayers(userRoomId)
    //         });
    //       }
    //       userRoomId = null;
    //     } else {
    //       socket.emit("failed leave");
    //     }
    //   } else {
    //     socket.emit("failed leave");
    //   }
    // });

    socket.on("start game", () => {
      if (isValidRoom(userRoomId)) {
        console.log("start game");
        if (isHost(userRoomId, username)) {
          if (!isGameRunning(userRoomId)) {
            if (startGame(userRoomId)) {
              //client will run start round after getting this
              io.to(userRoomId).emit("game start");
              io.to(userRoomId).emit("player data update", { players: getAllPlayers(userRoomId) });
            } else {
              socket.emit("failed game start");
            }
          } else {
            socket.emit("already running game");
          }
        } else {
          socket.emit("not host");
        }
      } else {
        socket.emit("invalid room");
      }
    });

    socket.on("start round", () => {
      if (isValidRoom(userRoomId)) {
        console.log("start round");
        if (isHost(userRoomId, username)) {
          if (isGameRunning(userRoomId)) {
            if (!isRoundRunning(userRoomId)) {
              if (startRound(userRoomId, getRandomWord())) {
                //round start event sent in startCountdownTimer
                startCountdownTimer(120, userRoomId);
              } else {
                socket.emit("failed round start");
              }
            } else {
              socket.emit("already running round");
            }
          } else {
            socket.emit("not running game");
          }
        } else {
          socket.emit("not host");
        }
      } else {
        socket.emit("invalid room");
      }
    });

    socket.on("submit word", (word) => {
      if (isValidRoom(userRoomId)) {
        console.log("submit word");
        if (isGameRunning(userRoomId)) {
          if (isRoundRunning(userRoomId)) {
            if (!hasWon(userRoomId, username)) {
              if (!word || !isValidWord(word)) {
                socket.emit("invalid word");
              } else if (submitWord(userRoomId, username, word)) {
                io.to(userRoomId).emit("new guess", { player: getPlayer(userRoomId, username) });
                if (!isGameRunning(userRoomId)) {
                  io.to(userRoomId).emit("game over", { players: getAllPlayers(userRoomId) });
                }
                if (!isRoundRunning(userRoomId)) {
                  io.to(userRoomId).emit("round over", { players: getAllPlayers(userRoomId), word: getRoundWord(userRoomId) });
                }
              } else {
                socket.emit("failed submit");
              }
            } else {
              socket.emit("already won");
            }
          } else {
            socket.emit("not running round");
          }
        } else {
          socket.emit("not running game");
        }
      } else {
        socket.emit("invalid room");
      }
    });

    // socket.on("host check", () => {
    //   if(isValidRoom(userRoomId)){
    //     socket.emit("host check return", {players: getAllPlayers(userRoomId)})
    //   } else {
    //     socket.emit("invalid room")
    //   }
    // })

    socket.on("disconnect", () => {
      console.log("disconnect");
      if (userRoomId) {
        removePlayer(userRoomId, username);
        if (isValidRoom(userRoomId)) {
          io.to(userRoomId).emit("player data update", { players: getAllPlayers(userRoomId) });
          io.to(userRoomId).emit("player leave", { username });
        }
      }
    });
  });

  function startCountdownTimer(duration = 120, roomId) {
    console.log("timer");
    if (duration > 0) {
      io.to(roomId).emit("round start", { players: getAllPlayers(roomId), roundWord: getRoundWord(roomId) });
      var timer = setInterval(function () {
        if (isValidRoom(roomId)) {
          if (isGameRunning(roomId)) {
            if (isRoundRunning(roomId) && duration > 0) {
              io.to(roomId).emit("timer countdown", { time: duration });
              duration -= 1;
            } else if (isRoundRunning(roomId)) {
              endRound(roomId);
              io.to(roomId).emit("round over", { players: getAllPlayers(roomId), word: getRoundWord(roomId) });
              clearInterval(timer);
            } else {
              clearInterval(timer);
            }
          } else {
            io.to(roomId).emit("game over", { players: getAllPlayers(roomId) });
          }
        } else {
          clearInterval(timer);
        }
      }, 1000);
    }
  }
};

module.exports = socketConf;
