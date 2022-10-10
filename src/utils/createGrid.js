// Le memory se joue sur une grille de cartes.
// Je structure donc mes données au préalable pour former ma grille plus facilement.
// Ma grille sera formée d'un array d'arrays (ceux-ci représenteront les lignes).
function createGrid(columns, rows, deck) {
  const localArray = [];
  for (let row = 0; row < rows; row++) {
    // On spread les fruits qui nous intéressent dans une nouvelle ligne.
    // Pour column = 6, on prend les 6 premières cartes, puis les 6 suivantes, etc,
    // le tout multiplié par le param row.
    const newRow = [...deck.slice(columns * row, columns * (row + 1))];
    localArray.push(newRow);
  }
  return localArray;
}

export default createGrid;
