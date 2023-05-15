import shuffleArray from './shuffleArray.js';
import sliceArrayBySize from './sliceArrayBySize.js';

class Minesweeper {
  constructor(size, bombsCount, container) {
    this.state = {
      time: 0,
      gameOver: false,
      flagsCount: bombsCount,
      stepsCount: 0,
    };
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

    this.elements.container.append(this.createGameControls(), this.elements.grid);

    document.body.append(this.elements.container);

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') window.location.reload();
    });
  }

  createGameControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls');

    const timer = document.createElement('div');
    const timerTime = document.createElement('span');

    timer.classList.add('timer');
    timerTime.classList.add('timer__time');
    timerTime.textContent = this.state.time.toString();

    timer.appendChild(timerTime);

    setInterval(() => {
      this.state.time += 1;
      timerTime.textContent = this.state.time.toString();
    }, 1000);

    const flagsCounter = document.createElement('div');
    flagsCounter.classList.add('flags-counter');
    flagsCounter.textContent = this.state.flagsCount;

    const stepsCounter = document.createElement('div');
    stepsCounter.classList.add('steps-counter');
    stepsCounter.textContent = this.state.stepsCount.toString();

    controlsContainer.append(flagsCounter, timer, stepsCounter);

    return controlsContainer;
  }

  resetGame() {
    // prevent using init func on lose or something
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
          if (this.state.gameOver) return;

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

            this.state.stepsCount += 1;
            document.querySelector('.steps-counter').textContent = this.state.stepsCount.toString();

            this.openCell(target);
          }
        });

        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          if (this.state.gameOver) return;
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
      this.state.flagsCount += 1;
      document.querySelector('.flags-counter').textContent = this.state.flagsCount.toString();
    } else {
      dataset.flaged = 'true';
      lastChild.textContent = '🚩';
      this.state.flagsCount -= 1;
      document.querySelector('.flags-counter').textContent = this.state.flagsCount.toString();
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
    // refactor
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
    this.state.gameOver = true;
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
