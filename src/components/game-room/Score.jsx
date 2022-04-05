import React, { useCallback, useEffect, useState } from "react";
import PlayerDisplay from "./PlayerDisplay";

function Score({ players, player }) {
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
      setRoundWinners(sorter(players.filter((player) => player.wonRound && !player.isKnockedOut)));
      setKnockedOutWinners(sorter(players.filter((player) => player.isKnockedOut && player.wonRound)));
      setFilteredPlayers(sorter(players.filter((player) => !player.isKnockedOut && !player.wonRound)));
      setFilteredKnockedOuts(sorter(players.filter((player) => player.isKnockedOut && !player.wonRound)));
    }
  }, [players, setFilteredPlayers, setFilteredKnockedOuts, setRoundWinners, sorter]);

  return (
    <div className="score-container">
      <div className="players-container">
        <span className="players-container-title">Round Winners</span>
        {roundWinners &&
          player &&
          roundWinners.map((playerSingle, i) => {
            return (
              <PlayerDisplay
                key={playerSingle.username + i}
                player={playerSingle}
                i={i}
                isHost={playerSingle.isHost}
                isYou={playerSingle.username === player.username}
              />
            );
          })}
      </div>
      <div className="players-container">
        <span className="players-container-title">Players Still in</span>
        {filteredPlayers &&
          player &&
          filteredPlayers.map((playerSingle, i) => {
            return (
              <PlayerDisplay
                key={playerSingle.username + i}
                player={playerSingle}
                i={i}
                isHost={playerSingle.isHost}
                isYou={playerSingle.username === player.username}
              />
            );
          })}
      </div>
      <div className="players-container">
        <span className="players-container-title">Knocked Out Round Winners</span>
        {knockedOutWinners &&
          player &&
          knockedOutWinners.map((playerSingle, i) => {
            return (
              <PlayerDisplay
                key={playerSingle.username + i}
                player={playerSingle}
                i={i}
                isHost={playerSingle.isHost}
                isYou={playerSingle.username === player.username}
              />
            );
          })}
      </div>
      <div className="players-container">
        <span className="players-container-title">Knocked Out Players</span>
        {filteredKnockedOuts &&
          player &&
          filteredKnockedOuts.map((playerSingle, i) => {
            return (
              <PlayerDisplay
                key={playerSingle.username + i}
                player={playerSingle}
                i={i}
                isHost={playerSingle.isHost}
                isYou={playerSingle.username === player.username}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Score;
