import shuffleArray from './shuffleArray.js';
import getMinefieldWithNumbers from './getMinefieldWithNumbers.js';
import sliceArrayBySize from './sliceArrayBySize.js';

class Minesweeper {
  constructor(size, bombsCount, container) {
    this.props = {
      size,
      bombsCount,
    };
    this.elements = {
      container,
      grid: [],
      matrix: [],
    };
    this.minefields = {
      booleanFlat: [],
      booleanMatrix: [],
      numberedMatrix: [],
    };
  }

  init() {
    this.minefields.booleanFlat = shuffleArray(
      Array(this.props.size * this.props.size - this.props.bombsCount)
        .fill(false)
        .concat(Array(this.props.size).fill(true)),
    );

    this.minefields.booleanMatrix = sliceArrayBySize(this.minefields.booleanFlat, this.props.size);
    this.minefields.numberedMatrix = getMinefieldWithNumbers(this.minefields.booleanMatrix);

    this.elements.grid = this.createGrid();
    this.elements.container.append(this.elements.grid);

    document.body.append(this.elements.container);
  }

  createGrid() {
    const grid = document.createElement('div');
    grid.classList.add('grid');

    this.elements.matrix = this.createMatrix();

    grid.append(...this.elements.matrix);

    return grid;
  }

  createMatrix() {
    return this.minefields.numberedMatrix.map((matrixRow, i) => {
      const div = document.createElement('div');
      div.classList.add('grid__row');

      div.append(
        ...matrixRow.map((_, j) => {
          const cell = document.createElement('div');
          cell.classList.add('grid__cell');
          cell.dataset.pos = `${i}:${j}`;

          const isBomb = this.minefields.booleanMatrix[i][j] === true;

          if (isBomb) {
            cell.textContent = '💣';
          } else {
            cell.textContent = this.minefields.numberedMatrix[i][j].toString();
          }

          cell.addEventListener('click', (e) => {
            const [row, column] = e.target.dataset.pos.split(':');

            console.log(
              this.minefields.booleanMatrix[row][column],
              this.minefields.numberedMatrix[row][column],
              `row: ${row}; col: ${column}`,
            );
          });
          return cell;
        }),
      );

      return div;
    });
  }
}

export default Minesweeper;
