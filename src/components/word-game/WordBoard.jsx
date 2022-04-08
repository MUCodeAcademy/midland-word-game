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
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      console.log(runningRound);
      if (!playerWonRound) {
        //enter
        if (e.keyCode === 13) {
          console.log(inputGuess);
          submitWord(inputGuess.join(""));
        }
        //backspace
        else if (e.keyCode === 8) {
          setInputGuess((curr) => [...curr.pop()]);
        }
        //letters
        else if (e.keyCode > 64 && e.keyCode < 91) {
          if (inputGuess.length < 5) {
            setInputGuess((curr) => [...curr, e.key]);
          }
        }
      }
    },
    [runningRound, inputGuess]
  );

  //sets inputGuess into correct format for WordRowDisplay
  useEffect(() => {
    console.log(inputGuess);
    setGuessFill([
      { letter: inputGuess[0] ? inputGuess[0] : "‎", status: "" },
      { letter: inputGuess[1] ? inputGuess[1] : "‎", status: "" },
      { letter: inputGuess[2] ? inputGuess[2] : "‎", status: "" },
      { letter: inputGuess[3] ? inputGuess[3] : "‎", status: "" },
      { letter: inputGuess[4] ? inputGuess[4] : "‎", status: "" },
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
    <div className="border">
      <div className="padding-10">
        {
          <WordRow
            submitWord={submitWord}
            guesses={guessesObjs}
            runningGame={runningGame}
            runningRound={runningRound}
            playerWonRound={playerWonRound}
            guessFill={guessFill}
          />
        }
      </div>

      <div className="padding-10">
        {(!solo || guesses.length < 6) && (
          <WordKeyboard guessedLetters={guessedLetters} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WordBoard);
