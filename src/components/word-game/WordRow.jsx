import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useCallback, useState } from "react";
import WordRowDisplay from "./WordRowDisplay";

function WordRow({
  runningRound,
  playerWonRound,
  guesses,
  solo,
  guessFill,
  inputGuess,
}) {
  const [guessesFill, setGuessesFill] = useState([]);

  const [guessedWord, setGuessedWord] = useState("");

  useEffect(() => {
    if (guessedWord) {
      setGuessedWord("");
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
      <div>
        {console.log(guessFill)}
        {guessFill && <WordRowDisplay val={guessFill} />}
      </div>
    </div>
  );
}
export default WordRow;
