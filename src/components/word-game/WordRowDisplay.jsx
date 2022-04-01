import React, { useState } from "react";
import { Grid, Item } from "@mui/material";

function WordRowDisplay({ roundWordArr, userGuess }) {
  const guessArr = userGuess.split("");

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

  if (guessArr[0] === roundWordArr[0]) {
    setl1Correct(true);
  } else if (roundWordArr.includes(guessArr[0])) {
    setL1Included(true);
  } else return;

  if (guessArr[1] === roundWordArr[1]) {
    setl2Correct(true);
  } else if (roundWordArr.includes(guessArr[1])) {
    setL2Included(true);
  } else return;

  if (guessArr[2] === roundWordArr[2]) {
    setl3Correct(true);
  } else if (roundWordArr.includes(guessArr[2])) {
    setL3Included(true);
  } else return;

  if (guessArr[3] === roundWordArr[3]) {
    setl4Correct(true);
  } else if (roundWordArr.includes(guessArr[3])) {
    setL4Included(true);
  } else return;

  if (guessArr[4] === roundWordArr[4]) {
    setl5Correct(true);
  } else if (roundWordArr.includes(guessArr[4])) {
    setL5Included(true);
  } else return;

  return (
    <div className="center text-white">
      <Grid container spacing={1} columns={10}>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter1"
              className={`${
                l1Correct ? "correct" : l1Included ? "included" : "incorrect"
              }`}
            >
              {guessArr[0]}
            </div>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter2"
              className={`${
                l2Correct ? "correct" : l2Included ? "included" : "incorrect"
              }`}
            >
              {guessArr[1]}
            </div>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter3"
              className={`${
                l3Correct ? "correct" : l3Included ? "included" : "incorrect"
              }`}
            >
              {guessArr[2]}
            </div>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter4"
              className={`${
                l4Correct ? "correct" : l4Included ? "included" : "incorrect"
              }`}
            >
              {guessArr[3]}
            </div>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <div
              id="letter5"
              className={`${
                l5Correct ? "correct" : l5Included ? "included" : "incorrect"
              }`}
            >
              {guessArr[4]}
            </div>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default WordRowDisplay;