import { useEffect, useState } from 'react';
import './styles.scss';

function Timer({ game, win, score, setWin, timer, matchedCards, setScore, setLoose }) {
  // On crée un compteur
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // On déclenche le timer uniquement si une partie est lancée.
    if (game) {
      // Tant qu'on a pas trouvé toutes les paires et que le temps n'est pas écoulé, le timer et la partie continuent.
      if (matchedCards.length !== 36 && counter < timer) {
        // On incrémente notre compteur chaque seconde.
        setTimeout(() => setCounter(counter + 1), 1000);
        // Si on a trouvé toutes les paires avant que le temps ne soit écoulé,
        // on gagne ! Et on update le state avec notre score.
      } else if (matchedCards.length === 36 && counter < timer) {
        setWin(true);
        setScore(counter);
        // Si on n'a pas trouvé toutes les paires, et que le temps est écoulé, on perd...
      } else {
        setLoose(true);
      }
    } else {
      // On reset le compteur quand la partie est finie.
      setCounter(0);
    }
  }, [game, counter, win, setCounter, timer, matchedCards, score, setScore, setWin, setLoose]);

  return (
    <>
      <div>Countdown: {counter}</div>
      <section className="timer_container">
        {/* Un petit calcul pour que notre compteur s'écoule */}
        <div className="timer" style={{ width: `${100 - (100 / timer) * counter}%` }}></div>
      </section>
    </>
  );
}

export default Timer;
