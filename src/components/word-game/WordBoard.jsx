import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import WordKeyboard from "./WordKeyboard";
// import WordRow from "./WordRow";

export const WordBoard = ({ submitWord, guesses, roundWord, runningGame, runningRound, playerWonRound, solo }) => {
const [guessedLetters, setGuessedLetters] = useState({});
const [guessesObjs, setGuessesObjs] = useState([]);

const letterDistCheck = useCallback((word) => {
  const obj = {};
  roundWord.split("").forEach((val) => {
    obj[val] = obj[val] ? obj[val] + 1 : 1;
  });
  return obj;
}, [roundWord]);

const checkGuess = useCallback((recent) => {
  const guess = [];
  const checked = {};
  recent.split("").forEach((val, idx) => {
    let status = "";
    checked[val] = checked[val] ? checked[val] + 1 : 1;
    const letterDist = letterDistCheck(recent)
    if(roundWord[idx] === val) {
      status = "correct";
    } else if (!letterDist[val] || letterDist[val] < checked[val]) {
      status = "wrong";
    } else {
      status = "misplaced";
    } 
    guess.push({ letter: val, status });

    setGuessedLetters((curr) => {
      if (!curr[val]) {
        return { ...curr, [val]: status };
      } else if (curr[val] === "misplaced" && status === "correct") {
        return { ...curr, [val]: status };
      } else {
        return {...curr}
      }
    });
  });
  setGuessesObjs(curr => [...curr, [...guess]])
}, [letterDistCheck, roundWord]);

useEffect(() => {
  setGuessesObjs([])
  guesses.forEach(guess => {
    checkGuess(guess)
  })
}, [guesses, setGuessesObjs, checkGuess])

  return (
    <div>
      {/* <WordRow
        submitWord={submitWord}
        guesses={guessesObjs}
        runningGame={runningGame}
        runningRound={runningRound}
        playerWonRound={playerWonRound}
      /> */}
      {(!solo || guesses.length < 6) && <WordKeyboard guessedLetters={guessedLetters} />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WordBoard);
