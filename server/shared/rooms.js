import query from "../config/mysql.conf";
const roomID = () => {
    const newRoom = (Math.random() + 1).toString(36).substring(7);
    return newRoom;
  };
  
const rooms = [
    {
        roomId: "123abc",
        players: [{
            username: "username",
            guesses: 5,
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


//X createRoom(roomId) return boolean about success
//* will need to create a new room obj in the room arr
const createRoom = (roomID) => {
    const room = {
        roomId: roomID,
        players: [],
        isFull: false,
        isRunningGame: false,
				isRunningRound: false,
        currentWord: "shortking🤴"
    }
    if (!room.roomId || !room.players || !room.isFull || !room.isRunningGame || !room.isRunningRound || !room.currentWord) {
        return false
    }
    return room.roomId;
};

//X getUsername(uuid) return username / null
//* will need to query the database to get username based off uuid input
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

//X getUser(roomId, username) return user object in player arr
const getPlayer = (roomId, username) => {
		let room = rooms.filter(e=> e.roomId).find(roomId);
    const players = room.filter(e => e.players);
    const usernames = players.username;
    let player = usernames.find(username);
    if (!player) {
        return false
    }
    return player;
};

//X addPlayer(roomId, username) return boolean about success
//* will give host to the first player to join room
//* add player into rooms player arr
//* if round is game is running set them to isKnockedOut: true

const addPlayer = (roomId, username) => {
	let room = rooms.filter(e=> e.roomId).find(roomId);
	let players = room.players;
	let numPlayers = players.length;
	if (numPlayers < 10){
		players.push(username);
		let player = players.filter(e=> e.username).find(username);
		if (numPlayers === 1) {
			player.isHost = true;
		}
		if (room.isRunning === true) {
			player.isKnockedOut = true;
		}
		return true;
	}
	else {
		return false;
	}	
  };


//X removePlayer(roomId, username) return true / false
	//* will need to transfer host to different player if host leaves
	//* will need to delete room if all players leave
	//* remove player from rooms player arr

const removePlayer = (roomId, username) => {
	let room = rooms.filter(e=> e.roomId).find(roomId);
	let players = room.players;
	let player = players.filter(e=> e.username).find(username);
	let numPlayers = players.length;
	if (player.isHost === true){
		player.isHost = false;
		let newHost = players.at(0);
		newHost.isHost = true;
	}
	players.filter(e => e !== player);
	if (numPlayers === 0){
		rooms.filter(e=> e !== room);
	} 
	return true;
}


//X startGame(roomId, currentWord) return true / false
//* will need to reset all user info like guesses and lastGuess
//* will need to reset user info guesses, lastGuess, isKnockedOut, wonRound
//* will change the rooms isRunningGame to true
const startGame = (roomId) => {
	let room = rooms.filter(e => e.roomId).find(roomId);
	if (room.isGameRunning === false){
		room.isGameRunning = true;
		room.players.forEach(e=>
			e.guesses = 5,
			e.lastGuess="",
			e.isKnockedOut= false,
			e.wonRound = false,
		);
		return true
	}
	return false
}

//X startRound(roomId: string) return boolean about success
//* will set rooms isRunningRound to true
const startRound = (roomId, currentWord)=> {
	let room = rooms.filter(e => e.roomId).find(roomId);
	if(!room.isRunningRound){
		room.isRunningRound = true;
		room.currentWord = currentWord;
	}
	return true;
}

//X isGameRunning(roomId) return true / false
//* will return the rooms isRunningGame boolean
const isGameRunning = async (roomId) => {
	let room = rooms.filter(e => e.roomId).find(roomId);
	if(room.isRunningGame === true){
		return true;
	}	
	return false;
}

//X isValidRoom(roomId) return true / false
//* will return true or false based on if the room exists or not
const isValidRoom =(roomId)=> {
	let room = rooms.filter(e => e.roomId).find(roomId);
	if(!room){
		return false;
	}
	return true;
}


//TODO submitWord(roomId, username, word) return true / false
//* will need to set isRunningRound to false when all but one finish
//* will set everyone without wonRound to isKnockedOut true
const submitWord = (roomId, username, word)=> {
	let room = rooms.filter(e => e.roomId).find(roomId);
	//still working on the logic here
}
//X isHost(roomId: string, username: string) return boolean
//* will return the individual players isHost key
const isHost = (roomId, username) => {
	let room = rooms.filter(e=> e.roomId).find(roomId);
	let player = room.players.username.find(username);
	let {isHost} = player;
	if(!isHost){
		return false;
	}
	return true;
}

//X isRoundRunning(roomId: string) return boolean
//* will return the rooms isRoundRunning key
const isRoundRunning = (roomId) => {
	let room = rooms.filter(e=> e.roomId).find(roomId);
	if(!room.isRunningRound){
		return false;
	}
	return true;
}

// TODO getRoundWord(roomId) return string / null
//* will return the currentWord key from the room object
const getRoundWord = (roomId) => {
	let room = rooms.filter(e=> e.roomId).find(roomId);
	if(room.isRunningGame === true && room.isRunningRound === true){
		return room.currentWord
	}
	return null
}


//TODO isRoomFull(roomId) return true / false
//? checking length of players array and then changing boolean based off that 

const isRoomFull = async (roomId) => {
    let room = (rooms.map(e => e.roomId))
	if(room.players.length === 10)
		{ return true;}
		 return false;
	}
//TODO getAllPlayers(roomId) return players arr
//? return player array


const getAllPlayers = async (roomId) => {
	let room = rooms.filter(e=> e.players)
	if (room.players.length === 0) {
		return <h1>No players in Room</h1> };
    rooms.players.slice(0, 9)
}

// hasWon(roomId: string, username: string) return boolean
// will return the individual players wonRound key

const hasWon = async (roomId, username) => {
	let room = rooms.filter(e=> e.roomId);
	let player = room.players.username.find(username);
	if(player.lastGuess === room.currentWord){
		return {player.wonRound = true}
	}
		return player.wonRound = false
}
 // endRound(roomId) return boolean about success
//  will set the rooms isRunningRound key to false
const endRound = async (roomId) => {
	let room = rooms.filter(e=> e.roomId);
	if(room.IsRunningRound = true){
		return {IsRunningRound = false}
	}
		return IsRunningRound = true
}

module.exports = { getUsername, createRoom, getPlayer, addPlayer, removePlayer, startGame, startRound, isGameRunning, isValidRoom, isHost, isRoundRunning, getRoundWord, endRound, hasWon, getAllPlayers, isRoomFull  }


/** better commented version (From Russell)
 * functions:
 *
 * isRoomFull(roomId: string) return boolean
 *      will return true or false based on if the room has 10 people in it

 
 * hasWon(roomId: string, username: string) return boolean
 *      will return the individual players wonRound key

 
 
 
 * endRound(roomId) return boolean about success
 *      will set the rooms isRunningRound key to false
 * endGame(roomId) return boolean about success
 *      will set the rooms isRunningGAme key to false
 * 
 * 
 //! Register page "CONFIRM PASSWORD" needs to be passed as a password type
 //! Feedback for successful register
 //! Remove Login and Register button from Menu once logged in
 //! Fix Register button routing from Login page