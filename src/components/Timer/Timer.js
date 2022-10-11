import { useState, useEffect } from 'react';
import './styles.scss';

function Timer({ played }) {
  const [counter, setCounter] = useState(0);
  const timer = 60;

  useEffect(() => {
    if (counter <= timer) {
      setTimeout(() => setCounter(counter + 1), 1000);
    } else {
      setCounter("Bim bam boom");
    }
  }, [counter]);

  return (
    <>
      <div>Countdown: {counter}</div>
      <section className="timer_container">
        <div className="timer" style={{ width: `${100 - (100 / timer) * counter}%` }}></div>
      </section>
    </>
  );
}

export default Timer;
