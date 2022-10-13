import { useState, useEffect } from "react";
import { nanoid } from "nanoid"; // lib pour générer un id safe et performant
import "./styles.scss";
import createGrid from "../../utils/createGrid";
import Line from "../Line/Line";

function Cards({ cards, game, matchedCards, setMatchedCards }) {
  // Ma grille dans laquelle je vais push mes lignes de cartes.
  const grid = createGrid(6, 6, cards);
  const [firstCard, setFirstCard] = useState(""); // On stocke la première carte retournée
  const [secondCard, setSecondCard] = useState(""); // On stocke la seconde carte retournée

  useEffect(() => {
    // On regarde si les 2 cartes retournées forment une paire.
    function isNameTheSame() {
      // On enleve le suffixe présent sur l'une des 2 cartes avant comparaison
      const first = firstCard.split("-pair")[0];
      const second = secondCard.split("-pair")[0];
      return first === second;
    }

    function computeGame() {
      // Si nos 2 cartes ne forment pas une paire, on réinitialise le state après 1 seconde,
      // le temps au user de mémoriser les cartes (pas trop longtemps quand même, on veut du challenge)
      if (!isNameTheSame()) {
        setTimeout(() => {
          setFirstCard(null);
          setSecondCard(null);
        }, 1000);
      } else {
        // Si nos 2 cartes forment une paire, on les ajoute dans notre state matchedCards
        setMatchedCards([...matchedCards, firstCard, secondCard]);
        // Puis on réinitialise le state pour pouvoir continuer la partie.
        setFirstCard(null);
        setSecondCard(null);
      }
    }

    // On lance la comparaison de la paire une fois la seconde carte retournée.
    if (secondCard) {
      computeGame();
    }

  }, [secondCard, firstCard, setMatchedCards, matchedCards]);

  return (
    <section className="cards">
      {grid.map((row) => {
        return (
          <Line
            key={nanoid()}
            game={game}
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
