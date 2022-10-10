import { useEffect, useState } from "react";
import Axios from 'axios';
import logo from '../../logo.svg';
import Cards from '../Cards/Cards.js'
import './App.scss';

function App() {
  // Je crée mon state local
  // L'array de cartes récupéré depuis le back. Il est stocké dans cards et mis à jour grâce à setCards
  const [cards, setCards] = useState(null);

  // J'utilise le Hook d'effet useEffect de React, qui permet d'exécuter des instructions
  // à un moment précis du lifecycle du composant : à la fin du render.
  // Avec les Classes, on le remplacerait par componentDidMount, componentDidUpdate et componentWillUnmount.
  useEffect(() => {
    // Ma fonction asynchrone qui appelle mon back
    async function loadCards() {
      try {
        const response = await Axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}/cards`
        });
        // Si ca ne se passe pas bien, j'envoie un message d'erreur
        if (response.status !== 200) return console.error('ERROR');

        // Pour notre Memory, on a besoin de dupliquer nos cartes et de les
        // distribuer aléatoirement.

        // ajout d'un suffixe à mes fruits dupliqués pour avoir une key unique
        const prefixedFruits = response.data.data.map((fruit) => {
          return {
            ...fruit,
            name: `${fruit.name}-pair`,
          }
        });
        // Pour dupliquer mon array, j'utilise le spread operator.
        // /!\ Ici le spread operator suffit car mon array ne dispose que d'un niveau.
        // /!\ Pour les arrays disposant de plusieurs niveaux, on utilisera plutôt un reduce ou encore un flatMap.
        const duplicated = [...response.data.data, ...prefixedFruits];
        // J'update mon state local avec les données récupérées
        // tout en redistribuant aléatoirement les éléments.

        setCards(duplicated.sort(() => Math.random() - 0.5));
        console.log("La réponse API :", response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    // On exécute la fonction.
    loadCards();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory</h1>
      </header>
      {cards && <Cards cards={cards} />}
    </div>
  );
}

export default App;
