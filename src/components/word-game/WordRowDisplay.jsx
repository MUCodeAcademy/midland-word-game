import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

function WordRowDisplay({ roundWordArr, userGuess }) {
  const [guessArr, setGuessArr] = useState([]);

  const [l1Correct, setl1Correct] = useState(false);
  const [l1Included, setL1Included] = useState(false);

  const [l2Correct, setl2Correct] = useState(false);
  const [l2Included, setL2Included] = useState(false);

  const [l3Correct, setl3Correct] = useState(false);
  const [l3Included, setL3Included] = useState(false);

  const [l4Correct, setl4Correct] = useState(false);
  const [l4Included, setL4Included] = useState(false);

  const [l5Correct, setl5Correct] = useState(false);
  const [l5Included, setL5Included] = useState(false);

  useEffect(() => {
    if (userGuess) {
      setGuessArr(userGuess.split(""));
    }
  }, [userGuess, setGuessArr]);

  useEffect(() => {
    if (guessArr.length > 0 && roundWordArr.length > 0) {
      if (guessArr[0] === roundWordArr[0]) {
        setl1Correct(true);
      } else if (roundWordArr.includes(guessArr[0])) {
        setL1Included(true);
      }
      if (guessArr[1] === roundWordArr[1]) {
        setl2Correct(true);
      } else if (roundWordArr.includes(guessArr[1])) {
        setL2Included(true);
      }
      if (guessArr[2] === roundWordArr[2]) {
        setl3Correct(true);
      } else if (roundWordArr.includes(guessArr[2])) {
        setL3Included(true);
      }
      if (guessArr[3] === roundWordArr[3]) {
        setl4Correct(true);
      } else if (roundWordArr.includes(guessArr[3])) {
        setL4Included(true);
      }
      if (guessArr[4] === roundWordArr[4]) {
        setl5Correct(true);
      } else if (roundWordArr.includes(guessArr[4])) {
        setL5Included(true);
      }
    }
  }, [
    guessArr,
    roundWordArr,
    setl1Correct,
    setl2Correct,
    setl3Correct,
    setl4Correct,
    setl5Correct,
    setL1Included,
    setL2Included,
    setL3Included,
    setL4Included,
    setL5Included,
  ]);

  return (
    <div className="center text-white">
      <Grid container spacing={1} columns={10}>
        <Grid item xs={2}>
          <Box
            id="letter1"
            className={`${
              l1Correct ? "correct" : l1Included ? "included" : "wr-incorrect"
            }`}
          >
            {guessArr[0]}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            id="letter2"
            className={`${
              l2Correct ? "correct" : l2Included ? "included" : "wr-incorrect"
            }`}
          >
            {guessArr[1]}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            id="letter3"
            className={`${
              l3Correct ? "correct" : l3Included ? "included" : "wr-incorrect"
            }`}
          >
            {guessArr[2]}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            id="letter4"
            className={`${
              l4Correct ? "correct" : l4Included ? "included" : "wr-incorrect"
            }`}
          >
            {guessArr[3]}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            id="letter5"
            className={`${
              l5Correct ? "correct" : l5Included ? "included" : "wr-incorrect"
            }`}
          >
            {guessArr[4]}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default WordRowDisplay;
