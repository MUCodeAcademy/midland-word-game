import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
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
        <div>
          {!runningGame && !runningRound && (
            <Button variant="contained" onClick={() => startGame()}>
              Start Game
            </Button>
          )}
          {/* {runningGame && !runningRound && (
            <Button variant="contained" onClick={() => startRound()}>
              Start Round
            </Button>
          )} */}
        </div>
        {!runningGame && roundWord && !playerWonRound && (
          <div className="padding-10">
            <span>
              The word was <b>{roundWord.toUpperCase()}</b>
            </span>
          </div>
        )}
        {error && (
          <div className="padding-10">
            <span>{error}</span>
          </div>
        )}
      </div>
      <div className="word-board-container">
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
