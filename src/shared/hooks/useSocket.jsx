import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const useSocket = (socketParam = null) => {
  const navigate = useNavigate();
  const socket = useRef(socketParam); //this might need to structure a bit different for socket transfer
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [roomMessage, setRoomMessage] = useState(null);
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({});
  const [isHost, setIsHost] = useState(null);
  const [guesses, setGuesses] = useState([]);
  //const [transferring, setTransferring] = useState(false);
  const [roomTimer, setRoomTimer] = useState(120);
  const [runningRound, setRunningRound] = useState(false);
  const [runningGame, setRunningGame] = useState(null);
  const [roundWord, setRoundWord] = useState(null);
  const [playerWonRound, setPlayerWonRound] = useState(false);
  const [roomId, setRoomId] = useState(null)
  const [wonRound, setWonRound] = useState(false)
  const [socketRoomIdError, setSocketRoomIdError] = useState("")
  const [checkedRoomId, setCheckedRoomId] = useState([])

  useEffect(() => {
    if (player) {
      setPlayerWonRound(player.wonRound);
      setIsHost(player.isHost);
      setWonRound(player.wonRound)
    }
  }, [player, setPlayerWonRound, setIsHost]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:8080", {
        withCredentials: true,
      });
    }
    return () => {
      //if (!transferring) {
      socket.current.disconnect();
      //}
    };
  }, [socket]);

  useEffect(() => {
    socket.current.on("player data update", (data) => {
      setPlayers(data.players);
    });
  }, [socket, setPlayers]);

  useEffect(() => {
    setPlayer(players.find((e) => e.username === username));
  }, [players, username]);

  useEffect(() => {
    socket.current.on("disconnect", () => {
      setError("Disconnect from server")
    })
    socket.current.on("connect", () => {
      setError("")
    })
  }, [socket])

  useEffect(() => {
    socket.current.on("player data", (data) => {
      //this means successful join
      setPlayers(data.players);
      //setPlayer(data.player);
      setUsername(data.player.username);
      setRunningGame(data.isRunningGame);
      setRunningRound(data.isRunningRound);
      if (data.isRunningRound) {
        setRoundWord(data.roundWord);
      }
    });
    // socket.current.on("player leave", (data) => {
    //   console.log("player leave")
    //   console.log(data)
    //   setPlayers((curr) =>
    //     curr.filter((player) => {
    //       if (player.username !== data.username) {
    //         return true;
    //       }
    //       return false;
    //     })
    //   );
    // });
  }, [socket, setPlayers, setUsername, setRunningGame, setRunningRound, setRoundWord, navigate, setRoomId]);

  useEffect(() => {
    socket.current.on("room created", (data) => {
      //setTransferring(true); //this could be a problem of unmounting component before finishing state change
      navigate(`/room/${data.roomId}`);
    });
    socket.current.on("room created solo", (data) => {
      //setTransferring(true); //this could be a problem of unmounting component before finishing state change
      //navigate(`/classic`, { state: {id: data.roomId} });
      setRoomId(data.roomId)
    });
  }, [socket, navigate, setRoomId])

  useEffect(() => {
    socket.current.on("player join", (data) => {
      setPlayers((curr) => [...curr, data.player]);
    });
  }, [setPlayers]);

  useEffect(() => {
    socket.current.on("new guess", (data) => {
      if (data.player.username === username) {
        setGuesses((curr) => [...curr, data.player.lastGuess]);
      }
      setPlayers((curr) => [...curr.filter((e) => e.username !== data.player.username), data.player]);
    });
  }, [socket, setPlayer, setGuesses, username]);

  //error events
  useEffect(() => {
    socket.current.on("guess limit", () => {
      setError("You can not submit any more guesses")
    })
    socket.current.on("not authenticated", () => {
      setError("Not authenticated"); //this is where we could hit the logout api endpoint
    });
    socket.current.on("failed room create", () => {
      setError("Failed to create room please try again");
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
  }, [socket, setError]);

  useEffect(() => {
    socket.current.on("invalid room", (roomId) => {
      setError("Room not found");
      setSocketRoomIdError("invalid room")
      setCheckedRoomId(roomId)
    });
    socket.current.on("valid room", (roomId) => {
      navigate(`/room/${roomId}`)
    });
  }, [setError, setSocketRoomIdError, navigate])

  // game and room start / stop events
  useEffect(() => {
    socket.current.on("not running game", () => {
      if (runningGame) {
        setRunningGame(false);
      }
      setError("Game is not started");
    });
    socket.current.on("not running round", () => {
      if (runningRound) {
        setRunningRound(false);
      }
      setError("Round is not started");
    });
    socket.current.on("round over", (data) => {
      setPlayer((curr) => {
        return {
          ...curr,
          wonRound: false,
          lastGuess: "",
          guesses: 0,
        };
      });
      setPlayers(data.players);
      setRunningRound(false);
      setRoomMessage("Round Over");
    });
    socket.current.on("game over", (data) => {
      setRunningGame(false);
      setRoomMessage("Game Over");
      setPlayers(data.players)
    });
  }, [socket, setError, runningGame, setRunningGame, runningRound, setRunningRound, setRoomMessage, setPlayer]);

  useEffect(() => {
    socket.current.on("game start", () => {
      if (isHost) {
        socket.current.emit("start round");
      }
      setRunningGame(true);
      setRoomMessage("Game Starting");
    });
  }, [socket, setRunningGame, setRoomMessage, isHost])

  useEffect(() => {
    socket.current.on("round start", (data) => {
      setPlayer((curr) => {
        return {
          ...curr,
          wonRound: false,
          lastGuess: "",
          guesses: 0,
        };
      });
      setPlayers(data.players);
      setRunningRound(true);
      setGuesses([]);
      setRoundWord(data.roundWord);
      setRoomMessage("Round Starting");
    });
  }, [socket, setPlayer, setPlayers, setRunningRound, setGuesses, setRoundWord, setRoomMessage]);

  // timer event
  useEffect(() => {
    socket.current.on("timer countdown", (data) => {
      setRoomTimer(data.time);
    });
  }, [socket, setRoomTimer]);

  const createRoom = useCallback(() => {
    socket.current.emit("create room");
  }, [socket]);

  const createRoomSolo = useCallback(() => {
    socket.current.emit("create room solo");
  }, [socket]);

  const joinRoom = useCallback(
    (roomId) => {
      socket.current.emit("join room", roomId);
    },
    [socket]
  );

  const checkRoom = useCallback((roomId) => {
    socket.current.emit("check room", roomId)
  }, [socket])

  // const leaveRoom = useCallback(() => {
  //   socket.current.emit("leave room");
  // }, [socket]);

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
  }, [socket, isHost, setError, runningGame]);

  const startRound = useCallback(() => {
    if (socket) {
      if (isHost) {
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
    //leaveRoom,
    startGame,
    startRound,
    submitWord,
    createRoomSolo,
    checkRoom,
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
    username,
    roomId,
    wonRound,
    socketRoomIdError,
    checkedRoomId
  };
};

export default useSocket;
