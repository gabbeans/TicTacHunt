import React, { useState } from "react";
import "./App.css";

// Square component
const Square = ({ value, onClick }) => {
  return (
    <button className={`square ${value}`} onClick={onClick}>
      {value}
    </button>
  );
};

// Board component
const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
// App component
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
// History Tracking
const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = newHistory[newHistory.length - 1];
    const squares = [...currentSquares];
    // Check if there is a winner or if the square is already filled
    if (winner || squares[i]) {
      return;
    }
    // Update the square
    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([squares]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };
  // Jump to a specific move
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  // Delete Move History
  const deleteHistory = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
  };
  // Display the moves
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  // Display the status
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  // Display the game
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol className="moves-list">{moves}</ol>
        {winner && (
          <button className="button" onClick={deleteHistory}>
            Delete Move History
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
