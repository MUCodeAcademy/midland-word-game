import React from "react";
import { connect } from "react-redux";
import WordKeyboard from "./WordKeyboard";
import WordRow from "./WordRow";

export const WordBoard = ({ submitWord, guesses, roundWord, runningGame, runningRound, playerWonRound, solo }) => {
  return (
    <div>
      <WordRow
        submitWord={submitWord}
        guesses={guesses}
        roundWord={roundWord}
        runningGame={runningGame}
        runningRound={runningRound}
        playerWonRound={playerWonRound}
      />
      {(!solo || guesses.length < 6) && <WordKeyboard guesses={guesses} roundWord={roundWord} />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WordBoard);
