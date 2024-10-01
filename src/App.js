import React, { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import GameOver from './components/GameOver';
import './App.css';


const App = () => {
  const [stage, setStage] = useState('home'); // Puede ser 'home', 'game', 'gameover'
  const [result, setResult] = useState(null);

  const startGame = () => setStage('game');
  const endGame = () => setStage('gameover');
  const resetGame = () => setStage('home');

  const saveResult = (name) => {
    // Guardar resultado en Google Sheets
    setResult({ name, time: 10, remainingPieces: 5 }); // Placeholder
  };

  return (
    <div className="app">
      {stage === 'home' && <Home startGame={startGame} />}
      {stage === 'game' && <Game endGame={endGame} />}
      {stage === 'gameover' && (
        <GameOver resetGame={resetGame} saveResult={saveResult} />
      )}
    </div>
  );
};

export default App;
