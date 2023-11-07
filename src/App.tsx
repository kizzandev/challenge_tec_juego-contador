import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [score, setScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);

  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const [cuentaRegresiva, setcuentaRegresiva] = useState<number>(0);
  const [cuentaRegresivaText, setcuentaRegresivaText] =
    useState<string>('Preparados');

  useEffect(() => {
    if (countdown > 0 && cuentaRegresiva === 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (gameStarted && countdown === 0) {
      setGameStarted(false);
      setcuentaRegresivaText('Preparados');
      setMaxScore((prevMaxScore) =>
        score > prevMaxScore ? score : prevMaxScore
      );
    }
  }, [countdown, gameStarted]);

  useEffect(() => {
    if (cuentaRegresiva > 0) {
      const interval = setInterval(() => {
        setcuentaRegresivaText((prevText) => {
          if (prevText === 'Preparados') return 'Listos';
          if (cuentaRegresivaText === 'Listos') return 'Ya';
          return prevText;
        });

        setcuentaRegresiva((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (cuentaRegresivaText === 'Ya') {
      setCountdown(5);
      setGameStarted(true);
    }
  }, [cuentaRegresiva, cuentaRegresivaText]);

  function handleClick() {
    if (gameStarted) setScore((prev) => prev + 1);
  }

  async function handleStart() {
    if (!gameStarted) {
      setScore(0);
      setcuentaRegresivaText('Preparados');
      setcuentaRegresiva(3);
    }
  }

  return (
    <>
      <div className="wrapper">
        <div>
          <h1 className="text-center">JuegoContador</h1>
          <h3 className="text-center">Record: {maxScore}</h3>
          <p className="text-center">Puntaje: {score}</p>
          {<p className="text-center">Tiempo: {countdown}</p>}
        </div>
        <button
          id="initBtn"
          className={gameStarted ? 'btn-disabled' : ''}
          onClick={handleStart}
          disabled={cuentaRegresiva > 0 || gameStarted}
        >
          Iniciar
          {cuentaRegresiva !== 0 && (
            <p className="cuenta-regresiva">{cuentaRegresivaText}</p>
          )}
        </button>
        <button
          id="gameBtn"
          className={gameStarted ? '' : 'btn-disabled'}
          onClick={handleClick}
          disabled={!gameStarted}
        >
          Click Me!
        </button>
      </div>
    </>
  );
}
