import query from "../config/mysql.conf";
const roomID = () => {
    const newRoom = (Math.random() + 1).toString(36).substring(7);
    return newRoom;
  };
  
const rooms = [
  {
    roomId: "",
    players: [{
      username: "username",
      guesses: 0,
      lastGuess: "words",
      isKnockedOut: false,
      wonRound: false,
      isHost: true
    }],
    isFull: false,
    isRunningGame: false,
    isRunningRound: false,
    currentWord: "shortking🤴"
  },
];

//! This is actually how we will find the roomId 
//* let [room] = rooms.filter(e=> e.roomId === roomId);


//X createRoom(roomId) return boolean about success
//* will need to create a new room obj in the room arr
const createRoom = () => {
    const room = {
        roomId: (Math.random() + 1).toString(36).substring(7),
        players: [],
        isFull: false,
        isRunningGame: false,
				isRunningRound: false,
        currentWord: "shortking🤴"
    }
    if (!room.roomId || !room.players || !room.isFull || !room.isRunningGame || !room.isRunningRound || !room.currentWord) {
        return false
    }
    rooms.push(room);
    return room.roomId;
};

//X feel confident about this one
const getUsername = async (uuid) => {
    try {
        const [user] = await query("SELECT * FROM users WHERE users.uuid = ?", [uuid]);
        if (!user) {
            return null
        }
        return user.username
    } catch (err) {
        return null
    }
}

//X feel confident about this one
const getPlayer = (roomId, username) => {
	let [room] = rooms.filter(e=> e.roomId === roomId);
    const [player] = room.players.filter(e => e.username === username);
    if (!player) {
        return false
    }
    return player;
};

//X should be alright but probably double check
const addPlayer = (roomId, username) => {
	let [room] = rooms.filter(e=> e.roomId === roomId);
	let numPlayers = room.players.length;
	if (numPlayers < 10){
		room.players.push(username);
		let [player] = room.players.filter(e=> e.username === username);
		if (room.isRunning === true) {
			player.isKnockedOut = true;
		}
		if (numPlayers === 1) {
			player.isHost = true;
		}
		return true;
	}
	else {
		return false;
	}	
  };


// X Does this work w try/catch or is there a better way to return false if it doesnt work?
const removePlayer = (roomId, username) => {
	try {
		let [room] = rooms.filter(e=> e.roomId === roomId);
		let [player] = room.players.filter(e=> e.username === username);
		let numPlayers = room.players.length;
		if (player.isHost === true){
			player.isHost = false;
			let newHost = room.players.at(0);
			newHost.isHost = true;
		}
		room.players.filter(e => e !== player);
		if (numPlayers === 0){
			rooms.filter(e=> e !== room);
		} 
		return true;
	}catch (err){
		return false
	}
}


//X should be alright but probably double check
const startGame = (roomId) => {
	let [room] = rooms.filter(e=> e.roomId === roomId);
	if (room.isGameRunning === false){
		room.isGameRunning = true;
		room.players.forEach(e=>
			e.guesses = 0,
			e.lastGuess="",
			e.isKnockedOut= false,
			e.wonRound = false,
		);
		return true;
	}
	return false;
}

//X should be alright but probably double check
const startRound = (roomId, currentWord)=> {
	let [room] = rooms.filter(e=> e.roomId === roomId);
	if(!room.isRunningRound){
		room.isRunningRound = true;
		room.currentWord = currentWord;
	}
	return true;
}

//X should be alright but probably double check
const isGameRunning = async (roomId) => {
	let [room] = rooms.filter(e=> e.roomId === roomId);
	if(room.isRunningGame){
		return true;
	}	
	return false;
}

//X feel confident about this one
const isValidRoom =(roomId)=> {
	let [room] = rooms.filter(e=> e.roomId === roomId);
	if(room){
		return true;
	}
	return false;
}


//? Not sure if this was the best way to do this or if I missed the point here.
const submitWord = (roomId, username, word)=> {
	let [room] = rooms.filter(e=> e.roomId === roomId);
  let [player] = room.players.filter(e => e.username === username);
	let winners = room.players.filter(e => e.lastGuess === room.currentWord);
  player.lastGuess = word;
  if(player.lastGuess === room.currentWord){
    if(winners.length <= 9){
      player.wonRound = true;
      winners.push(player);
    } else {
      player.isKnockedOut = true;
      room.isRunningRound = false;
    }
    return true;
  }
  return false;
}

//? I am hoping I did this right but not super confident
const isHost = (roomId, username) => {
	let [room] = rooms.filter(e=> e.roomId === roomId);
	let [player] = room.players.filter(e => e.username === username);
	let {isHost} = player;
	if(isHost){
		return true;
	}
	return false;
}

//? I am hoping I did this right but not super confident
const isRoundRunning = (roomId) => {
	let [room] = rooms.filter(e=> e.roomId === roomId);
	let {isRunningRound} = room;
	if(isRunningRound){
		return true;
	}
	return false;
}

//? I am hoping I did this right but not super confident
const getRoundWord = (roomId) => {
	let [room] = rooms.filter(e=> e.roomId === roomId);
	if(room.isRunningGame && room.isRunningRound){
		return room.currentWord
	}
	return null
}

//should be alright but probably double check
const endRound = (roomId) => {
	let [room] = rooms.filter(e=> e.roomId === roomId);
  if(room.isRunningRound){
    room.isRunningRound = false;
    return true;
  }
  return false;
}

//should be alright but probably double check
const endGame = (roomId) => {
  let [room] = rooms.filter(e=> e.roomId === roomId);
  if(room.isRunningGame){
    room.isRunningRound = false;
    return true;
  }
  return false;
}


//* Quick note on this one:
//Should be good to go once getting the room correctly!
//TODO isRoomFull(roomId) return true / false
//? checking length of players array and then changing boolean based off that 
const isRoomFull = async (roomId) => {
	let room = (rooms.map(e => e.roomId))
	if(room.players.length === 10){ 
		return true;
	}
		return false;
	}

//* Some notes on this function:
// Okay Brett, so for this one, I don't think we need to check if the room is empty
// We remove the room if there are no players in the room
// I think one way to do this would be replacing the lines after let [room] with
// just a return line of room.players (I think that should do the trick)

//TODO getAllPlayers(roomId: string) return the room players arr
const getAllPlayers = async (roomId) => {
	let room = rooms.filter(e=> e.players)
	if (room.players.length === 0) {
		return <h1>No players in Room</h1> };
    rooms.players.slice(0, 9)
}

//* Some notes on this function:
// I talked w Russell about this and we don't want to return an object, just the 
// boolean itself
// and then we also will grab the player in the same way we grab the room--
// I sent you a message about how to fix that in slack

//TODO hasWon(roomId: string, username: string) return boolean
// will return the individual players wonRound key
const hasWon = async (roomId, username) => {
	let room = rooms.filter(e=> e.roomId);
	let player = room.players.username.find(username);
	if(player.lastGuess === room.currentWord){
		return {player.wonRound = true}
	}
		return player.wonRound = false
}


module.exports = { getUsername, createRoom, getPlayer, addPlayer, removePlayer, startGame, startRound, isGameRunning, isValidRoom, isHost, isRoundRunning, getRoundWord, endRound, endGame, hasWon, getAllPlayers, isRoomFull, submitWord }


 //! Register page "CONFIRM PASSWORD" needs to be passed as a password type
 //! Feedback for successful register
 //! Remove Login and Register button from Menu once logged in
 //! Fix Register button routing from Login page