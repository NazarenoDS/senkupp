import React, { useState, useEffect } from 'react';
import GameOver from './GameOver';

// Tablero inicial del juego Senku
const initialBoard = () => [
  [null, null, 1, 1, 1, null, null],
  [null, null, 1, 1, 1, null, null],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [null, null, 1, 1, 1, null, null],
  [null, null, 1, 1, 1, null, null],
];

// Verificar si el movimiento es válido
const isValidMove = (board, row, col, direction) => {
  if (direction === 'up') return row > 1 && board[row - 2][col] === 0 && board[row - 1][col] === 1;
  if (direction === 'down') return row < board.length - 2 && board[row + 2][col] === 0 && board[row + 1][col] === 1;
  if (direction === 'left') return col > 1 && board[row][col - 2] === 0 && board[row][col - 1] === 1;
  if (direction === 'right') return col < board[row].length - 2 && board[row][col + 2] === 0 && board[row][col + 1] === 1;
  return false;
};

// Realizar el movimiento en el tablero
const move = (board, row, col, direction) => {
  const newBoard = board.map(arr => arr.slice());

  if (direction === 'up') {
    newBoard[row][col] = 0;
    newBoard[row - 1][col] = 0;
    newBoard[row - 2][col] = 1;
  } else if (direction === 'down') {
    newBoard[row][col] = 0;
    newBoard[row + 1][col] = 0;
    newBoard[row + 2][col] = 1;
  } else if (direction === 'left') {
    newBoard[row][col] = 0;
    newBoard[row][col - 1] = 0;
    newBoard[row][col - 2] = 1;
  } else if (direction === 'right') {
    newBoard[row][col] = 0;
    newBoard[row][col + 1] = 0;
    newBoard[row][col + 2] = 1;
  }

  return newBoard;
};

// Verificar si el juego ha terminado
const checkEndGame = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === 1) {
        if (isValidMove(board, row, col, 'up') ||
            isValidMove(board, row, col, 'down') ||
            isValidMove(board, row, col, 'left') ||
            isValidMove(board, row, col, 'right')) {
          return false;
        }
      }
    }
  }
  return true;
};

const Game = () => {
  const [board, setBoard] = useState(initialBoard());
  const [selected, setSelected] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [remainingPieces, setRemainingPieces] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const countRemainingPieces = (board) => {
    return board.flat().filter(cell => cell === 1).length;
  };

  const handleCellClick = (row, col) => {
    if (selected) {
      const [selRow, selCol] = selected;
      let newBoard = null;

      if (row === selRow - 2 && col === selCol && isValidMove(board, selRow, selCol, 'up')) {
        newBoard = move(board, selRow, selCol, 'up');
      } else if (row === selRow + 2 && col === selCol && isValidMove(board, selRow, selCol, 'down')) {
        newBoard = move(board, selRow, selCol, 'down');
      } else if (col === selCol - 2 && row === selRow && isValidMove(board, selRow, selCol, 'left')) {
        newBoard = move(board, selRow, selCol, 'left');
      } else if (col === selCol + 2 && row === selRow && isValidMove(board, selRow, selCol, 'right')) {
        newBoard = move(board, selRow, selCol, 'right');
      }

      if (newBoard) {
        setBoard(newBoard);
        setSelected(null);

        // Verificar si el juego ha terminado
        if (checkEndGame(newBoard)) {
          setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
          setRemainingPieces(countRemainingPieces(newBoard));
          setGameOver(true);
        }
        return;
      }
    }

    if (board[row][col] === 1) {
      setSelected([row, col]);
    }
  };

  return (
    <div>
      {!gameOver ? (
      <div className='container'>
        <div className="game">
          <h2>Senku</h2>
          <div className="board">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${cell === null ? 'empty' : ''} ${selected && selected[0] === rowIndex && selected[1] === colIndex ? 'selected' : ''}`}
                  onClick={() => cell !== null && handleCellClick(rowIndex, colIndex)}
                >
                  {cell === 1 ? '⚫' : cell === 0 ? '⚪' : ''}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="instructions game">
          <h5>Instrucciones</h5>
          <p>
            El jugador debe mover una pieza (negra) por vez. <br/>
            Las piezas solo pueden moverse capturando mediante <br/>
            un "Salto" sobre otra (como en las damas). Solo se <br/>
            puede capturar en horizontal o en vertical, nunca <br/>
            en diagonal. Así, al principio, solo pocas tienen <br/>
            posibilidad de moverse, capturando una.
          </p>
          <button onClick={() => window.location.reload()} className="btn-restart">Reiniciar</button>
        </div>
      </div>
      ) : (
        <GameOver remainingPieces={remainingPieces} timeElapsed={timeElapsed} />
      )}
    </div>
  );
};

export default Game;
