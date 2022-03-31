import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import useSocket from "../../shared/hooks/useSocket";
import WordBoard from "../word-game/WordBoard";
import Score from "./Score";

export const GamePage = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
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
  } = useSocket(state.socket ? state.socket : null);

  useEffect(() => {
    joinRoom(roomId);
    return () => {
      leaveRoom();
    };
  }, []);

  const copyRoomId = useCallback(() => {
    navigator.clipboard.writeText(roomId); //i think this works but test it
  }, [roomId])
  //talk need to happen about how to display other players
  //    if that will be in score or a new component
  //    also more about how we want the layout of this to be
  //the error || roomMessage will need to separate them or have a timeout / clear method
  return (
    <div>
      <div>{(error || roomMessage) && <span>{error ? error : roomMessage}</span>}</div>
      <div>
        <div>
          <div>
            <span>{roomId}</span>
            <button onClick={() => copyRoomId}></button>
          </div>
          {isHost && (
            <>
              {!runningGame && <button onClick={() => startGame()}>Start Game</button>}
              {!runningRound && <button onClick={() => startRound()}>Start Round</button>}
            </>
          )}
        </div>
        <div>
          <span>{roomTimer}</span>
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
          <Score players={players} player={player}/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
