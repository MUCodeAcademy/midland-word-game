import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import useSocket from "../../shared/hooks/useSocket";
import WordBoard from "../word-game/WordBoard";
import Score from "./Score";

export const GamePage = () => {
  const { roomId } = useParams();
  //const { state } = useLocation();
  //console.log(state)
  const {
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
  } = useSocket();
  const [timer, setTimer] = useState("");
  useEffect(() => {
    joinRoom(roomId);
    return () => {
      //leaveRoom();
    };
  }, []);

  const copyRoomId = useCallback(() => {
    async function init() {
      if ("clipboard" in navigator) {
        return await navigator.clipboard.writeText(roomId);
      } else {
        return document.execCommand("copy", true, roomId);
      }
    }
    init();
  }, [roomId]);
  //talk need to happen about how to display other players
  //    if that will be in score or a new component
  //    also more about how we want the layout of this to be
  //the error || roomMessage will need to separate them or have a timeout / clear method

  const timerDisplay = useCallback(
    (seconds) => {
      let m = Math.floor(seconds / 60);
      let s = Math.floor(seconds % 60);
      let mDisplay = m > 0 ? m + (m == 1 ? " min" : " mins") + (s > 0 ? ", " : "") : "";
      let sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
      setTimer(mDisplay + sDisplay);
    },
    [setTimer]
  );

  useEffect(() => {
    timerDisplay(roomTimer);
  }, [roomTimer]);

  return (
    <div>
      <div>{(error || roomMessage) && <span>{error ? error : roomMessage}</span>}</div>
      <div>
        <div>
          <div>
            <span>{roomId}</span>
            <button onClick={() => copyRoomId}>Copy</button>
          </div>
          {isHost && (
            <>
              {!runningGame && <button onClick={() => startGame()}>Start Game</button>}
              {!runningRound && <button onClick={() => startRound()}>Start Round</button>}
            </>
          )}
        </div>
        <div>
          <h3>{timer}</h3>
          <WordBoard
            submitWord={submitWord}
            guesses={guesses}
            roundWord={roundWord}
            runningGame={runningGame}
            runningRound={runningRound}
            playerWonRound={playerWonRound}
          />
        </div>
        <div>
          <Score players={players} player={player} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
