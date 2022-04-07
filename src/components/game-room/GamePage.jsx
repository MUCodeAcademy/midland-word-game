import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import useSocket from "../../shared/hooks/useSocket";
import WordBoard from "../word-game/WordBoard";
import Chat from "./Chat";
import Clock from "./Clock";
import Score from "./Score";

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
    <div>
      <div>
        {(error || roomMessage) && <span>{error ? error : roomMessage}</span>}
      </div>
      <div>
        <div>
          <div>
            <span>{roomId}</span>
            <button
              ref={copyBtn}
              onClick={() => {
                navigator.clipboard.writeText(roomId);
                copyBtn.current.innerText = "Copied";
              }}
            >
              Copy
            </button>
          </div>
          {isHost && (
            <>
              {!runningGame && (
                <button onClick={() => startGame()}>Start Game</button>
              )}
              {runningGame && !runningRound && (
                <button onClick={() => startRound()}>Start Round</button>
              )}
            </>
          )}
        </div>
        <div>
          <Clock roomTimer={roomTimer} />
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
        <div className="score-container">
          <Score
            players={players}
            username={username}
            runningRound={runningRound}
          />
        </div>
        <Chat
          roomId={roomId}
          user={user}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
