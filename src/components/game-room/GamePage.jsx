import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import useSocket from "../../shared/hooks/useSocket";
import WordBoard from "../word-game/WordBoard";
import Chat from "./Chat";
import Clock from "./Clock";
import Score from "./Score";
import { Button, ThemeProvider, Grid } from "@mui/material/";
import { generalTheme } from "../../shared/mui-theme";
import { Box } from "@mui/system";

export const GamePage = ({ user }) => {
  const copyBtn = useRef();
  const { roomId } = useParams();
  const {
    joinRoom,
    startGame,
    startRound,
    submitWord,
    error,
    roomMessage,
    players,
    guesses,
    roomTimer,
    roundWord,
    runningGame,
    runningRound,
    playerWonRound,
    isHost,
    username,
    messages,
    sendMessage,
  } = useSocket();

  useEffect(() => {
    joinRoom(roomId);
  }, [joinRoom, roomId]);

  return (

    <ThemeProvider theme={generalTheme}>
      <div className="center">
        <div className="padding-10">
          {(error || roomMessage) && <span>{error ? error : roomMessage}</span>}
        </div>
        <div>
          <Grid container spacing={4} justifyContent="center" display="flex">
            <Grid item xs={4}>
              <div>
                <span className="margin-10">Room ID: {roomId}</span>
                <Button
                  variant="contained"
                  ref={copyBtn}
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                    copyBtn.current.innerText = "Copied";
                  }}
                >
                  Copy
                </Button>
              </div>
            </Grid>
            <Grid item xs={4}>
              {isHost && (
                <>
                  {!runningGame && (
                    <Button variant="contained" onClick={() => startGame()}>
                      Start Game
                    </Button>
                  )}
                  {runningGame && !runningRound && (
                    <Button variant="contained" onClick={() => startRound()}>
                      Start Round
                    </Button>
                  )}
                </>
              )}
              {!runningRound && roundWord && !playerWonRound &&(
                <div className="padding-10">
                  <span>{`The word was ${roundWord}`}</span>
                </div>
              )}
            </Grid>
            <Grid item xs={4}>
              <div>
                <Clock roomTimer={roomTimer} />
              </div>
            </Grid>
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
                    solo={false}
                  />
                </Box>
              </div>
            </Grid>
            <div className="game-page-footer">
              <Chat
                roomId={roomId}
                user={user}
                messages={messages}
                sendMessage={sendMessage}
              />
              <div className="score-container">
                <Score
                  players={players}
                  username={username}
                  runningRound={runningRound}
                />
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
