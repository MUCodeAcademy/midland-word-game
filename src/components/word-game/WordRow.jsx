import { Button } from "@mui/material";
import React, { useEffect, useRef, useCallback, useState } from "react";
import WordRowDisplay from "./WordRowDisplay";

function WordRow({ runningRound, playerWonRound, guesses, submitWord, solo }) {
  const guessInput = useRef(null);
  const [guessesFill, setGuessesFill] = useState([]);

  const handleClick = useCallback(
    (word) => {
      submitWord(word);
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
          <input
            id="input"
            type="text"
            ref={guessInput}
            placeholder="type your guess here"
            className="margin-10"
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
