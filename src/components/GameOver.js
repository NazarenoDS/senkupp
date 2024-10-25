const GameOver = ({ remainingPieces, timeElapsed }) => {

  // Función para generar el enlace de compartir en Twitter
  const shareOnTwitter = () => {
    const tweetText = `¡He terminado el juego Senku con ${remainingPieces} fichas restantes y un tiempo de ${timeElapsed} segundos! ¿Puedes superarme?  https://senkupp.vercel.app`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="game-over">
      <h2>¡Juego Terminado!</h2>
      <p>Te quedan <strong>{remainingPieces}</strong> fichas.</p>
      <p>Tiempo de juego: <strong>{timeElapsed}</strong> segundos.</p>
      
      <button onClick={shareOnTwitter} className="share-btn">
        Compartir en Twitter
      </button>

      <button onClick={() => window.location.reload()} className="restart-btn">
        Volver a Jugar
      </button>
    </div>
  );
};

export default GameOver;
