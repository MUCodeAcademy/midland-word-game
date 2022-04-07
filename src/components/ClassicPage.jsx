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
        {!runningGame && roundWord && !playerWonRound && (
          <div className="padding-10">
            <span>{`The word was ${roundWord}`}</span>
          </div>
        )}
      </div>
      <Grid container spacing={4} justifyContent="center" display="flex">
        <Grid item xs={12}>
          <div className="width-80pc">
            <Box display="flex" justifyContent="center">
              <WordBoard
                submitWord={submitWord}
                guesses={guesses}
                roundWord={roundWord}
                runningGame={runningGame}
                runningRound={runningRound}
                playerWonRound={playerWonRound}
                solo={true}
              />
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassicPage);
