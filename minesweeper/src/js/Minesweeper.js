import shuffleArray from './shuffleArray.js';
import sliceArrayBySize from './sliceArrayBySize.js';

class Minesweeper {
  constructor(size, bombsCount, container) {
    this.size = size;
    this.bombsCount = bombsCount;
    this.elements = {
      container,
      grid: [],
      matrix: [],
    };
    this.minefields = {
      booleanFlat: [],
      booleanMatrix: [],
    };
  }

  init() {
    const emptyCellsArray = Array(this.size * this.size - this.bombsCount).fill(false);
    const bombsArray = Array(this.bombsCount).fill(true);

    this.minefields.booleanFlat = shuffleArray(bombsArray.concat(emptyCellsArray));

    this.minefields.booleanMatrix = sliceArrayBySize(this.minefields.booleanFlat, this.size);
    // remove from elements if will not being used in future
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
    return this.minefields.booleanMatrix.map((matrixRow, row) => {
      const div = document.createElement('div');
      div.classList.add('grid__row');

      const cells = matrixRow.map((_, column) => {
        const cell = document.createElement('div');
        const cellSpan = document.createElement('span');

        cellSpan.classList.add('cell__span');
        cell.append(cellSpan);
        cell.classList.add('grid__cell', 'cell');
        cell.dataset.pos = `${row}:${column}`;

        cell.addEventListener('click', (e) => {
          const target = e.target.closest('.grid__cell');

          if (target) {
            // мб проверять клетку в отдельной функции, потому что будут флаги

            if (target.classList.contains('opened')) return;
            if (target.dataset.flaged === 'true') return;

            if (this.isBomb(target)) {
              target.classList.add('opened', 'bomb');
              this.gameOver(target);
              return;
            }

            this.openCell(target);
          }
        });

        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          const target = e.target.closest('.grid__cell');

          if (target) {
            if (target.classList.contains('opened')) return;
            this.toggleFlag(target);
          }
        });

        return cell;
      });

      div.append(...cells);
      return div;
    });
  }

  openCell(cell) {
    const [row, column] = this.getCellPosition(cell);

    if (cell.classList.contains('opened')) return;
    if (cell.dataset.flaged === 'true') return;

    cell.classList.add('opened');

    const cellsAround = this.getCellsAround(row, column);
    const bombsAroundCount = this.getBombsAroundCount(cellsAround);

    !bombsAroundCount && cellsAround.forEach((target) => this.openCell(target, row, column));

    if (bombsAroundCount) {
      const { dataset, lastChild } = cell;
      dataset.bombs = bombsAroundCount;
      lastChild.textContent = bombsAroundCount;
    }
  }

  toggleFlag(cell) {
    const { lastChild, dataset } = cell;
    const isFlaged = cell.dataset.flaged === 'true';

    if (isFlaged) {
      lastChild.textContent = '';
      dataset.flaged = 'false';
    } else {
      dataset.flaged = 'true';
      lastChild.textContent = '🚩';
    }
  }

  getCellsAround(row, column) {
    const prevRow = this.elements.matrix[row - 1];
    const nextRow = this.elements.matrix[row + 1];
    const north = prevRow ? prevRow.children[column] : null;
    const northWest = prevRow ? prevRow.children[column - 1] : null;
    const northEast = prevRow ? prevRow.children[column + 1] : null;
    const west = this.elements.matrix[row].children[column - 1] || null;
    const east = this.elements.matrix[row].children[column + 1] || null;
    const south = nextRow ? nextRow.children[column] : null;
    const southWest = nextRow ? nextRow.children[column - 1] : null;
    const southEast = nextRow ? nextRow.children[column + 1] : null;

    const cellsAround = [north, northWest, northEast, west, east, south, southWest, southEast];

    return cellsAround.filter((cell) => !!cell);
  }

  getBombsAroundCount(cells) {
    return cells.reduce((acc, curr) => (this.isBomb(curr) ? acc + 1 : acc), 0);
  }

  isBomb(cell) {
    const [row, column] = this.getCellPosition(cell);
    return this.minefields.booleanMatrix[row][column];
  }

  getCellPosition(cell) {
    return cell.dataset.pos.split(':').map(Number);
  }

  showAllBombs() {
    const bombs = [];
    this.elements.matrix.forEach((row) => {
      Array.from(row.children).forEach((c) => {
        if (this.isBomb(c)) {
          bombs.push(c);
        }
      });
    });
    bombs.forEach((bomb) => {
      bomb.classList.add('opened');
      bomb.textContent = '💣';
    });
  }

  gameOver(cell) {
    const { lastChild } = cell;
    lastChild.textContent = '💣';

    // нужно состояние isGameOver чтобы клики после луза не проходили и тд
    this.showAllBombs();

    // setTimeout(() => {
    //   this.elements.grid.innerHTML = null;
    //   this.elements.matrix.innerHTML = null;
    //   this.minefields.booleanFlat = [];
    //   this.minefields.booleanMatrix = [];
    //
    //   this.init();
    // }, 1000);
  }
}

export default Minesweeper;
