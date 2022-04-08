import { Box } from "@mui/material";

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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [WordRow, guesses]);

  const [guessedWord, setGuessedWord] = useState("");

  useEffect(() => {
    if (guessedWord) {
      setGuessedWord("");
    }
    setGuessesFill([]);
    for (let i = 0; i < 5 - guesses.length; i++) {
      setGuessesFill((curr) => [
        ...curr,
        [
          { letter: "‎", status: "wrong" },
          { letter: "‎", status: "wrong" },
          { letter: "‎", status: "wrong" },
          { letter: "‎", status: "wrong" },
          { letter: "‎", status: "wrong" },
        ],
      ]);
    }
  }, [guesses, guessedWord]);

  return (
    <div>
      <Box
        sx={{ height: solo ? "auto" : 250, overflowY: solo ? "" : "scroll" }}
      >
        {guesses &&
          guesses.map((val, i) => <WordRowDisplay key={i} val={val} />)}
        <div ref={messagesEndRef} />
      </Box>
      {!solo && (
        <div>
          {guessFill && runningRound && <WordRowDisplay val={guessFill} />}
        </div>
      )}
      {solo && (
        <div>
          {guessFill && guesses.length !== 6 && (
            <WordRowDisplay val={guessFill} />
          )}
        </div>
      )}
      {solo && (
          <div>
            {guessesFill &&
              guessesFill.map((val, i) => <WordRowDisplay key={i} val={val} />)}
          </div>
        )}
    </div>
  );
}
export default WordRow;
