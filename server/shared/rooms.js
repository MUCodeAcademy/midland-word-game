const query = require("../config/mysql.conf");

let rooms = [];

const createRoom = (limit = 10, guessLimit = null) => {
  let roomId;
  do {
    roomId = (Math.random() + 1).toString(36).substring(7);
  } while (!!rooms.find((e) => e.roomId === roomId));
  const room = {
    roomId: roomId,
    players: [],
    isRunningGame: false,
    isRunningRound: false,
    currentWord: "",
    playerLimit: limit,
    guessLimit: guessLimit,
  };

  rooms.push(room);
  return room.roomId;
};

const getUsername = async (uuid) => {
  try {
    const [user] = await query("SELECT * FROM users WHERE users.uuid = ?", [uuid]);
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
  const newPlayer = {
    username: username,
    guesses: 0,
    lastGuess: "",
    isKnockedOut: false,
    wonRound: false,
    isHost: false,
  };
  if (room.players.length < room.playerLimit) {
    room.players.push(newPlayer);
    let player = room.players.find((e) => e.username === username);
    if (room.isRunningRound) {
      player.isKnockedOut = true;
    }
    if (room.players.length === 1) {
      player.isHost = true;
    }
    return true;
  } else {
    return false;
  }
};

const removePlayer = (roomId, username) => {
  if (isValidRoom(roomId)) {
    let room = rooms.find((e) => e.roomId === roomId);
    let player = room.players.find((e) => e.username === username);
    let wasHost = false;
    if (player) {
      let numPlayers = room.players.length - 1;
      if (player.isHost === true) {
        wasHost = true;
      }
      room.players = room.players.filter((e) => e.username !== player.username);
      if (room.players.length === 0) {
        rooms = rooms.filter((e) => e.roomId !== roomId);
        return true;
      }
      if (wasHost) {
        room.players[0].isHost = true;
      }
      return true;
    }
    return false;
  }
};

const startGame = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (room.isRunningGame === false) {
    room.isRunningGame = true;
    room.players = room.players.map((e) => ({ ...e, guesses: 0, lastGuess: "", isKnockedOut: false, wonRound: false }));
    return true;
  }
  return false;
};

const startRound = (roomId, currentWord) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (!room.isRunningRound) {
    room.isRunningRound = true;
    room.players = room.players.map((e) => ({ ...e, guesses: 0, lastGuess: "", wonRound: false }));
    room.currentWord = currentWord;
  }
  return true;
};

const isGameRunning = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  return room ? (room.isRunningGame ? true : false) : false;
};

const isValidRoom = (roomId) => {
  return !!rooms.find((e) => e.roomId === roomId);
};

const submitWord = (roomId, username, word) => {
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  if (word) {
    player.lastGuess = word;
    player.guesses++;
    if (player.lastGuess === room.currentWord) {
      player.wonRound = true;
    }
    let correctGuessers = room.players.filter((e) => e.wonRound && !e.isKnockedOut);
    let currentPlayers = room.players.filter((e) => !e.wonRound && !e.isKnockedOut);
    if (correctGuessers.length > 0) {
      if (currentPlayers.length === 1 || currentPlayers.length === 0) {
        room.isRunningRound = false;
        currentPlayers.forEach((e) => (e.isKnockedOut = true));
      }
    }
    if (player.guesses === room.guessLimit && room.guessLimit !== null) {
      endGame(roomId);
    }
    checkGameOver(roomId);
    return true;
  } else {
    return false;
  }
};

const canSubmitGuess = (roomId, username) => {
  const room = rooms.find((e) => e.roomId === roomId);
  if (room.playerLimit !== 1) {
    return true;
  }
  const player = room.players.find((e) => e.username === username);
  if (room && player) {
    if (player.guesses < room.guessLimit) {
      return true;
    }
  }
  endGame(roomId);
  return false;
};

const isHost = (roomId, username) => {
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  return player.isHost;
};

const isRoundRunning = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  return room ? room.isRunningRound : null;
};

const getRoundWord = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  return room.currentWord;
};

const endRound = (roomId) => {
  checkGameOver(roomId);
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
    room.isRunningGame = false;
    room.isRunningRound = false;
    return true;
  }
  return false;
};

const isRoomFull = (roomId) => {
  const room = rooms.find((e) => e.roomId === roomId);
  if (room.players.length >= room.limit) {
    return true;
  }
  return false;
};

const getAllPlayers = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (room) {
    return room.players;
  }
  return [];
};

const hasWon = (roomId, username) => {
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  if (player.lastGuess === room.currentWord) {
    return true;
  }
  return false;
};

const checkGameOver = (roomId) => {
  const room = rooms.find((e) => e.roomId === roomId);

  const roundWinners = sorter(room.players.filter((player) => player.wonRound && !player.isKnockedOut));
  const filteredPlayers = sorter(room.players.filter((player) => !player.isKnockedOut && !player.wonRound));
  if (roundWinners.length === 1 && (filteredPlayers.length === 1 || filteredPlayers.length === 0)) {
    endGame(roomId);
  }
};

const getRoomLimit = (roomId) => {
  return rooms.find((e) => e.roomId === roomId).limit || null;
};

const sorter = (arr) => {
  return arr.sort((playerOne, playerTwo) => {
    if (playerOne.guesses > playerTwo.guesses) {
      return 1;
    }
    if (playerOne.guesses < playerTwo.guesses) {
      return -1;
    }
    return 0;
  });
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
  getRoomLimit,
  canSubmitGuess,
};
