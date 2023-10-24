import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../style/Game.css";
import GameBoard from "./GameBoard";
import Pause from "./Pause/Pause";

import { PiPauseThin } from "react-icons/pi";

const Game = (props, { theme }) => {
  const { player, opponent } = props;
  const [isGameReady, setGameReady] = useState(false);
  const [board, setBoard] = useState([...player.gameBoard.board]);
  const [opponentBoard, setOpponentBoard] = useState([
    ...opponent.gameBoard.board,
  ]);
  const [EnemyShipCount, setEnemyShipCount] = useState(
    opponent.gameBoard.shipCount
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    handlePlayerShipDisplay();
  }, [board]);

  useEffect(() => {
    handleComputerShipDisplay();
  }, [EnemyShipCount]);

  const onPlaceRandomly = () => {
    onResetBoard();
    player.gameBoard.placeShipsAtRandom();
    setBoard([...player.gameBoard.board]);
  };

  const onFlipShips = () => {
    player.gameBoard.ships.forEach((ship) => {
      if (!ship.onBoard) player.gameBoard.changeShipDirection(ship);
    });
    setBoard([...player.gameBoard.board]);
    document.querySelector(".ship-wrapper").classList.toggle("flipped");
  };

  const onResetBoard = () => {
    player.gameBoard.makeBoard();
    player.gameBoard.getShips();
    setBoard([...player.gameBoard.board]);
  };

  const onResetBoardClear = () => {
    player.gameBoard.makeBoard();
    player.gameBoard.getShips();
    opponent.gameBoard.makeBoard();
    opponent.gameBoard.getShips();
    setBoard([...player.gameBoard.board]);
    setBoard([...opponent.gameBoard.board]);
  };

  const onResetBoardClearGame = () => {
    player.gameBoard.makeBoard(false);
    player.gameBoard.getShips(false);
    opponent.gameBoard.makeBoard(false);
    opponent.gameBoard.getShips(false);
    setBoard([...player.gameBoard.board]);
    setBoard([...opponent.gameBoard.board]);
  };

  const onPlaceShip = (e) => {
    const y = e.target.dataset.cord.split(",")[0];
    const x = e.target.dataset.cord.split(",")[1];
    const shipID = e.dataTransfer.getData("ship");
    const ship = player.gameBoard.ships[shipID - 1];
    player.gameBoard.placeShip(ship, x, y);
    setBoard([...player.gameBoard.board]);
  };

  const onStartGame = () => {
    if (player.gameBoard.isReady) setGameReady(true);
  };

  const onMakeMove = (e) => {
    const y = e.target.dataset.cord.split(",")[0];
    const x = e.target.dataset.cord.split(",")[1];
    if (player.makeMove(opponent, x, y) === true) {
      setOpponentBoard([...opponent.gameBoard.board]);
      setEnemyShipCount(opponent.gameBoard.shipCount);
      if (opponent.gameBoard.isGameOver) {
        onEndGame(player);
      }
      onAIMove();
    }
  };

  const onAIMove = () => {
    opponent.makeAIMove(player, false);
    setBoard([...player.gameBoard.board]);
    // console.table(board);
    if (player.gameBoard.isGameOver) {
      onEndGame(opponent);
    }
  };

  const onEndGame = (winner) => {
    setTimeout(() => {
      props.setWinner(winner);
      props.setAppStatus("announcer");
    }, 500);
  };

  const handlePlayerShipDisplay = () => {
    player.gameBoard.ships.map((ship) => {
      mountShip(player, ship);
    });
  };

  const handleComputerShipDisplay = () => {
    opponent.gameBoard.ships.map((ship) => {
      if (ship.isSunk() === true) {
        mountShip(opponent, ship);
      }
    });
  };

  const mountShip = (owner, ship) => {
    if (ship.onBoard) {
      const cords = [ship.coordinates[1], ship.coordinates[0]];
      const boardDiv = document.querySelector(`.${owner.side}`);
      const startingCell = boardDiv.querySelector(`div[data-cord="${cords}"]`);
      if (!startingCell.querySelector(".ship-img-grid")) {
        const shipImg = document.createElement("img");
        shipImg.src =
          // eslint-disable-next-line no-undef
          process.env.PUBLIC_URL + `/images/${owner.side}${ship.id}.png`;
        shipImg.alt = `ship-${owner.side}${ship.id}`;
        shipImg.classList.add(`ship-img-grid`);
        shipImg.classList.add(ship.direction);
        shipImg.targetAble = false;
        startingCell.appendChild(shipImg);
      }
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="container" data-theme={theme}>
      {isGameReady ? (
        <div className="game">
          <GameBoard player={player} board={board} isGameReady={isGameReady} />
          <a href="/Game">
            <button className="star-btn" onClick={onResetBoardClear}>
              Start new Game
            </button>
          </a>
          <div>
            <button className="star-btn" variant="dark" onClick={handleShow}>
              <PiPauseThin />
            </button>
            <Pause show={show} onHide={handleClose} />
          </div>

          <GameBoard
            player={opponent}
            board={opponentBoard}
            onMakeMove={onMakeMove}
            isGameReady={isGameReady}
          />
        </div>
      ) : (
        <div className="game">
          <GameBoard
            player={player}
            board={board}
            isGameReady={isGameReady}
            setGameReady={setGameReady}
            onFlipShips={onFlipShips}
            onPlaceShip={onPlaceShip}
            onPlaceRandomly={onPlaceRandomly}
            onResetBoard={onResetBoard}
            onResetBoardClear={onResetBoardClear}
            onStartGame={onStartGame}
            // makeRandomAIMove={makeRandomAIMove}
            // onAttacRandomly={onAttacRandomly}
            onResetBoardClearGame={onResetBoardClearGame}
          />
        </div>
      )}
    </div>
  );
};

export default Game;

Game.propTypes = {
  player: PropTypes.object,
  board: PropTypes.array,
  setBoard: PropTypes.func,
  opponent: PropTypes.object,
  opponentBoard: PropTypes.array,
  setOpponentBoard: PropTypes.func,
  PlayerOne: PropTypes.object,
  PlayerTwo: PropTypes.object,
  gameReady: PropTypes.bool,
  setGameReady: PropTypes.func,
  winner: PropTypes.object,
  setWinner: PropTypes.func,
  //   setAppStatus: PropTypes.func,
  setAppStatus: PropTypes.func.isRequired,
  //   makeSmartAIMove: PropTypes.func,
  onStartGame: PropTypes.func,
};

Game.defaultProps = {
  setBoard: () => {},
  setOpponentBoard: () => {},
  gameReady: false,
  setGameReady: () => {},
  setWinner: () => {},
  setAppStatus: () => {},
  onStartGame: () => {},
};
