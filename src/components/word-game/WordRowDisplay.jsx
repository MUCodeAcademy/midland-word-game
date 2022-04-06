import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

function WordRowDisplay({ val }) {
  return (
    <div className="center text-white">
      <Grid container spacing={1} columns={10}>
        {val &&
          val.map((letter) => (
            <Grid item xs={2}>
              <Box className={`${letter.status ? letter.status : ""}`}>
                {letter.letter}
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default WordRowDisplay;
