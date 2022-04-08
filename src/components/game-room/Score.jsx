import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useCallback, useEffect, useState } from "react";
import PlayerDisplay from "./PlayerDisplay";

const ScoreContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "5px",
  padding: "5px",
  textAlign: "center",
  width: "100%",
}));

function Score({ players, username, runningRound }) {
  const [roundWinners, setRoundWinners] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [filteredKnockedOuts, setFilteredKnockedOuts] = useState([]);
  const [knockedOutWinners, setKnockedOutWinners] = useState([]);

  const sorter = useCallback((arr) => {
    return arr.sort((playerOne, playerTwo) => {
      if (playerOne.guesses > playerTwo.guesses) {
        return 1;
      }
      if (playerOne.guesses < playerTwo.guesses) {
        return -1;
      }
      return 0;
    });
  }, []);

  useEffect(() => {
    if (players) {
      setRoundWinners(
        sorter(
          players.filter((player) => player.wonRound && !player.isKnockedOut)
        )
      );
      setFilteredPlayers(
        sorter(
          players.filter((player) => !player.isKnockedOut && !player.wonRound)
        )
      );
      setKnockedOutWinners(
        sorter(
          players.filter((player) => player.isKnockedOut && player.wonRound)
        )
      );
      setFilteredKnockedOuts(
        sorter(
          players.filter((player) => player.isKnockedOut && !player.wonRound)
        )
      );
    }
  }, [
    players,
    setFilteredPlayers,
    setFilteredKnockedOuts,
    setRoundWinners,
    sorter,
  ]);

  return (
    <ScoreContainer>
      <Box>
        <span className="players-container-title">Leader board</span>
        {roundWinners &&
          username &&
          [...roundWinners, ...filteredPlayers].map((playerSingle, i) => {
            return (
              <PlayerDisplay
                key={playerSingle.username + i}
                player={playerSingle}
                i={i}
                isYou={playerSingle.username === username}
                runningRound={runningRound}
              />
            );
          })}
      </Box>
      {knockedOutWinners.length + filteredKnockedOuts.length > 0 && (
        <Box sx={{ borderTop: "3px solid red", marginTop: "20px" }}>
          <span className="players-container-title">Knocked Out Players</span>
          {knockedOutWinners &&
            username &&
            [...knockedOutWinners, ...filteredKnockedOuts].map(
              (playerSingle, i) => {
                return (
                  <PlayerDisplay
                    key={playerSingle.username + i}
                    player={playerSingle}
                    i={i}
                    isYou={playerSingle.username === username}
                    runningRound={runningRound}
                  />
                );
              }
            )}
        </Box>
      )}
    </ScoreContainer>
  );
}

export default Score;
