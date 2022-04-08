import React from "react";
import { Box, Grid } from "@mui/material";

function WordRowDisplay({ val }) {
  return (
    <div className="center text-white">
      <Grid container spacing={0} columns={10}>
        {val &&
          val.map((letter, i) => (
            <Grid item xs={2} key={letter.letter + letter.status + i}>
              <Box
                sx={{ border: "1px solid black", padding: 2 }}
                className={`${letter.status ? letter.status : ""}`}
              >
                {letter.letter.toUpperCase()}
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default WordRowDisplay;
