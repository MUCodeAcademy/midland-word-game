import React from "react";
import { Box, Grid } from "@mui/material";

function WordRowDisplay({ val }) {
  return (
    <div className="center text-white">
      <Grid container spacing={1} columns={10}>
        {val &&
          val.map((letter, i) => (
            <Grid item xs={2} key={letter.letter + letter.status + i}>
              <Box sx={{border: "1px solid black"}} className={`${letter.status ? letter.status : ""}`}>
                {letter.letter}
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default WordRowDisplay;
