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
        isRunning: false,
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
        isRunning: false,
        currentWord: "shortking🤴"
    }
    if (!room.roomId || !room.players || !room.isFull || !isRunning || !room.currentWord) {
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
			player.isHost === true;
		}
		if (room.isRunning === true) {
			player.isKnockedOut === true;
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
		player.isHost === false;
		let newHost = players.at(0);
		newHost.isHost === true;
	}
	players.filter(e => e !== player);
	if (numPlayers === 0){
		rooms.filter(e=> e !== room);
	} 
	return true;
}


//TODO startGame(roomId, currentWord) return true / false
//* will need to reset all user info like guesses and lastGuess
//* will need to reset user info guesses, lastGuess, isKnockedOut, wonRound
//* will change the rooms isRunningGame to true
const startGame = async (roomId, currentWord) => {
	let room = rooms.filter(e => e.roomId).find(roomId);
	if (room.isRunning === false){
		room.isRunning === true;
		room.players.guesses === 5;
		room.players.lastGuess === "";
		room.players.isKnockedOut === false;
		room.players.wonRound === false;
		return true
	}
	return false
}

//TODO isRoomFull(roomId) return true / false
//? checking length of players array and then changing boolean based off that
// hey its syd, so I think to get the room by its ID, youd need to get all the objects off the rooms array by their room id keys
// then you can find the roomid in the new array of room ids.
// at least that is what I did. 

const isRoomFull = async (roomId) => {
    let room = room.find(room = room.roomId => `${roomId}`) 
    if (rooms.players.length === 10) {
        return { isFull: true }
    }
    return { isFull: false }
}

//TODO isGameRunning(roomId) return true / false
//? not quite sure on this one...
const isGameRunning = async (roomId) => {
    //! yeah idk either
}

//TODO isValidRoom(roomId) return true / false
//? Not sure if we need this or what it is for, need to consult Russell

//TODO submitWord(roomId, username, word) return true / false
//  *      will need to end game when all but one finish or time runs out
//  *      will set everyone without wonRound to isNockedOut true
//? This will be tricker as well, not sure how to do this one at first glance

//TODO getAllPlayers(roomId) return players arr
//? return player array
const getAllPlayers = async (roomId) => {
    if (rooms.room.players.length === 0) {
        return <h2>No players in current room</h2>
    }
    rooms.players.slice(0, 9)
}

module.exports = { getUsername, createRoom, getPlayer, addPlayer, removePlayer, }


/** better commented version (From Russell)
 * functions
 
 
 

 
 * isRoomFull(roomId: string) return boolean
 *      will return true or false based on if the room has 10 people in it
 * isGameRunning(roomId: string) return boolean
 *      will return the rooms isRunningGame boolean
 * isValidRoom(roomId: string) return boolean
 *      will return true or false based on if the room exists or not
 * submitWord(roomId: string, username: string, word: string) return boolean about success
 *      will need to set isRunningRound to false when all but one finish
 *      will set everyone without wonRound to isKnockedOut true
 
 
 * hasWon(roomId: string, username: string) return boolean
 *      will return the individual players wonRound key
 * isHost(roomId: string, username: string) return boolean
 *      will return the individual players isHost key
 * isRoundRunning(roomId: string) return boolean
 *      will return the rooms isRoundRunning key
 * startRound(roomId: string) return boolean about success
 *      will set rooms isRunningRound to true
 * getRoundWord(roomId) return string / null
 *      will return the currentWord key from the room object
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