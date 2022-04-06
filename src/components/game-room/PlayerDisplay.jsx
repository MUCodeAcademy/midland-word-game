import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
  borderRadius: "20px",
  height: "30px",
  padding: "2px",
  paddingLeft: "12px",
  paddingRight: "12px",
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
}));

const Container = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.light,
  borderRadius: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "2px",
  padding: "1px",
}));

const LeftContainer = styled(Box)(({ theme }) => ({
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "5px",
}));

const PlayerName = styled(Box)(({ theme }) => ({
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "bold",
  alignItems: "center",
  justifyContent: "space-between",
}));

function PlayerDisplay({ player, i, isYou, runningRound }) {
  return (
    <Container elevation={24}>
      <LeftContainer>
        <Item>{i + 1}</Item>
        <div style={{ textAlign: "center" }}>
          <PlayerName>
            {player.isHost ? "Host " : ""}
            <span style={isYou ? { textDecoration: "underline" } : {}}>{isYou ? "You" : player.username}</span>
          </PlayerName>
          <span>{player.lastGuess && (!player.wonRound || !runningRound) ? ` - ${player.lastGuess}` : " - guess"}</span>
        </div>
      </LeftContainer>
      <Item sx={player.wonRound ? { color: "yellow !important" } : {}}>{"Guesses " + player.guesses}</Item>
    </Container>
  );
}

export default PlayerDisplay;
