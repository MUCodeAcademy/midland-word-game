const jwt = require("jsonwebtoken");
const { getRandomWord, isValidWord } = require("../shared/words");
const {getUsername,
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
  getRoomId} = require("../shared/rooms")
  
const cookie = require("cookie")
const cookieParser = require("cookie-parser")



//still needs game over logic
const socketConf = (io) => {

  io.on("connection", (socket) => {
      console.log("connect")
    //const cookiess = cookieParser.JSONCookies(socket.request.headers.cookie)
    const cookies = cookie.parse(socket.request.headers.cookie || "")
    //console.log(cookiess.access_token)
    //console.log(cookies.access_token)
    if (cookies && cookies.access_token) {
      try {
        var decoded = jwt.verify(cookies.access_token, process.env.SECRET_KEY);
        //console.log(decoded)
        if (!decoded.uuid) {
          throw "no cookie";
        }
      } catch (err) {
        socket.emit("not authenticated");
        //socket.disconnect();
      }
    }
    let username
    async function init(){
        username = await getUsername(decoded.uuid);
    }
    init()
    //console.log(username)
    let userRoomId = null;

    socket.on("create room", () => {
      console.log('creating room')
      const newRoomId = createRoom();
      if (newRoomId) {
        //when user gets this they run send join room
        socket.emit("room created", { roomId: newRoomId });
      } else {
        socket.emit("failed room create");
      }
    });

    socket.on("join room", (roomId) => {
        console.log("join room")
      if (!isValidRoom(roomId)) {
        socket.emit("invalid room")
        console.log("invalid room");
      } else if (isRoomFull(roomId)) {
          console.log("room full")
        socket.emit("room full");
      } else {
        if (userRoomId) {
          socket.leave(userRoomId);
          userRoomId = null;
        }
        if (addPlayer(roomId, username)) {
            console.log("added player")
          io.to(roomId).emit("player join", { player: getPlayer(roomId, username) });
          userRoomId = roomId;
          socket.join(roomId);
          console.log("here")
          if (isRoundRunning(roomId)) {
              console.log("round running")
            socket.emit("player data", {
              players: getAllPlayers(roomId),
              player: getPlayer(roomId, username),
              isRunningGame: isRunningGame(roomId),
              isRoundRunning: isRoundRunning(roomId),
              roundWord: getRoundWord(roomId),
            });
          } else {
              console.log("not round running")
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

    socket.on("leave room", () => {
        console.log("leave room")
      if (userRoomId) {
        if (removePlayer(userRoomId, username)) {
          if(isValidRoom){
            //socket.leave(userRoomId);
            io.to(userRoomId).emit("player leave", { username });
            io.to(userRoomId).emit("player data update", {
              players: getAllPlayers(userRoomId)
            });
          }
          userRoomId = null;
        } else {
          socket.emit("failed leave");
        }
      } else {
        socket.emit("failed leave");
      }
    });

    socket.on("start game", () => {
        console.log('start game')
      if (isHost(userRoomId, username)) {
        if (!isGameRunning(userRoomId)) {
          if (startGame(userRoomId)) {
            //client will run start round after getting this
            io.to(userRoomId).emit("game start");
          } else {
            socket.emit("failed game start");
          }
        } else {
          socket.emit("already running game");
        }
      } else {
        socket.emit("not host");
      }
    });

    socket.on("start round", () => {
        console.log("start round")
        console.log(isHost(userRoomId, username))
        console.log('----------')
        console.log(isRoundRunning(userRoomId))
      if (isHost(userRoomId, username)) {
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
        socket.emit("not host");
      }
    });

    socket.on("submit word", (word) => {
        console.log("submit word")
      if (isGameRunning(userRoomId)) {
          console.log("is running game")
        if (isRoundRunning(userRoomId)) {
            console.log('is round running')
          if (!hasWon(userRoomId, username)) {
              console.log('has won ', hasWon(userRoomId, username))
            if (!word || !isValidWord(word)) {
                console.log("invalid word")
              socket.emit("invalid word");
            } else if (submitWord(userRoomId, username, word)) {
                console.log('submited word')
              io.to(userRoomId).emit("new guess", { player: getPlayer(userRoomId, username) });
              console.log(isGameRunning(userRoomId))
              if(!isGameRunning(userRoomId)){
                io.to(userRoomId).emit("game over", { players: getAllPlayers(userRoomId)})
              }
              if(!isRoundRunning(userRoomId)){
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
    });

    socket.on("disconnect", () => {
        console.log("disconnect")
      if (userRoomId) {
        removePlayer(userRoomId, username);
        if(isValidRoom(userRoomId)){
          console.log("valid player data update")
           io.to(userRoomId).emit("player data update", {
             players: getAllPlayers(userRoomId)
           });
          io.to(userRoomId).emit("player leave", { username });
        }
      }
    });
  });

  function startCountdownTimer(duration = 120, roomId) {
      console.log('timer')
    if (duration > 0) {
      io.to(roomId).emit("round start", { players: getAllPlayers(roomId), roundWord: getRoundWord(roomId) });
      var timer = setInterval(function () {
        if(isGameRunning(roomId)){
          if (isRoundRunning(roomId) && duration > 0) {
            io.to(roomId).emit("timer countdown", { time: duration });
            duration -= 1;
          } else if(isRoundRunning(roomId)){
            endRound(roomId);
            io.to(roomId).emit("round over", { players: getAllPlayers(roomId), word: getRoundWord(roomId) });
            clearInterval(timer);
          } else {
            clearInterval(timer);
          }
        } else {
          io.to(roomId).emit("game over", { players: getAllPlayers(roomId)})
        }
      }, 1000);
    }
  }
};

module.exports = socketConf;

/**
 * -- client socket sends --
 * create room
 * join room
 * leave room
 * start game
 * start round
 * submit word
 *
 * -- client socket received --
 * not authenticated
 * room created {roomId} //will instantly call join room
 * failed room create
 * invalid room
 * room full
 * player data {playerArr []} //client will set local state to player arr returned
 * player join {player Obj} //client will add player to local state
 * failed join
 * player leave {username} //client will delete that player from local state
 * failed leave
 * game start {players: playersArr[], word} //will instantly call start round
 * already running game
 * failed game start
 * not host
 * round start {players: playersArr[], word}
 * failed round start
 * already running round
 * not playing
 * invalid word
 * new guess {player Obj}
 * player win {player Obj}
 * failed submit
 * already won
 * not running round
 * not running game
 */

// [
//   {
//     roomId: string,
//     players: [
//       {
//         username: string
//         guesses: number,
//         lastGuess: string,
//         isKnockedOut: boolean,
//         wonRound: boolean,
//         isHost: boolean,
//       },
//     ],
//     isFull: boolean,
//     isRunningGame: boolean
//     isRoundRunning: boolean,
//     currentWord: string,
//   },
// ];

/**
 * functions
 * createRoom() return boolean about success
 *      will need to create a new room obj in the room arr
 * getUsername(uuid: string) return username / null
 *      will need to query the database to get username based off uuid input
 * addPlayer(roomId: string, username: string) return boolean about success
 *      will give host to the first player to join room
 *      add player into rooms player arr
 *      if round is game is running set them to isKnockedOut: true
 * removePlayer(roomId: string, username: string) return boolean about success
 *      will need to transfer host to different player if host leaves
 *      will need to delete room if all players leave
 *      remove player from rooms player arr
 * startGame(roomId: string, currentWord: string) return boolean about success
 *      will need to reset user info guesses, lastGuess, isKnockedOut, wonRound
 *      will change the rooms isRunningGame to true
 * isRoomFull(roomId: string) return boolean
 *      will return true or false based on if the room has 10 people in it
 * isGameRunning(roomId: string) return boolean
 *      will return the rooms isRunningGame boolean
 * isValidRoom(roomId: string) return boolean
 *      will return true or false based on if the room exists or not
 * submitWord(roomId: string, username: string, word: string) return boolean about success
 *      will need to set isRoundRunning to false when all but one finish
 *      will set everyone without wonRound to isKnockedOut true
 * getPlayer(roomId: string, username: string) return user object in player arr
 * getAllPlayers(roomId: string) return the room players arr
 * hasWon(roomId: string, username: string) return boolean
 *      will return the individual players wonRound key
 * isHost(roomId: string, username: string) return boolean
 *      will return the individual players isHost key
 * isRoundRunning(roomId: string) return boolean
 *      will return the rooms isRoundRunning key
 * startRound(roomId: string) return boolean about success
 *      will set rooms isRoundRunning to true
 * getRoundWord(roomId) return string / null
 *      will return the currentWord key from the room object
 * endRound(roomId) return boolean about success
 *      will set the rooms isRoundRunning key to false
 * endGame(roomId) return boolean about success
 *      will set the rooms isRunningGAme key to false
 */

/**
 * -- changes --
 * -- current room state --
 * isRunning: boolean
 *
 * -- new room state --
 * isRunningGame: boolean
 * isRoundRunning: boolean
 *
 * -- new functions --
 * hasWon(roomId: string, username: string) return boolean
 *      will return true or false based on if player has won that round
 * isHost(roomId: string, username: string) return boolean
 *      will return the
 * isRoundRunning(roomId: string) return boolean
 *      will return the rooms isRoundRunning
 * startRound(roomId: string) return boolean about success
 *      will set rooms isRoundRunning to true
 */

/**
 * -- new functions --
 * getRoundWord(roomId) return string / null
 *      will return the currentWord key from the room object
 * endRound(roomId) return boolean about success
 *      will set the rooms isRoundRunning key to false
 * endGame(roomId) return boolean about success
 *      will set the rooms isRunningGAme key to false
 */
