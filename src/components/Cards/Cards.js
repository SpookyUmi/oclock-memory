import { useState, useEffect } from 'react';
// lib pour générer un id safe et performant.
import { nanoid } from 'nanoid';
import './styles.scss';
import createGrid from '../../utils/createGrid';
import Line from '../Line/Line';

function Cards({ cards }) {
  // Mon array grid, ma grille dans laquelle je vais push mes lignes de cartes.
  const grid = createGrid(6, 6, cards);
  // commenter ici
  const [firstCard, setFirstCard] = useState('');
  const [secondCard, setSecondCard] = useState('');
  const [matchedCards, setMatchedCards] = useState([]);
  //TODO : function computeGame()
  //TODO elle se sert de isNameTheSame() pour attribuer les cartes ou non à l'array matchedCards
  //TODO si les cartes match, je push les 2 names dans un array matchedCards (à initier dans le parent)
  //TODO Si les cartes ne match pas, je set un timeOut puis les retourne
  //TODO : pendant le compute, bloquer le fait de pouvoir ouvrir d'autres cartes.

  useEffect(() => {
    function isNameTheSame() {
      // commenter ici
      const first = firstCard.split("-pair")[0];
      const second = secondCard.split("-pair")[0];
      return first === second;
    }

    function computeGame() {
      // commenter ici
      if (!isNameTheSame()) {
        setTimeout(() => {
          setFirstCard(null);
          setSecondCard(null);
        }, 1500);
      } else {
        // commenter ici
        setMatchedCards([...matchedCards, firstCard, secondCard]);
        setFirstCard(null);
        setSecondCard(null);
      }
    }

    // commenter ici
    if (secondCard) {
      computeGame();
    }

    //TODO créer un timer :
    //TODO la personne gagne dans le cas où matchedCards.length === 36 avant la fin du timer.
    //TODO si la personne gagne, arrêter le timer, enregistrer le temps et envoyer un alert "gagné"
    //TODO La personne perd dans le cas où matchedCards.length !== 36 à la fin du timer.
    //TODO Après que la personne ait gagné ou que le timer soit terminé, remonter un state "partie terminée" au parent
    //TODO afin de shuffle à nouveau les cartes.
    //TODO créer un bouton "commencer" qui lance le timer.
    // if (matchedCards.length === 36) {
    //   alert("Vous avez gagné !!! ✨");
    //   setTimeout(() => {
    //     setMatchedCards([]);
    //   }, 1000);
    // }

  }, [secondCard, firstCard, matchedCards]);

  return (
    <section className="cards">
      {grid.map((row) => {
        return (
          <Line
            key={nanoid()}
            row={row}
            firstCard={firstCard}
            setFirstCard={setFirstCard}
            secondCard={secondCard}
            setSecondCard={setSecondCard}
            matchedCards={matchedCards}
          />
        )
      })}
    </section>
  );
}

export default Cards;
