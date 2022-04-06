import React, { useEffect, useRef, useCallback } from "react";
import WordRowDisplay from "./WordRowDisplay";

function WordRow({ runningRound, playerWonRound, guesses, submitWord }) {
  const guessInput = useRef(null);

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
  }, [guesses]);

  return (
    <div>
      <div>
        {guesses &&
          guesses.map((val, i) => <WordRowDisplay key={val + j} val={val} />)}
      </div>

      {runningRound && !playerWonRound && (
        <div>
          <input
            id="input"
            type="text"
            ref={guessInput}
            placeholder="type your guess here"
          />
          <button
            onClick={() => {
              handleClick(guessInput.current.value);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default WordRow;
