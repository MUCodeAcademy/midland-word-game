import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useSocket from "../../shared/hooks/useSocket";
import WordBoard from "../word-game/WordBoard";
import Chat from "./Chat";
import Clock from "./Clock";
import Score from "./Score";
import {
  Button,
  ThemeProvider,
  Grid,
  Modal,
  Typography,
  IconButton,
  Popover,
} from "@mui/material/";
import { generalTheme } from "../../shared/mui-theme";

import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 240,
  bgcolor: "#FF934F",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const closeButtonStyle = {
  position: "absolute",
  right: 0,
  top: 0,
};

export const GamePage = ({ user }) => {
  const copyBtn = useRef();
  const { roomId } = useParams();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatFocused, setChatFocused] = useState(false);
  const popOpen = Boolean(anchorEl);
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
      handleClose();
    }
  }, [roomMessage]);

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };

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
            <IconButton
              aria-label="delete"
              size="large"
              sx={closeButtonStyle}
              onClick={() => handleClose()}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
            <Typography>Winner</Typography>
            <Typography>
              {winnerUsername === username ? (
                <span style={{ textDecoration: "underline" }}>You</span>
              ) : (
                winnerUsername
              )}
            </Typography>
          </Box>
        </Modal>
        <div className="padding-10 room-message">
          {(error || roomMessage) && (
            <span>
              {!runningRound && roundWord
                ? `The word was ${roundWord}`
                : error
                ? error
                : roomMessage}
            </span>
          )}
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
            </Grid>
            <Grid item xs={4}>
              <div>
                <Clock roomTimer={roomTimer} />
              </div>
            </Grid>
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
        </div>

        <div className="board-layout">
          <div className="chat-container">
            <Chat
              setChatFocused={setChatFocused}
              roomId={roomId}
              user={user}
              messages={messages}
              sendMessage={sendMessage}
            />
          </div>
          <div className="word-board-container">
            <WordBoard
              chatFocused={chatFocused}
              submitWord={submitWord}
              guesses={guesses}
              roundWord={roundWord}
              runningGame={runningGame}
              runningRound={runningRound}
              playerWonRound={playerWonRound}
              solo={false}
            />
          </div>
          <div className="score-container">
            <Score
              players={players}
              username={username}
              runningRound={runningRound}
            />
          </div>
        </div>
        <div className="chat-pop-button">
          <Button variant="contained" onClick={handlePopClick}>
            Chat
          </Button>
        </div>
        <Popover
          open={popOpen}
          anchorEl={anchorEl}
          onClose={handlePopClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <div className="chat-pop-container">
            <IconButton
              style={{ marginLeft: "auto", display: "block" }}
              onClick={handlePopClose}
            >
              <CloseIcon />
            </IconButton>
            <Chat
              setChatFocused={setChatFocused}
              roomId={roomId}
              user={user}
              messages={messages}
              sendMessage={sendMessage}
            />
          </div>
        </Popover>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
