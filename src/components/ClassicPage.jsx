import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import useSocket from "../shared/hooks/useSocket";
import WordBoard from "./word-game/WordBoard";

export const ClassicPage = () => {
  const {
    joinRoom,
    startGame,
    startRound,
    submitWord,
    createRoomSolo,
    error,
    roomMessage,
    guesses,
    roundWord,
    runningGame,
    runningRound,
    playerWonRound,
    roomId,
    wonRound,
  } = useSocket();

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
    } else {
      createRoomSolo();
    }
  }, [roomId, joinRoom, createRoomSolo]);

  return (
    <div className="classic-container">
      <div className="classic-header">
        {wonRound ? <span>You win!</span> : <div>{(error || roomMessage) && <span>{error ? error : roomMessage}</span>}</div>}
        <div>
          {!runningGame && <button onClick={() => startGame()}>{roundWord ? "Play again" : "Start Game"}</button>}
          {runningGame && !runningRound && <button onClick={() => startRound()}>Start Round</button>}
        </div>
        {!runningGame && roundWord && (
          <div>
            <span>{`The word was ${roundWord}`}</span>
          </div>
        )}
      </div>
      <div>
        <WordBoard
          submitWord={submitWord}
          guesses={guesses}
          roundWord={roundWord}
          runningGame={runningGame}
          runningRound={runningRound}
          playerWonRound={playerWonRound}
          solo={true}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassicPage);
