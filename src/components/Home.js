import React from 'react';

const Home = ({ startGame }) => {
  return (
    <div className="home">
      <h1>Bienvenido a Senku</h1>
      <button onClick={startGame} className="btn-play">Play</button>
    </div>
  );
};

export default Home;
