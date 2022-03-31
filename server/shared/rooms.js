import query from "../config/mysql.conf";
let roomID = (Math.random() + 1).toString(36).substring(7); //! turn to function
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
    return roomId;
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
const getPlayer = (roomId, user) => {
    const players = rooms.filter(e => e.players);
    const usernames = players.username;
    const player = usernames.filter(user);
    if (!player) {
        return false
    }
    return player;
};
// shouldnt we just bind roomId to the function at the top? idk if that would work
// Like in the array?
// I think it would need to be separate ? but i am not 100% on that
//Okay, sounds good, I just figured having it separated would make it more reusable, but let me know what he says (:
// Ill ask russ
// My new moto is //! "Thank god for Russell"
// fr what would we do without him
// Crash and burn im sure... at least for me lol
// nah hes carrying this class rn
// Most definitely!!! If he doesn't get hired as a lead dev I am going to quit this field
// we riot if he isnt making $100k out the gate
// Yes, I will grab my pitchfork
// its 2022 and you still have a pitchfork
// Only for the big foods that I cant fit on my normal fork
// what a lame joke that was
// yes the biggest noodles
// big spaghett
// pool noodle sized ramen
// im patenting that
// dont steal it
//I am sure if it is written in code comments then it is legally binding, you're covered
// you know theres a chat menu
//in vs code???
// yea with liveshare
// oh man, good thing you warned me. I'm sure there is an interview question abou that
// I think it is funny that you're still using comments even though you just found that out
// ok i only just found out about it like a minute ago so chilllll
// okay i dont know how to bring it back up but i know it exists
// LOLLL
// the frick u just do 
//WHAT AM I DOING!!
// im following your cursor around the page scroll up. thats wild
// technology man... crazy 🤓
// terrifying
// we need to get tom in here
// YES!
// Okay, do you need to commit what we have so far?
//I would probably cry if this got deleted :,,(
// Because if so we should prob delete these comments lol
// nah let mike see it when we pull, he'd get a kick out of it. //! 21st century note passing
// okay let me make one edit
// mr. hill stop lurkin
// tf, he left. rude ass
// 


//TODO addPlayer(roomId, username) return boolean about success
//  *      will give host to the first player to join room
//  *      add player into rooms player arr
//  *      if round is game is running set them to isKnockedOut: true

const addPlayer = (roomId, username) => {

};


// * functions


//? use array method to add player object to the array we set up above
//? if statement for first player

//TODO removePlayer(roomId, username) return true / false
//  *      will need to transfer host if host leaves
//  *      will need to delete room if all players leave
//? use array method for removing player
//? if statment for host and room conditionals
//TODO startGame(roomId, currentWord) return true / false
//  *      will need to reset all user info like guesses and lastGuess
//? This might be one of the tricker ones
const startGame = async (roomId, currentWord) => {

}


//TODO isRoomFull(roomId) return true / false
//? checking length of players array and then changing boolean based off that
const isRoomFull = async (roomId) => {
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
    rooms.players.slice(0, 10)
}

module.exports = { getUsername, createRoom, getPlayer }


/** better commented version (From Russell)
 * functions
 
 
 
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