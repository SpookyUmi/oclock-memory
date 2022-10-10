import { useState, useEffect } from 'react';
import './styles.scss';

function Line({ row }) {
  //TODO remonter la déclaration du state au composant parent ()
  const [firstCard, setFirstCard] = useState('');
  const [secondCard, setSecondCard] = useState('');
  const [flippedCards, setFlippedCards] = useState(null);

  function isNameTheSame() {
    const first = firstCard.split("-pair")[0];
    const second = secondCard.split("-pair")[0];
    return first === second;
  }
  //TODO si les cartes match, je push les 2 names dans un array matchedCards (à initier dans le parent)

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
            //TODO includes avec matchedCards
            className={`card ${firstCard === card.name || secondCard === card.name ? 'active' : 'inactive'}`}
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
