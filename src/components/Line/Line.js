import './styles.scss';

function Line({ row, firstCard, setFirstCard, secondCard, setSecondCard, matchedCards }) {
  // useEffect(() => {
  // if (!flippedCards) {
  //   setFlippedCards([card.name]);
  // } else {
  //   setFlippedCards([...flippedCards, card.name])
  // }
  //   if (flippedCards && flippedCards.length === 2) {
  //     setTimeout(() => {
  //       setFlippedCards(null)
  //     }, 500)
  //   }
  // }, [flippedCards]);

  // flippedCards?.includes(card.name) &&

  return (
    <section className="line">
      {row.map((card) => {
        return (
          <article
            id={card._id}
            key={card.name}
            // commenter la ternaire ici
            className={`card ${matchedCards.includes(card.name) || firstCard === card.name || secondCard === card.name ? 'active' : 'inactive'}`}
            onClick={() => {
              if (firstCard && secondCard) {
                setFirstCard(card.name);
                setSecondCard(null);
              } else if (firstCard) {
                if (firstCard === card.name) return;
                setSecondCard(card.name);
              } else {
                setFirstCard(card.name);
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
