import { Button } from "@mui/material";
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
          {!runningGame && (
            <Button variant="contained" onClick={() => startGame()}>
              {roundWord ? "Play again" : "Start Game"}
            </Button>
          )}
          {runningGame && !runningRound && (
            <Button variant="contained" onClick={() => startRound()}>
              Start Round
            </Button>
          )}
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
