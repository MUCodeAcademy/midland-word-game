import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import WordKeyboard from "./WordKeyboard";
import WordRow from "./WordRow";

export const WordBoard = ({
  submitWord,
  guesses,
  roundWord,
  runningGame,
  runningRound,
  playerWonRound,
  solo,
}) => {
  const [guessedLetters, setGuessedLetters] = useState({});
  const [guessesObjs, setGuessesObjs] = useState([]);

  const [inputGuess, setInputGuess] = useState([]);
  const [guessFill, setGuessFill] = useState([]);

  //KeyDown event listener on entire page

  function handleKeyDown(e) {
    if (!playerWonRound && runningRound) {
      //enter
      if (e.keyCode === 13) {
        submitWord(inputGuess.join(""));
      }
      //backspace
      else if (e.keyCode === 8) {
        setInputGuess((curr) => [...curr.slice(0, curr.length - 1)]);
      }
      //letters
      else if (e.keyCode > 64 && e.keyCode < 91) {
        if (inputGuess.length < 5) {
          setInputGuess((curr) => [...curr, e.key]);
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  //sets inputGuess into correct format for WordRowDisplay
  useEffect(() => {
    setGuessFill([
      { letter: inputGuess[0] ? inputGuess[0] : "‎", status: "wrong" },
      { letter: inputGuess[1] ? inputGuess[1] : "‎", status: "wrong" },
      { letter: inputGuess[2] ? inputGuess[2] : "‎", status: "wrong" },
      { letter: inputGuess[3] ? inputGuess[3] : "‎", status: "wrong" },
      { letter: inputGuess[4] ? inputGuess[4] : "‎", status: "wrong" },
    ]);
  }, [inputGuess]);

  const letterDistCheck = useCallback(
    (word) => {
      const obj = {};
      roundWord.split("").forEach((val) => {
        obj[val] = obj[val] ? obj[val] + 1 : 1;
      });
      return obj;
    },
    [roundWord]
  );

  const checkGuess = useCallback(
    (recent) => {
      const guess = [];
      const checked = {};
      recent.split("").forEach((val, idx) => {
        let status = "";
        checked[val] = checked[val] ? checked[val] + 1 : 1;
        const letterDist = letterDistCheck(recent);
        if (roundWord[idx] === val) {
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
            return { ...curr };
          }
        });
      });
      setGuessesObjs((curr) => [...curr, [...guess]]);
    },
    [letterDistCheck, roundWord]
  );

  useEffect(() => {
    setInputGuess([]);
    setGuessesObjs([]);
    guesses.forEach((guess) => {
      checkGuess(guess);
    });
  }, [guesses, setGuessesObjs, checkGuess]);

  useEffect(() => {
    if (runningRound) {
      setGuessedLetters({});
    }
  }, [runningRound]);

  return (
    <>
      <WordRow
        submitWord={submitWord}
        guesses={guessesObjs}
        runningGame={runningGame}
        runningRound={runningRound}
        playerWonRound={playerWonRound}
        guessFill={guessFill}
        solo={solo}
      />

      <div className="padding-10">
        <WordKeyboard guessedLetters={guessedLetters} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WordBoard);
