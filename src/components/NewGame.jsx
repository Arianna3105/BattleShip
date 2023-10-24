import React from "react";
import PropTypes from "prop-types";

const NewGame = ({ setAppStatus, setWinner, theme }) => {
  const onStartGame = () => {
    setAppStatus("game");
    setWinner(null);
  };

  return (
    <div>
      <div className="new-game" data-theme={theme}>
        <h1>Rules for BattleShip</h1>
        <div>
          <h3 className="rules">Game Objective</h3>
          <p className="rul-text">
            The object of Battleship is to try and sink all of the other
            player's before they sink all of your ships. All of the other
            player's ships are somewhere on his/her board. You try and hit them
            by calling out the coordinates of one of the squares on the board.
            The other player also tries to hit your ships by calling out
            coordinates. Neither you nor the other player can see the other's
            board so you must try to guess where they are. Each board in the
            physical game has two grids: the lower (horizontal) section for the
            player's ships and the upper part (vertical during play) for
            recording the player's guesses.
          </p>

          <h3 className="rules">Starting a New Game</h3>
          <p className="rul-text">
            Each player places the 6 ships somewhere on their board. The ships
            can only be placed vertically or horizontally. Diagonal placement is
            not allowed. No part of a ship may hang off the edge of the board.
            Ships may not overlap each other. No ships may be placed on another
            ship. Once the guessing begins, the players may not move the ships.
          </p>

          <h3 className="rules">Playing the Game</h3>
          <p className="rul-text">
            Player's take turns guessing by calling out the coordinates.
          </p>
        </div>
      </div>
      <button className="new-game-btn star-btn" onClick={onStartGame}>
        GAME
      </button>
    </div>
  );
};

export default NewGame;

NewGame.propTypes = {
  setAppStatus: PropTypes.func.isRequired,
  setWinner: PropTypes.func.isRequired,
};
