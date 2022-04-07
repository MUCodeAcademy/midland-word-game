import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const firstRow = letters.slice(0, 7);
const secondRow = letters.slice(7, 14);
const thirdRow = letters.slice(14, 21);
const fourthRow = letters.slice(21);

function WordKeyBoard({ guessedLetters }) {
  const theme = useTheme();
  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    borderRadius: 5,
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 2,
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  }));

  return (
    <Grid className="keyboard-container" container sx={{ width: "100%", flexGrow: 1, display: "flex" }}>
      <Grid sx={{ width: "100%", display: "flex" }} item>
        {firstRow.map((letter, index) => {
          return (
            <Item
              key={letter + index}
              className={
                guessedLetters[letter.toLowerCase()]
                  ? guessedLetters[letter.toLowerCase()]
                  : ""
              }
            >
              {letter}
            </Item>
          );
        })}
      </Grid>
      <Grid sx={{ width: "100%", display: "flex" }} item>
        {secondRow.map((letter, index) => {
          return (
            <Item
              key={letter + index}
              className={
                guessedLetters[letter.toLowerCase()]
                  ? guessedLetters[letter.toLowerCase()]
                  : ""
              }
            >
              {letter}
            </Item>
          );
        })}
      </Grid>
      <Grid sx={{ width: "100%", display: "flex" }} item>
        {thirdRow.map((letter, index) => {
          return (
            <Item
              key={letter + index}
              className={
                guessedLetters[letter.toLowerCase()]
                  ? guessedLetters[letter.toLowerCase()]
                  : ""
              }
            >
              {letter}
            </Item>
          );
        })}
      </Grid>

      <Grid sx={{ width: "100%", display: "flex" }} item>
        <Item>delete</Item>
        {fourthRow.map((letter, index) => {
          return (
            <Item
              key={letter + index}
              className={
                guessedLetters[letter.toLowerCase()]
                  ? guessedLetters[letter.toLowerCase()]
                  : ""
              }
            >
              {letter}
            </Item>
          );
        })}
        <Item>enter</Item>
      </Grid>
    </Grid>
  );
}

export default WordKeyBoard;
