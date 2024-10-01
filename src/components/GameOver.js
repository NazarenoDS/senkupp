import React, { useState } from 'react';

const GameOver = ({ resetGame, saveResult }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    saveResult(name);
  };

  return (
    <div className="game-over">
      <h2>Fin del juego</h2>
      <p>Introduce tu nombre para guardar el resultado:</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
      <button onClick={handleSubmit}>Guardar Resultado</button>
      <button onClick={resetGame}>Volver a jugar</button>
    </div>
  );
};

export default GameOver;
