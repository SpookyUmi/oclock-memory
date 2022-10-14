import { useEffect, useState } from "react";
import Axios from "axios";
import Cards from "../Cards/Cards.js"
import "./App.scss";
import Timer from "../Timer/Timer.js";
import Scores from "../Scores/Scores.js";
// à remplacer par REACT_APP_API_URL en local
const APIURL = process.env.REACT_APP_API_PROD;

function App() {
  // Je crée mon state local
  const [cards, setCards] = useState(null); // L'array de cartes récupéré depuis le back. Il est stocké dans cards et mis à jour grâce à setCards
  const [bestScores, setBestScores] = useState(null); // les 3 meilleurs scores enregistrés jusque-là
  const [playerScore, setPlayerScore] = useState(null); // le score du joueur actuel (qui s'affiche après sa partie)
  const [game, setGame] = useState(false); // Un state pour commencer une partie et lancer le timer.
  const [gameStatus, setGameStatus] = useState("pending"); // Le statut de la partie : "pending" par défaut, "won" quand on gagne, "lost" quand on perd.
  const [matchedCards, setMatchedCards] = useState([]); // L'array où on stocke toutes les paires trouvées.
  const [score, setScore] = useState(0); // Si on gagne, on stocke notre temps ici.
  // On définit le temps que dure une partie (en sec)
  const timer = 150;

  // Une fonction pour reset le jeu à l'état initial.
  // Gagner ou perdre termine la partie, on réinitialise le state.
  function resetGame(status) {
    // Déclenchement d'un alert quand on gagne ou quand on perd.
    alert(status === "won" ? "Vous avez gagné !!!" : "Vous avez perdu...");
    setGame(false);
    setMatchedCards([]);
    setGameStatus("pending");
    setScore(0);
  }

  // J'utilise le Hook d'effet useEffect de React, qui permet d'exécuter des instructions
  // à un moment précis du lifecycle du composant : à la fin du render.
  // Avec les Classes, on le remplacerait par componentDidMount, componentDidUpdate et componentWillUnmount.
  useEffect(() => {
    // Ma fonction asynchrone appelle mon back et recoit les cartes
    async function loadCards() {
      try {
        const response = await Axios({
          method: "GET",
          url: `${APIURL}/cards`
        });
        // Si mon back me renvoie autre chose qu'une 200, j'affiche un message d'erreur en console
        if (response.status !== 200) return console.error("ERROR", response.error);

        // Pour le Memory, on a besoin de dupliquer nos cartes pour créer des paires.
        // On ajoute un suffixe aux fruits dupliqués pour avoir une key unique une fois sur le front.
        const prefixedFruits = response.data.cards.map((fruit) => {
          return {
            ...fruit,
            name: `${fruit.name}-pair`,
          }
        });
        // Pour dupliquer mon array, j'utilise le spread operator.
        // /!\ Ici le spread operator suffit car mon array ne dispose que d'un niveau.
        // /!\ Pour les arrays disposant de plusieurs niveaux, on utilisera plutôt un reduce ou encore un flatMap.
        const duplicated = [...response.data.cards, ...prefixedFruits];

        // J'update mon state local avec les données récupérées
        // tout en redistribuant aléatoirement les éléments.
        setCards(duplicated.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.log(error);
      }
    }

    async function loadScores() {
      try {
        const response = await Axios({
          method: "GET",
          url: `${APIURL}/scores`
        });
        // Si ca ne se passe pas bien, j'envoie un message d'erreur
        if (response.status !== 200) return console.error("ERROR", response.error);

        setBestScores(response.data.formattedBestScores);
      } catch (error) {
        console.log(error);
      }
    }
    // On exécute la fonction pour recevoir nos cartes et les mélanger à chaque fin de render de notre app.
    loadCards();
    loadScores();

    // On stocke nos scores en DB et on les update sur le front
    async function stockScore() {
      try {
        const response = await Axios({
          method: "POST",
          url: `${APIURL}/scores`,
          data: {
            score
          }
        });
        if (response.status !== 200) return console.error("ERROR", response.error);

        // Je récupère le score du joueur et update mon state
        setPlayerScore(response.data.formattedScore);

      } catch (error) {
        console.log(error);
      }
    }

    // J'appelle resetGame() quand la partie est finie.
    if (gameStatus === "won") {
      stockScore();
      resetGame(gameStatus);
    } else if (gameStatus === "lost") {
      resetGame(gameStatus);
    }
    // J'ajoute ici mes dépendances qui déclencheront un re-render à leur changement.
  }, [score, gameStatus]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        <Scores bestScores={bestScores} />
      </header>
      {!cards && <p>Le serveur se réveille, les cartes arrivent...</p>}
      {playerScore && <p>Votre score de la partie précédente : {playerScore}</p>}
      {cards && (
        <>
          <button onClick={() => {
            setGame(true);
          }} className={`${game ? "button_inactive" : "button_active"}`}>Lancer une partie</button>
          <Cards
            game={game}
            cards={cards}
            matchedCards={matchedCards}
            setMatchedCards={setMatchedCards}
          />
          <Timer
            game={game}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            setScore={setScore}
            matchedCards={matchedCards}
            timer={timer}
            score={score}
            numberOfCards={cards?.length}
          />
        </>
      )}
    </div>
  );
}

export default App;
