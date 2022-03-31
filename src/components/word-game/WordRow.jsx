import React, { useState, useEffect } from "react";
import WordRowDisplay from "./WordRowDisplay";

function WordRow({ roundWord, runningRound, playerWonRound, guesses }) {
  const [guess, setGuess] = useState("");
  const roundWordArr = roundWord.split("");

  handleClick((word) => {
    setGuess(word);
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
            onClick={(e) => {
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
