import React, { useState } from 'react';

// Tablero inicial del juego Senku
const initialBoard = () => {
  return [
    [null, null, 1, 1, 1, null, null], // Las esquinas son null (vacías)
    [null, null, 1, 1, 1, null, null],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1], // El espacio vacío inicial es 0
    [1, 1, 1, 1, 1, 1, 1],
    [null, null, 1, 1, 1, null, null],
    [null, null, 1, 1, 1, null, null],
  ];
};

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
  const newBoard = board.map(arr => arr.slice()); // Copiar el tablero

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
        // Comprobar si hay algún movimiento válido para la ficha en (row, col)
        if (isValidMove(board, row, col, 'up') ||
            isValidMove(board, row, col, 'down') ||
            isValidMove(board, row, col, 'left') ||
            isValidMove(board, row, col, 'right')) {
          return false; // Hay al menos un movimiento válido, el juego no ha terminado
        }
      }
    }
  }
  return true; // No hay movimientos válidos, el juego ha terminado
};

const Game = ({ endGame }) => {
  const [board, setBoard] = useState(initialBoard()); // Estado del tablero
  const [selected, setSelected] = useState(null); // Ficha seleccionada

  // Manejar clics en las celdas del tablero
  const handleCellClick = (row, col) => {
    if (selected) {
      // Si ya hay una ficha seleccionada, intentamos moverla
      const [selRow, selCol] = selected;
      let newBoard = null;

      // Verificar las posibles direcciones
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
        setBoard(newBoard); // Actualizar el estado del tablero
        setSelected(null); // Deseleccionar la ficha después de moverla

        // Comprobar si el juego ha terminado
        if (checkEndGame(newBoard)) {
          endGame(); // Si no hay más movimientos válidos, termina el juego
        }
        return;
      }
    }

    // Si no hay una ficha seleccionada, seleccionamos la nueva ficha
    if (board[row][col] === 1) {
      setSelected([row, col]);
    }
  };

  return (
    <div className="game">
      <h2>Senku</h2>
      <div className="board">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell === null ? 'empty' : ''} ${selected && selected[0] === rowIndex && selected[1] === colIndex ? 'selected' : ''}`}
              onClick={() => cell !== null && handleCellClick(rowIndex, colIndex)}
            >
              {cell === 1 ? '⚫' : cell === 0 ? '⚪' : ''}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Game;
