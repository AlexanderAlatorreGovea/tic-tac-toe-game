import React, { useState } from "react";
import "./App.css";

const Cell = ({ cell, onClick }) => {
  return (
    <li onClick={() => onClick()} className="ticTacToe__cell">
      {cell}
    </li>
  );
};

function App() {
  const NOUGHT = "O";
  const CROSS = "X";
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [grid, setGrid] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(CROSS);

  const checkForWinner = (gridShallowCopy, playersTurn) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (
        gridShallowCopy[a] &&
        gridShallowCopy[a] === gridShallowCopy[b] &&
        gridShallowCopy[a] === gridShallowCopy[c]
      ) {
        alert(
          `The winner is ${playersTurn === CROSS ? "Player One" : "Player Two"}`
        );
      }
    }
  };

  const alertWinner = (gridShallowCopy, index, playersTurn) => {
    if (gridShallowCopy[index] === CROSS || gridShallowCopy[index] === NOUGHT) {
      return;
    }

    gridShallowCopy[index] = playersTurn;

    checkForWinner(gridShallowCopy, playersTurn);

    playersTurn = playersTurn === CROSS ? NOUGHT : CROSS;

    return playersTurn;
  };

  const setGridItem = (index) => {
    const gridShallowCopy = grid.slice();
    let playersTurn = player;

    const playersCurrentTurn = alertWinner(
      gridShallowCopy,
      index,
      playersTurn
    );

    setGrid(gridShallowCopy);
    setPlayer(playersCurrentTurn);
  };

  return (
    <div className="ticTacToe">
      <h1 className="ticTacToe__title">React Tic Tac Toe</h1>
      <ul className="ticTacToe__grid">
        {grid.map((cell, index) => (
          <Cell key={index} cell={cell} onClick={() => setGridItem(index)} />
        ))}
      </ul>
    </div>
  );
}

export default App;
