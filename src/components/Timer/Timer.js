import { useEffect, useState } from 'react';
import './styles.scss';

function Timer({ game, setGameStatus, score, timer, matchedCards, setScore, setLoose, numberOfCards }) {
  // On crée un compteur
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // On déclenche le timer uniquement si une partie est lancée.
    if (game) {
      // Tant qu'on a pas trouvé toutes les paires et que le temps n'est pas écoulé, le timer et la partie continuent.
      if (matchedCards.length !== numberOfCards && counter <= timer) {
        setTimeout(() => setCounter(counter + 1), 1000); // On incrémente notre compteur chaque seconde.
      } else if (matchedCards.length === numberOfCards && counter < timer) {
        setScore(counter); // Si on a trouvé toutes les paires avant la fin du timer, on update le score
        setGameStatus("won"); // mais surtout, on gagne !
      } else {
        setGameStatus("lost"); // Si on n'a pas trouvé toutes les paires, et que le temps est écoulé, on perd...
      }
    } else {
      setCounter(0); // On reset le compteur quand la partie est finie.
    }
  }, [game, setGameStatus, counter, setCounter, timer, matchedCards, score, setScore, setLoose]);

  return (
    <>
      <div>Countdown: {counter}</div>
      <section className="timer_container">
        {/* Un petit calcul pour que notre compteur s'écoule visuellement */}
        <div className="timer" style={{ width: `${100 - (100 / timer) * counter}%` }}></div>
      </section>
    </>
  );
}

export default Timer;
