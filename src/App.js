import {useEffect, useState} from "react";
import Axios from 'axios';
import logo from './logo.svg';
import './App.scss';

function App() {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    async function loadCards() {
      try {
        const response = await Axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}/cards`
        });
        if (response.status !== 200) return console.error('ERROR');
        setCards(response.data);
        console.log("La réponse API :", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadCards();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="card" ></div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
