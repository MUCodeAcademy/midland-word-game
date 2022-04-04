const query = require("../config/mysql.conf");

const getRoomId = () => {
  const newRoom = (Math.random() + 1).toString(36).substring(7);
  return newRoom;
};

let rooms = [];

const createRoom = () => {
  const room = {
    roomId: (Math.random() + 1).toString(36).substring(7),
    players: [],
    isFull: false,
    isRunningGame: false,
    isRunningRound: false,
    currentWord: "",
  };
  
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
    if (numPlayers === 0) {
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
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  console.log(room.players.length)
  let wasHost = false
  if (player) {
    let numPlayers = (room.players.length - 1);
    if (player.isHost === true) {
      wasHost = true
    }
    //console.log(player)
    room.players = room.players.filter((e) => e.username !== player.username);
    console.log(room.players.length)
    if(room.players.length === 0){
      rooms = rooms.filter(e => e.roomId !== roomId)
      return true
    }
    if(wasHost){
      room.players[0].isHost = true
    }
    console.log(room.players[0])
    if (numPlayers < 10) {
      room.isFull = false;
    } else {
      room.isFull = true
    }
    return true;
  }
  return false;
};

const startGame = (roomId) => {
  console.log("start game func")
  let room = rooms.find((e) => e.roomId === roomId);
  console.log(room)
  if (room.isRunningGame === false) {
    room.isRunningGame = true;
    room.players = room.players.map(
      (e) => ({ ...e, guesses: 0, lastGuess: "", isKnockedOut: false, wonRound: false }));
      console.log("start game func")
      console.log(room)
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

const isGameRunning =  (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  return room ? room.isRunningGame ? true : false : false;
};

const isValidRoom = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  if (room) {
    return true;
  }
  return false;
};

const submitWord = (roomId, username, word) => {
  console.log('submit word func')
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  if (word) {
    player.lastGuess = word;
    player.guesses++
    if (player.lastGuess === room.currentWord) {
      player.wonRound = true;
    }
    let correctGuessers = room.players.filter((e) => e.wonRound && !e.isKnockedOut);
    let currentPlayers = room.players.filter((e) => !e.wonRound && !e.isKnockedOut);
    console.log(correctGuessers.length)
    console.log(currentPlayers.length)
    if (correctGuessers.length > 0) {
      if (currentPlayers.length === 1 || currentPlayers.length === 0) {
        room.isRunningRound = false;
        currentPlayers.forEach(e => e.isKnockedOut = true);
      }
    }
    checkGameOver(roomId)
    return true;
  } else {
    return false
  }
};

const isHost = (roomId, username) => {
  console.log('ishost func')
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  console.log(player)
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
  checkGameOver(roomId)
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
  if (room.players.length >= 10) {
    return true;
  }
  return false;
};

const getAllPlayers = (roomId) => {
  let room = rooms.find((e) => e.roomId === roomId);
  console.log(room)
  return room.players;
};

const hasWon =  (roomId, username) => {
  let room = rooms.find((e) => e.roomId === roomId);
  let player = room.players.find((e) => e.username === username);
  console.log(player)
  if (player.lastGuess === room.currentWord) {
    return true;
  }
  return false;
};

const checkGameOver = (roomId) => {
  const room = rooms.find((e) => e.roomId === roomId);

  const roundWinners = (sorter(room.players.filter((player) => player.wonRound && !player.isKnockedOut)));
  // const knockedOutWinners = (sorter(players.filter((player) => player.isKnockedOut && player.wonRound)));
  const filteredPlayers = (sorter(room.players.filter((player) => !player.isKnockedOut && !player.wonRound)));
  // const filteredKnockedOuts = (sorter(players.filter((player) => player.isKnockedOut && !player.wonRound)));
  console.log(roundWinners)
  if(roundWinners.length === 1 && (filteredPlayers.length === 1 || filteredPlayers.length === 0)){
    endGame(roomId)
  }
}

const sorter =(arr) => {
  return arr.sort((playerOne, playerTwo) => {
    if (playerOne.guesses > playerTwo.guesses) {
      return 1;
    }
    if (playerOne.guesses < playerTwo.guesses) {
      return -1;
    }
    return 0;
  });
}

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
