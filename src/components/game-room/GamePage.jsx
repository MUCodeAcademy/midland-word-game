import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useSocket from "../../shared/hooks/useSocket";
import WordBoard from "../word-game/WordBoard";
import Chat from "./Chat";
import Clock from "./Clock";
import Score from "./Score";
import { Button, ThemeProvider, Grid, Modal, Typography } from "@mui/material/";
import { generalTheme } from "../../shared/mui-theme";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 240,
  bgcolor: '#FF934F',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

export const GamePage = ({ user }) => {
  const copyBtn = useRef();
  const { roomId } = useParams();
  const [open, setOpen] = useState(false);
  const [winnerUsername, setWinnerUsername] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const navigate = useNavigate();

  useEffect(() => {
    joinRoom(roomId);
  }, [joinRoom, roomId]);


  useEffect(() => {
    const winner = players.find(
      (player) => player.wonRound && !player.isKnockedOut
    );
    if (winner) {
      setWinnerUsername(winner.username);
    }
  }, [players]);
  useEffect(() => {
    if (roomMessage === "Game Over") {
      handleOpen();
    } else {
      handleClose()
    }
  }, [roomMessage]);
  

  return (
    <ThemeProvider theme={generalTheme}>
      <div className="center">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography>Winner</Typography>
            <Typography>{winnerUsername === username ? <span style={{textDecoration: "underline"}}>You</span> : winnerUsername}</Typography>
          </Box>
        </Modal>
        <div className="padding-10 room-message">
          {(error || roomMessage) && <span>{error ? error : roomMessage}</span>}
        </div>

        <div>
          <Grid container spacing={4} justifyContent="center" display="flex">
            <Grid item xs={4}>
              <div style={{ marginTop: "10px" }}>
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
                    <Button
                      style={{ marginTop: "10px" }}
                      variant="contained"
                      onClick={() => startGame()}
                    >
                      Start Game
                    </Button>
                  )}
                  {runningGame && !runningRound && (
                    <Button
                      style={{ marginTop: "10px" }}
                      variant="contained"
                      onClick={() => startRound()}
                    >
                      Start Round
                    </Button>
                  )}
                </>
              )}
              {!runningGame && roundWord && !playerWonRound && (

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
            <Grid style={{ paddingTop: "10px" }} item xs={12}>
              <Button
                variant="contained"
                onClick={() => navigate("/play")}
                size="small"
              >
                Leave Game
              </Button>
            </Grid>

            <Grid item container justifyContent="space-between" spacing={12}>
              <Grid item container xs={3} sm={4} sx={{ p: 5 }}>
                <Grid item sx={{ pl: 5, mb: 5 }}>
                  <div className="score-container">
                    <Score
                      players={players}
                      username={username}
                      runningRound={runningRound}
                    />
                  </div>
                </Grid>
                <Grid item sx={{ pl: 5 }}>
                  <Chat
                    roomId={roomId}
                    user={user}
                    messages={messages}
                    sendMessage={sendMessage}
                  />
                </Grid>
              </Grid>
              <Grid item sm={12} md={8} sx={{ p: 5 }}>
                <div>


            <Grid item xs={12} style={{ paddingTop: "10px" }}>
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
                </div>
              </Grid>
            </Grid>
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
