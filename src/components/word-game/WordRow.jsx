
import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { Button, Box } from "@mui/material";

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
      <Box sx={{ height: 250, overflowY: "scroll" }}>
        {guesses &&
          guesses.map((val, i) => <WordRowDisplay key={i} val={val} />)}
        <div ref={messagesEndRef} />
      </Box>
      {solo && (
        <div>
          {guessesFill &&
            guessesFill.map((val, i) => <WordRowDisplay key={i} val={val} />)}
        </div>
      )}
      <div>
        {guessFill && runningRound && <WordRowDisplay val={guessFill} />}
      </div>
    </div>
  );
}
export default WordRow;
