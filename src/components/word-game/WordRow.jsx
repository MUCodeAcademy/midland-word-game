import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useCallback, useState } from "react";
import WordRowDisplay from "./WordRowDisplay";

function WordRow({ runningRound, playerWonRound, guesses, submitWord, solo }) {
  const guessInput = useRef(null);
  const [guessesFill, setGuessesFill] = useState([]);

  const [inputGuess, setInputGuess] = useState([]);

  const handleKeyPress = (event) => {
    setInputGuess((curr) => [...curr, [event.key]]);
  };

  //autofocus on input after each submission
  function resetForm() {
    guessInput.current.focus();
  }

  const handleClick = useCallback(
    (word) => {
      submitWord(word);
      resetForm();
    },
    [submitWord]
  );

  useEffect(() => {
    if (guessInput.current) {
      guessInput.current.value = "";
    }
    setGuessesFill([]);
    for (let i = 0; i < 6 - guesses.length; i++) {
      setGuessesFill((curr) => [
        ...curr,
        [
          { letter: "‎", status: "" },
          { letter: "‎", status: "" },
          { letter: "‎", status: "" },
          { letter: "‎", status: "" },
          { letter: "‎", status: "" },
        ],
      ]);
    }
  }, [guesses]);

  return (
    <div>
      <div>
        {guesses &&
          guesses.map((val, i) => <WordRowDisplay key={i} val={val} />)}
      </div>
      {solo && (
        <div>
          {guessesFill &&
            guessesFill.map((val, i) => <WordRowDisplay key={i} val={val} />)}
        </div>
      )}

      {runningRound && !playerWonRound && (
        <div>
          {inputGuess}
          <input
            id="input"
            type="text"
            ref={guessInput}
            placeholder="type your guess here"
            onKeyDown={(e) => handleKeyPress(e)}
            className="margin-10"
            autoFocus
          />
          <Button
            variant="contained"
            onClick={() => {
              handleClick(guessInput.current.value);
            }}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}

export default WordRow;
