import { Grid, Item } from "@mui/material";
import React, { useState } from "react";

function WordRow({ guess, currentWord }) {
  const [correct, setCorrect] = useState(false);
  const [letterIncluded, setLetterIncluded] = useState(false);

  const guessArr = guess.split("");
  const currWordArr = currentWord.split("");

  return (
    <div>
      <Grid container spacing={1} columns={10}>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter1"
              className={`${
                correct ? "correct" : letterIncluded ? "included" : "incorrect"
              }`}
            >
              {guess[0]}
            </div>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter2"
              className={`${
                correct ? "correct" : letterIncluded ? "included" : "incorrect"
              }`}
            >
              {guess[1]}
            </div>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter3"
              className={`${
                correct ? "correct" : letterIncluded ? "included" : "incorrect"
              }`}
            >
              {guess[2]}
            </div>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter4"
              className={`${
                correct ? "correct" : letterIncluded ? "included" : "incorrect"
              }`}
            >
              {guess[3]}
            </div>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter5"
              className={`${
                correct ? "correct" : letterIncluded ? "included" : "incorrect"
              }`}
            >
              {guess[4]}
            </div>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default WordRow;
