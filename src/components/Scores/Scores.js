import "./styles.scss";

// On affiche ici les meilleurs scores, avec un peu de style✨
function Scores({ bestScores }) {

  return (
    <>
      <h2>Meilleurs scores ✨</h2>
      <section className="scores">
        {bestScores?.map((score, index) => <span key={score} className={`scores_element position_${index}`}>{score}</span>)}
      </section>
    </>
  );
}

export default Scores;
