import React, { useState } from 'react';

const GameOver = ({ remainingPieces, timeElapsed }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = () => {
    if (name && email) {
      setIsSubmitting(true);

      const result = {
        name,
        email,
        remainingPieces,
        timeElapsed,
      };

      fetch('https://script.google.com/macros/s/AKfycbxl0NW0XqdJb0Y2h305mYJ_qFhw-nQ4oFLrL_e1ywLOu0ADn7BH7CKbr5qS99zOcaRn/exec', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.text())
        .then(data => {
          console.log("Resultado guardado:", data);
          setSubmissionStatus('success');
        })
        .catch(error => {
          console.error("Error al guardar:", error);
          setSubmissionStatus('error');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="game-over">
      <h2>¡Juego Terminado!</h2>
      <p>Te quedan {remainingPieces} fichas.</p>
      <p>Tiempo de juego: {timeElapsed} segundos.</p>
      <div>
        <label>Nombre:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Guardar Resultado'}
      </button>

      {submissionStatus === 'success' && <p className="message success">¡Resultado guardado con éxito!</p>}
      {submissionStatus === 'error' && <p className="message error">Error al guardar el resultado. Intenta nuevamente.</p>}
    </div>
  );
};

export default GameOver;
