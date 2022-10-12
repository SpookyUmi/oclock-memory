import './styles.scss';

function Line({ row, game, firstCard, setFirstCard, secondCard, setSecondCard, matchedCards }) {

  // Fonction pour vérifier dans quel cas retourner une carte.
  function canDisplayCard(cardName) {
    //
    return matchedCards.includes(cardName) || firstCard === cardName || secondCard === cardName;
  }

  return (
    <section className="line">
      {row.map((card) => {
        return (
          <article
            id={card._id}
            key={card.name}
            // commenter la ternaire ici
            className={`card ${game && canDisplayCard(card.name) ? 'active' : 'inactive'}`}
            onClick={() => {
              if (game) {
                if (firstCard && secondCard) {
                  setFirstCard(card.name);
                  setSecondCard(null);
                } else if (firstCard) {
                  if (firstCard === card.name) {
                    return;
                  }
                  setSecondCard(card.name);
                } else {
                  setFirstCard(card.name);
                }
              }
            }}
            style={{ backgroundPositionY: `-${card.offset * 100}px` }}
          ></article>
        )
      }
      )}
    </section>
  );
}

export default Line;
