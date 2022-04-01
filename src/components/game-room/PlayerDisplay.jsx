import React from "react";

function PlayerDisplay({ player, i, isHost, isYou }) {
  //maybe change Host to a nice host icon
  return (
    <div className={"player " + (isYou ? "local-player" : "")}>
      <span>{`${i + 1}: `}</span>
      <span>{player.username}</span>
      <span>{` - ${player.guesses} | guesses`}</span>
      {!player.wonRound && player.lastGuess && <span>{` - ${player.lastGuess}`}</span>}
      {isHost && <span> Host</span>}
    </div>
  );
}

export default PlayerDisplay;
