import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import useSocket from "../shared/hooks/useSocket";
import WordBoard from "./word-game/WordBoard";

export const ClassicPage = () => {
  const { state } = useLocation()
  const {
    createRoom,
    joinRoom,
    startGame,
    startRound,
    submitWord,
    error,
    roomMessage,
    players,
    player,
    guesses,
    roundWord,
    runningGame,
    runningRound,
    playerWonRound,
    isHost,
  } = useSocket();

  useEffect(() => {
    joinRoom(state.id)
  }, [])

  return <div>
  <div>{(error || roomMessage) && <span>{error ? error : roomMessage}</span>}</div>
  <div>
    <div>
      {isHost && (
        <>
          {!runningGame && <button onClick={() => startGame()}>Start Game</button>}
          {runningGame && !runningRound && <button onClick={() => startRound()}>Start Round</button>}
        </>
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
</div>
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassicPage);
