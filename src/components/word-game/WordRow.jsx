import React, { useEffect, useRef, useCallback } from "react";
import WordRowDisplay from "./WordRowDisplay";

function WordRow({
  roundWord,
  runningRound,
  playerWonRound,
  guesses,
  submitWord,
}) {
  const roundWordArr = roundWord ? roundWord.split("") : [];

  const guessInput = useRef(null);

  const handleClick = useCallback((word) => {
    submitWord(word);
  }, [submitWord]);

  useEffect(() => {
    if(guessInput.current){
      guessInput.current.value = "";
    }
  }, [guesses]);

  return (
    <div>
      <div>
        {guesses && guesses.map((val, i) => (
          <WordRowDisplay
            key={val + i}
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
