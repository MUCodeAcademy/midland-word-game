import React, { useEffect, useRef, useCallback } from "react";
import WordRowDisplay from "./WordRowDisplay";

function WordRow({
  roundWord,
  runningRound,
  playerWonRound,
  guesses,
  submitWord,
}) {
  const roundWordArr = roundWord.split("");

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
        {guesses && guesses.map((val) => (
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
