import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const letters = [
  { key: "Q", code: 81 },
  { key: "W", code: 87 },
  { key: "E", code: 69 },
  { key: "R", code: 82 },
  { key: "T", code: 84 },
  { key: "Y", code: 89 },
  { key: "U", code: 85 },
  { key: "I", code: 73 },
  { key: "O", code: 79 },
  { key: "P", code: 80 },
  { key: "A", code: 65 },
  { key: "S", code: 83 },
  { key: "D", code: 68 },
  { key: "F", code: 70 },
  { key: "G", code: 71 },
  { key: "H", code: 72 },
  { key: "J", code: 74 },
  { key: "K", code: 75 },
  { key: "L", code: 76 },
  { key: "Z", code: 90 },
  { key: "X", code: 88 },
  { key: "C", code: 67 },
  { key: "V", code: 86 },
  { key: "B", code: 66 },
  { key: "N", code: 78 },
  { key: "M", code: 77 },
];
//13 enter
//8 backspace
const firstRow = letters.slice(0, 10);
const secondRow = letters.slice(10, 19);
const thirdRow = letters.slice(19, 27);

function WordKeyBoard({ guessedLetters, handleInput }) {
  const theme = useTheme();
  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1.5),
    borderRadius: 5,
    textAlign: "center",
    cursor: "pointer",
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
              onClick={() => handleInput(letter.code, letter.key.toLowerCase())}
              key={letter.code}
              className={
                guessedLetters[letter.key.toLowerCase()]
                  ? guessedLetters[letter.key.toLowerCase()]
                  : "letter"
              }
            >
              {letter.key}
            </Item>
          );
        })}
      </Grid>
      <Grid sx={{ width: "100%", display: "flex" }} item>
        {secondRow.map((letter, index) => {
          return (
            <Item
              key={letter.code}
              onClick={() => handleInput(letter.code, letter.key.toLowerCase())}
              className={
                guessedLetters[letter.key.toLowerCase()]
                  ? guessedLetters[letter.key.toLowerCase()]
                  : "letter"
              }
            >
              {letter.key}
            </Item>
          );
        })}
      </Grid>
      <Grid sx={{ width: "100%", display: "flex" }} item>
        <Item className="letter" onClick={() => handleInput(8, "delete")}>
          delete
        </Item>
        {thirdRow.map((letter, index) => {
          return (
            <Item
              onClick={() => handleInput(letter.code, letter.key.toLowerCase())}
              key={letter.code}
              className={
                guessedLetters[letter.key.toLowerCase()]
                  ? guessedLetters[letter.key.toLowerCase()]
                  : "letter"
              }
            >
              {letter.key}
            </Item>
          );
        })}
        <Item className="letter" onClick={() => handleInput(13, "enter")}>
          enter
        </Item>
      </Grid>
    </Grid>
  );
}

export default WordKeyBoard;
