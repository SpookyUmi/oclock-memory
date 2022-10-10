import { useState } from 'react';
// lib pour générer un id safe et performant.
import { nanoid } from 'nanoid';
import './styles.scss';
import createGrid from '../../utils/createGrid';
import Line from '../Line/Line';

function Cards({ cards }) {
  // Mon array grid, qui sera ma grille dans laquelle je vais push mes lignes de cartes.
  const [grid, setGrid] = useState(createGrid(6, 6, cards));
  console.log("GROR", grid);

  return (
    <section className="cards">
      {grid.map((row) => {
        return (
          <Line key={nanoid()} row={row} />
        )
      })}
    </section>
  );
}

export default Cards;
