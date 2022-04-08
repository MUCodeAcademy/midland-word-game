import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const letters = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
const firstRow = letters.slice(0, 10);
const secondRow = letters.slice(11, 19);
const thirdRow = letters.slice(20, 27);

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
    userSelect: "none",
    border: "1px solid black",
  }));

  return (
    <Grid
      className="keyboard-container"
      container
      sx={{ width: "100%", flexGrow: 1, display: "flex" }}
    >
      <Grid sx={{ width: "100%", display: "flex" }} item>
        {firstRow.map((letter, index) => {
          return (
            <Item
              key={letter + index}
              className={
                guessedLetters[letter.toLowerCase()]
                  ? guessedLetters[letter.toLowerCase()]
                  : "letter"
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
                  : "letter"
              }
            >
              {letter}
            </Item>
          );
        })}
      </Grid>
      <Grid sx={{ width: "100%", display: "flex" }} item>
        <Item className="letter">delete</Item>
        {thirdRow.map((letter, index) => {
          return (
            <Item
              key={letter + index}
              className={
                guessedLetters[letter.toLowerCase()]
                  ? guessedLetters[letter.toLowerCase()]
                  : "letter"
              }
            >
              {letter}
            </Item>
          );
        })}
        <Item className="letter">enter</Item>
      </Grid>
    </Grid>
  );
}

export default WordKeyBoard;
