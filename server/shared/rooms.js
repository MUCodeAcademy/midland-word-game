import query from "../config/mysql.conf";

const roomID = () => {
  const newRoom = (Math.random() + 1).toString(36).substring(7);
  return newRoom;
};

const rooms = [
  {
    roomId: "",
    players: [
      {
        username: "username",
        guesses: 0,
        lastGuess: "words",
        isKnockedOut: false,
        wonRound: false,
        isHost: true,
      },
    ],
    isFull: false,
    isRunningGame: false,
    isRunningRound: false,
    currentWord: "shortking🤴",
  },
];

const createRoom = () => {
  const room = {
    roomId: (Math.random() + 1).toString(36).substring(7),
    players: [],
    isFull: false,
    isRunningGame: false,
    isRunningRound: false,
    currentWord: "shortking🤴",
  };
  if (
    !room.roomId ||
    !room.players ||
    !room.isFull ||
    !room.isRunningGame ||
    !room.isRunningRound ||
    !room.currentWord
  ) {
    return false;
  }
  rooms.push(room);
  return room.roomId;
};

const getUsername = async (uuid) => {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.uuid = ?", [
      uuid,
    ]);
    if (!user) {
      return null;
    }
    return user.username;
  } catch (err) {
    return null;
  }
};

const getPlayer = (roomId, username) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  const [player] = room.players.filter((e) => e.username === username);
  if (!player) {
    return false;
  }
  return player;
};

//?
const addPlayer = (roomId, username) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  let numPlayers = room.players.length;
  const newPlayer = {
    username: username,
    guesses: 0,
    lastGuess: "words",
    isKnockedOut: false,
    wonRound: false,
    isHost: true,
  };
  if (numPlayers < 10) {
    room.players.push(newPlayer);
    let [player] = room.players.filter((e) => e.username === username);
    if (room.isRunning === true) {
      player.isKnockedOut = true;
    }
    if (numPlayers === 1) {
      player.isHost = true;
    } else if (numPlayers === 10) {
      room.isFull = true;
    }
    return true;
  } else {
    return false;
  }
};

//?
const removePlayer = (roomId, username) => {
  try {
    let [room] = rooms.filter((e) => e.roomId === roomId);
    let [player] = room.players.filter((e) => e.username === username);
    let numPlayers = room.players.length;
    if (player.isHost === true) {
      player.isHost = false;
      let newHost = room.players.at(0);
      newHost.isHost = true;
    }
    room.players.filter((e) => e.username === player.username);
    if (numPlayers === 0) {
      rooms.filter((e) => e.roomId === room.roomId);
    } else if (numPlayers > 10) {
      room.isFull = false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

const startGame = (roomId) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  if (room.isGameRunning === false) {
    room.isGameRunning = true;
    room.players.forEach(
      (e) => (e.guesses = 0),
      (e.lastGuess = ""),
      (e.isKnockedOut = false),
      (e.wonRound = false)
    );
    return true;
  }
  return false;
};

// need to reset players keys
//X should be alright but probably double check
const startRound = (roomId, currentWord) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  if (!room.isRunningRound) {
    room.isRunningRound = true;
    room.players.forEach((e) => (e.guesses = 0), (e.lastGuess = ""));
    room.currentWord = currentWord;
  }
  return true;
};

const isGameRunning = async (roomId) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  if (room.isRunningGame) {
    return true;
  }
  return false;
};

const isValidRoom = (roomId) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  if (room) {
    return true;
  }
  return false;
};

//?
const submitWord = (roomId, username, word) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  let [player] = room.players.filter((e) => e.username === username);
  if (word) {
    player.lastGuess = word;
    if (player.lastGuess === room.currentWord) {
      player.wonRound = true;
    }
    let correctGuessers = room.players.filter((e) => e.wonRound === true);
    let currentPlayers = room.players.filter(
      (e) => e.wonRound === true && e.isKnockedOut === false
    );
    if (correctGuessers.length <= currentPlayers) {
      winners.push(player);
    } else {
      player.isKnockedOut = true;
      room.isRunningRound = false;
    }
    return true;
  }
  return false;
};

const isHost = (roomId, username) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  let [player] = room.players.filter((e) => e.username === username);
  return player.isHost;
};

const isRoundRunning = (roomId) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  return room.isRoundRunning;
};

const getRoundWord = (roomId) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  return room.currentWord;
};

const endRound = (roomId) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  if (room.isRunningRound) {
    room.isRunningRound = false;
    return true;
  }
  return false;
};

const endGame = (roomId) => {
  let [room] = rooms.filter((e) => e.roomId === roomId);
  if (room.isRunningGame) {
    room.isRunningRound = false;
    return true;
  }
  return false;
};

//* Quick note on this one:
//Should be good to go once getting the room correctly!
//TODO isRoomFull(roomId) return true / false
//? checking length of players array and then changing boolean based off that
const isRoomFull = async (roomId) => {
  const room = rooms.find((e) => e.roomId === roomId);
  if (room.players.length >= 10) {
    return true;
  }
  return false;
};
//! ^ Done

//* Some notes on this function:
// Okay Brett, so for this one, I don't think we need to check if the room is empty
// We remove the room if there are no players in the room
// I think one way to do this would be replacing the lines after let [room] with
// just a return line of room.players (I think that should do the trick)

//TODO getAllPlayers(roomId: string) return the room players arr
const getAllPlayers = async (roomId) => {
  let room = rooms.filter((e) => e.players);
  return room.players;
};
//!  ^ Done

//TODO hasWon(roomId: string, username: string) return boolean
// will return the individual players wonRound key
const hasWon = async (roomId, username) => {
  let room = rooms.find((e) => e.roomId);
  let player = room.players.find((e) => e.username);
  if (player.lastGuess === room.currentWord) {
    return true;
  }
  return false;
};
//! ^ Done
module.exports = {
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
};

//! Register page "CONFIRM PASSWORD" needs to be passed as a password type
//! Feedback for successful register
//! Remove Login and Register button from Menu once logged in
//! Fix Register button routing from Login page
