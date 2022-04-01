import query from "../config/mysql.conf";

const getRoomId = () => {
  const newRoom = (Math.random() + 1).toString(36).substring(7);
  return newRoom;
};

const rooms = [
  {
    roomId: "",
    players: [
      {
        username: "",
        guesses: 0,
        lastGuess: "",
        isKnockedOut: false,
        wonRound: false,
        isHost: true,
      },
    ],
    isFull: false,
    isRunningGame: false,
    isRunningRound: false,
    currentWord: "",
  },
];

const createRoom = () => {
  const room = {
    roomId: (Math.random() + 1).toString(36).substring(7),
    players: [],
    isFull: false,
    isRunningGame: false,
    isRunningRound: false,
    currentWord: "",
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
  let room = rooms.find((e) => e.roomId === roomId);
  const player = room.players.find((e) => e.username === username);
  if (!player) {
    return false;
  }
  return player;
};

const addPlayer = (roomId, username) => {
  let room = rooms.find((e) => e.roomId === roomId);
  let numPlayers = room.players.length;
  const newPlayer = {
    username: username,
    guesses: 0,
    lastGuess: "",
    isKnockedOut: false,
    wonRound: false,
    isHost: false,
  };
  if (numPlayers < 10) {
    room.players.push(newPlayer);
    let player = room.players.find((e) => e.username === username);
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

const removePlayer = (roomId, username) => {
  try {
    let room = rooms.find((e) => e.roomId === roomId);
    let player = room.players.find((e) => e.username === username);
    let numPlayers = room.players.length;
    if (player.isHost === true) {
      player.isHost = false;
    }
    room.players = room.players.filter((e) => e !== player);
    let newHost = room.players.at(0);
    newHost.isHost = true;
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
  let room = rooms.find((e) => e.roomId === roomId);
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

const startRound = (roomId, currentWord) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (!room.isRunningRound) {
    room.isRunningRound = true;
    room.players.forEach((e) => (e.guesses = 0), (e.lastGuess = ""));
    room.currentWord = currentWord;
  }
  return true;
};

const isGameRunning = async (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (room.isRunningGame) {
    return true;
  }
  return false;
};

const isValidRoom = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (room) {
    return true;
  }
  return false;
};

const submitWord = (roomId, username, word) => {
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  if (word) {
    player.lastGuess = word;
    if (player.lastGuess === room.currentWord) {
      player.wonRound = true;
    }
    let correctGuessers = room.players.filter((e) => e.wonRound === true && !e.isKnockedOut);
    let currentPlayers = room.players.filter((e) => !e.wonRound === true && !e.isKnockedOut);
    if (correctGuessers.length > 0) {
      if (currentPlayers.length === 1) {
        room.isRunningRound = false;
        currentPlayers.forEach(e => e.isKnockedOut = true);
      }
      return true;
    }
    return false;
  }
};

const isHost = (roomId, username) => {
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  return player.isHost;
};

const isRoundRunning = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  return room.isRoundRunning;
};

const getRoundWord = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  return room.currentWord;
};

const endRound = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (room.isRunningRound) {
    room.isRunningRound = false;
    return true;
  }
  return false;
};

const endGame = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (room.isRunningGame) {
    room.isRunningRound = false;
    return true;
  }
  return false;
};

const isRoomFull = async (roomId) => {
  const room = rooms.find((e) => e.roomId === roomId);
  if (room.players.length >= 10) {
    return true;
  }
  return false;
};

const getAllPlayers = async (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  return room.players;
};

const hasWon = async (roomId, username) => {
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  if (player.lastGuess === room.currentWord) {
    return true;
  }
  return false;
};

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
  getRoomId
};
