import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const useSocket = ( socketParam = null ) => {
  const navigate = useNavigate();
  const socket = useRef(socketParam); //this might need to structure a bit different for socket transfer
  const [error, setError] = useState(null);
  const [roomMessage, setRoomMessage] = useState(null);
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({});
  const [isHost, setIsHost] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [transferring, setTransferring] = useState(false);
  const [roomTimer, setRoomTimer] = useState(null);
  const [runningRound, setRunningRound] = useState(false);
  const [runningGame, setRunningGame] = useState(null);
  const [roundWord, setRoundWord] = useState(null);
  const [playerWonRound, setPlayerWonRound] = useState(false)

  useEffect(() => {
    if (player) {
        console.log("host check")
        console.log(player.isHost)
      setIsHost(player.isHost);
    }
  }, [player, setIsHost]);

  useEffect(() => {
    if(player) {
      setPlayerWonRound(player.wonRound)
    }
  }, [player, setPlayerWonRound])

  useEffect(() => {
    if (!socket.current) {
      //might need to be .current not sure
      socket.current = io("http://localhost:8080", {
        withCredentials: true
      });
    }
    return () => {
      //if (!transferring) {
        //socket.current.disconnect();
      //}
    };
  }, [socket]);

  const indexOfUser = useCallback(
    (username) => {
      for (let i = 0; i < players.length; i++) {
        if (players[i].username === username) {
          return i;
        }
      }
      return -1;
    },
    [players]
  );

  useEffect(() => {
    socket.current.on("player data update", (data) => {
      console.log('player data update')
        console.log(data)
      setPlayers(data.players);
      setPlayer(data.players.find(e => e.username = player.username));
    })
}, [socket.current, setPlayers, player])

  useEffect(() => {
    socket.current.on("room created", (data) => {
      setTransferring(true); //this could be a problem of unmounting component before finishing state change
      navigate(`/room/${data.roomId}`, { state: socket.current });
    });
    socket.current.on("player data", (data) => {
        console.log('player data')
        console.log(data)
      //this means successful join
      setPlayers(data.players);
      setPlayer(data.player);
      setRunningGame(data.isRunningGame);
      setRunningRound(data.setRunningRound);
      if (data.setRunningRound) {
        setRoundWord(data.roundWord);
      }
    });
    socket.current.on("player leave", (data) => {
      setPlayers((curr) =>
        curr.filter((player) => {
          if (player.username !== data.username) {
            return true;
          }
          return false;
        })
      );
    });
  }, [socket, player, setPlayer]);

  useEffect(() => {
    socket.current.on("player join", (data) => {
      setPlayers((curr) => [...curr, data.player]);
    });
  },[setPlayers])

  useEffect(() => {
    socket.current.on("new guess", (data) => {
        console.log("new guess")
        console.log(data)
        console.log(player)
      if (data.player.username === player.username) {
        setGuesses((curr) => [...curr, data.player.lastGuess]);
        setPlayer(data.player)
      }
      const index = indexOfUser(data.player.username);
      console.log("-----------")
      console.log(indexOfUser(data.player.username))
      console.log(players)
      console.log(players.slice(0, index));
      console.log(players.slice(index + 1))
      setPlayers((curr) => [...curr.filter(e => e.username !== data.player.username), data.player]);
    });
  }, [socket, player, setPlayer, setGuesses, indexOfUser, players])

  //error events
  useEffect(() => {
    socket.current.on("not authenticated", () => {
      setError("Not authenticated"); //this is where we could hit the logout api endpoint
    });
    socket.current.on("failed room create", () => {
      setError("Failed to create room please try again");
    });
    socket.current.on("invalid room", () => {
      setError("Room not found");
    });
    socket.current.on("room full", () => {
      setError("Room is full");
    });
    socket.current.on("failed join", () => {
      setError("Failed to join please try again");
    });
    socket.current.on("failed leave", () => {
      setError("Failed to leave please try again");
    });
    socket.current.on("failed round start", () => {
      setError("Failed to start round please try again");
    });
    socket.current.on("already round start", () => {
      setError("Round has already started");
    });
    socket.current.on("invalid word", () => {
      setError("Invalid word");
    });
    socket.current.on("already running game", () => {
      setError("Game has already started");
    });
    socket.current.on("failed game start", () => {
      setError("Failed to start game please try again");
    });
    socket.current.on("not host", () => {
      setError("You are not the host"); //maybe change this message to something better
    });
    socket.current.on("failed submit", () => {
      setError("Failed to submit word please try again");
    });
    socket.current.on("already won", () => {
      setError("You have already won this round");
    });
  }, [socket, setError])

  // game and room start / stop events
  useEffect(() => {
    socket.current.on("not running game", () => {
      if(runningGame){
        setRunningGame(false)
      }
      setError("Game is not started");
    });
    socket.current.on("not running round", () => {
      if(runningRound){
        setRunningRound(false)
      }
      setError("Round is not started");
    });
    socket.current.on("round over", (data) => {
      setPlayer(curr => {
        return {
          ...curr,
          wonRound: false,
          lastGuess: "",
          guesses: 0,
        }
      })
      setPlayers(data.players)
      setRunningRound(false);
      setRoomMessage("Round Over")
    });
    socket.current.on("game over", () => { //server needs this event
      setRunningGame(false)
      setRoomMessage("Game Over")
    })
    socket.current.on("game start", () => {
      setRunningGame(true);
      setRoomMessage("Game Starting");
    });
    socket.current.on("round start", (data) => {
      setPlayer(curr => {
        return {
          ...curr,
          wonRound: false,
          lastGuess: "",
          guesses: 0,
        }
      })
      console.log(data)
      setPlayers(data.players)
      setRunningRound(true);
      setGuesses([]);
      setRoundWord(data.roundWord)
      console.log(data.roundWord)
      setRoomMessage("Round Starting");
    });
  }, [socket, setError, runningGame, setRunningGame, runningRound, setRunningRound, setRoomMessage, player, setPlayer])

  // timer event
  useEffect(() => {
    socket.current.on("timer countdown", (data) => {
      setRoomTimer(data.time);
    });
  }, [socket, setRoomTimer])


  const createRoom = useCallback(() => {
    socket.current.emit("create room");
  }, [socket]);

  const joinRoom = useCallback(
      (roomId) => {
        console.log('join room func', roomId)
      socket.current.emit("join room", roomId);
    },
    [socket]
  );

  const leaveRoom = useCallback(() => {
    socket.current.emit("leave room");
  }, [socket]);

  const startGame = useCallback(() => {
    if (socket) {
      if (isHost) {
        if (!runningGame) {
          socket.current.emit("start game");
        } else {
          setError("Game already started");
        }
      } else {
        setError("You are not the host"); //maybe change this message to something better
      }
    } else {
      setError("Failed to connect to server");
    }
  }, [socket, isHost, setError]);

  const startRound = useCallback(() => {
    if (socket) {
      if (isHost) {
        console.log(runningRound)
        if (!runningRound) {
          socket.current.emit("start round");
        } else {
          setError("Round already started");
        }
      } else {
        setError("You are not the host"); //maybe change this message to something better
      }
    } else {
      setError("Failed to connect to server");
    }
  }, [socket, runningRound, isHost, setError]);

  const submitWord = useCallback(
    (word) => {
      socket.current.emit("submit word", word);
    },
    [socket]
  );

  return {
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    startRound,
    submitWord,
    error,
    roomMessage,
    players,
    player,
    guesses,
    roomTimer,
    roundWord,
    runningGame,
    runningRound,
    playerWonRound,
    isHost,
  };
};

export default useSocket;

/**
 * -- client socket sends --
 * create room
 * join room
 * leave room
 * start game
 * start round
 * submit word
 *
 * -- client socket received -- not completely accurate list 
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
 * invalid word
 * new guess {player Obj}
 * player win {player Obj}
 * failed submit
 * already won
 * not running round
 * not running game
 * timer countdown {duration}
 * round over
 */
