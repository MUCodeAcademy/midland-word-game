import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
  const theme= useTheme()
  const Item = styled(Box)(({ theme }) => ({
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
  const defaultKeyboard = (letter)=> {
    let className = "default-keyboard"
    if (correct.includes(letter)){
      return "correct"
    }
    if (partCorrect.includes(letter)){
      return "included"
    }
    if (incorrect.includes(letter)){
      return "incorrect"
    }
    return className;
  }

  const getColorClassName = ()=>{
    let className = theme.palette
      ? "default-keyboard" 
      : defaultKeyboard;
      return className;
  }
  console.log(incorrect, correct, partCorrect)
  // console.log(guesses)
  // const guessesArr = guesses.split()
  console.log(roundWord)
  const roundWordArr = roundWord ? roundWord.split("") : ""
  const newGuessesArr = guesses.length > 0 ? guesses[guesses.length -1].split("") : []


  useEffect(() => {
    
  newGuessesArr.map((letter, i) => {

    if (roundWordArr.includes(letter)) {
        if (newGuessesArr[i] === roundWordArr[i]) {
          setCorrect((correct) => [...correct, letter]);
        } else {
          setPartCorrect((partCorrect) => [...partCorrect, letter])
        }
    } else {
      setIncorrect((incorrect) => [...incorrect, letter])
    }

    
  });
  }, [guesses]);

    return (
        <Grid direction="column" container sx={{ width: "100%", flexGrow: 1, display: "flex" }}>
          <Grid sx={{ width:"100%", display: "flex" }} direction="row" item >
            {
              firstRow.map((letter, index)=>{

                return <Item key={letter + index} className={getColorClassName(letter)}>{letter}</Item>
              })
            }
          </Grid>
          <Grid sx={{ width:"100%", display: "flex" }} direction="row" item >
            {
              secondRow.map((letter, index)=>{
                return <Item key={letter + index} className={getColorClassName(letter)}>{letter}</Item>
              })
            }
          </Grid>
          <Grid sx={{ width:"100%", display: "flex" }} direction="row" item >
            {
              thirdRow.map((letter, index)=>{
                return <Item key={letter + index} className={getColorClassName(letter)}>{letter}</Item>
              })
            }
          </Grid>

          <Grid sx={{ width:"100%", display: "flex" }} direction="row" item>
            <Item>delete</Item>
            {
              fourthRow.map((letter, index)=>{
                return <Item key={letter + index} className={getColorClassName(letter)}>{letter}</Item>
              })
            }
            <Item>enter</Item>

          </Grid>

        </Grid>
  );
}
