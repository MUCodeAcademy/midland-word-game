import React from "react";
import { connect } from "react-redux";
import WordKeyboard from "./WordKeyboard";
import WordRow from "./WordRow";

export const WordBoard = ({ submitWord, guesses, roundWord, runningGame, runningRound, playerWonRound }) => {
  return <div>
    <WordRow
      submitWord={submitWord}
      guesses={guesses}
      roundWord={roundWord}
      runningGame={runningGame}
      runningRound={runningRound}
      playerWonRound={playerWonRound}
    />
    <WordKeyboard guesses={guesses} roundWord={roundWord} />
  </div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WordBoard);
