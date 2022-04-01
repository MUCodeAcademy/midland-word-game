import React, { useEffect, useRef } from "react";
import WordRowDisplay from "./WordRowDisplay";

function WordRow({ roundWord, runningRound, playerWonRound, guesses }) {
  const roundWordArr = roundWord.split("");
  const guessInput = useRef(null);

  handleClick((word) => {
    submitWord(word);
  });

  useEffect(() => {
    guessInput.current.value = "";
  }, [guesses]);

  return (
    <div>
      <div>
        {guesses.map((val) => (
          <WordRowDisplay
            key={val}
            roundWordArr={roundWordArr}
            userGuess={val}
          />
        ))}
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
