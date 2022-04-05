import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";

const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const firstRow = letters.slice(0,7);
const secondRow = letters.slice(7,14);
const thirdRow = letters.slice(14,21);
const fourthRow = letters.slice(21)
//! how can I help?
export default function WordKeyBoard({guesses, roundWord}) {
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#687c8c',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: 2,
  display: "flex",
  flexGrow: 1,
  justifyContent: "center"
}));

const [incorrect, setIncorrect] = useState([]);
const [correct, setCorrect] = useState([]);
const [partCorrect, setPartCorrect] = useState([]);
const getLetterKeyClassName = (letter)=>{
  let className = "default"
  if (correct.includes(letter)){
    className = "correct"
  }
  if (partCorrect.includes(letter)){
    className = "included"
  }
  if (incorrect.includes(letter)){
    className = "incorrect"
  }
  return className;
}
// console.log(guesses)
// const guessesArr = guesses.split()
console.log(roundWord)
const roundWordArr = roundWord.split("")
const newGuessesArr = guesses[guesses.length -1].split("")


useEffect(() => {
  

newGuessesArr.map((letter) => {

  if (roundWordArr.includes(letter)) {
    setPartCorrect((partCorrect) => [...partCorrect, "letter"])
  } else {
    setIncorrect((incorrect) => [...incorrect, "letter"])
  }

  for (let i = 0; i < 5; i++) {
    if (newGuessesArr[i] === roundWordArr[i]) {
      setCorrect((correct) => [...correct, "letter"]);
      break;
    }
  }
});
}, [guesses]);

  return (
      <Grid direction="column" container sx={{ width: "100%", flexGrow: 1, display: "flex" }}>
        <Grid sx={{ width:"100%", display: "flex" }} direction="row" item >
          {
            firstRow.map((letter, index)=>{
              return<Item key={letter + index} className={getLetterKeyClassName(letter)}>{letter}</Item>
            })
          }
        </Grid>
        <Grid sx={{ width:"100%", display: "flex" }} direction="row" item >
          {
            secondRow.map((letter, index)=>{
              return <Item key={letter + index} className={getLetterKeyClassName(letter)}>{letter}</Item>
            })
          }
        </Grid>
        <Grid sx={{ width:"100%", display: "flex" }} direction="row" item >
          {
            thirdRow.map((letter, index)=>{
              return <Item key={letter + index} className={getLetterKeyClassName(letter)}>{letter}</Item>
            })
          }
        </Grid>

        <Grid sx={{ width:"100%", display: "flex" }} direction="row" item>
          <Item>delete</Item>
          {
            fourthRow.map((letter, index)=>{
              return <Item key={letter + index} className={getLetterKeyClassName(letter)}>{letter}</Item>
            })
          }
          <Item>enter</Item>

        </Grid>

      </Grid>
);
}
