import shuffleArray from './shuffleArray.js';
import sliceArrayBySize from './sliceArrayBySize.js';

class Minesweeper {
  constructor(size, bombsCount, container) {
    this.size = size;
    this.bombsCount = bombsCount;
    this.state = {
      time: 0,
      gameOver: false,
      gameStarted: false,
      flagsCount: bombsCount,
      stepsCount: 0,
    };
    this.timerRef = null;
    this.elements = {
      container,
      grid: null,
      matrix: null,
      gameControls: {
        timer: null,
        flagCounter: null,
        stepCounter: null,
        resetGameButton: null,
      },
    };
    this.minefields = {
      booleanFlat: null,
      booleanMatrix: null,
    };
  }

  createMinefields() {
    this.minefields.booleanFlat = shuffleArray(
      Array(this.size * this.size - this.bombsCount)
        .fill(false)
        .concat(Array(this.bombsCount).fill(true)),
    );

    this.minefields.booleanMatrix = sliceArrayBySize(this.minefields.booleanFlat, this.size);
  }

  init() {
    this.createMinefields();
    this.elements.grid = this.createGrid();
    this.elements.container.append(this.createGameControls(), this.elements.grid);
    document.body.append(this.elements.container);
  }

  createTimer() {
    const timer = document.createElement('div');
    timer.classList.add('timer');
    timer.textContent = this.state.time.toString();

    this.elements.gameControls.timer = timer;
  }

  createFlagCounter() {
    const flagCounter = document.createElement('div');
    flagCounter.classList.add('flag-counter');
    flagCounter.textContent = this.state.flagsCount;

    this.elements.gameControls.flagCounter = flagCounter;
  }

  createStepCounter() {
    const stepCounter = document.createElement('div');
    stepCounter.classList.add('step-counter');
    stepCounter.textContent = this.state.stepsCount.toString();

    this.elements.gameControls.stepCounter = stepCounter;
  }

  createResetGameButton() {
    const resetGameButton = document.createElement('div');
    resetGameButton.textContent = '🔃';
    resetGameButton.classList.add('reset-btn');
    resetGameButton.addEventListener('click', () => {
      this.resetGame();
    });

    this.elements.gameControls.resetGameButton = resetGameButton;
  }

  createGameControls() {
    this.createTimer();
    this.createResetGameButton();
    this.createStepCounter();
    this.createFlagCounter();

    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls');
    controlsContainer.append(
      this.elements.gameControls.flagCounter,
      this.elements.gameControls.timer,
      this.elements.gameControls.stepCounter,
      this.elements.gameControls.resetGameButton,
    );

    return controlsContainer;
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
        cell.classList.add('grid__cell', 'cell');
        cell.dataset.pos = `${row}:${column}`;
        cell.append(cellSpan);
        cell.addEventListener('click', this.handleCellClick);
        cell.addEventListener('contextmenu', this.handleCellRightClick);
        return cell;
      });
      div.append(...cells);
      return div;
    });
  }

  handleCellClick = (e) => {
    const target = e.target.closest('.grid__cell');

    if (target) {
      if (this.state.gameOver) return;

      if (!this.state.gameStarted) {
        this.state.gameStarted = true;
        this.setTimer();
      }

      if (target.classList.contains('opened')) return;
      if (target.dataset.flaged === 'true') return;

      if (this.isBomb(target)) {
        target.classList.add('opened', 'bomb');
        this.gameOver(target);
        return;
      }

      this.state.stepsCount += 1;
      this.elements.gameControls.stepCounter.textContent = this.state.stepsCount;

      this.openCell(target);
    }
  };

  handleCellRightClick = (e) => {
    e.preventDefault();

    if (this.state.gameOver) return;

    if (!this.state.gameStarted) {
      this.state.gameStarted = true;
      this.setTimer();
    }

    const target = e.target.closest('.grid__cell');

    if (target) {
      if (target.classList.contains('opened')) return;
      this.toggleFlag(target);
    }
  };

  resetGame() {
    clearInterval(this.timerRef);
    this.state = {
      time: 0,
      gameOver: false,
      gameStarted: false,
      flagsCount: this.bombsCount,
      stepsCount: 0,
    };
    this.elements.grid = null;
    this.elements.matrix = null;
    this.minefields.booleanFlat = null;
    this.minefields.booleanMatrix = null;

    this.elements.gameControls.timer.textContent = this.state.time.toString();
    this.elements.gameControls.flagCounter.textContent = this.state.flagsCount.toString();
    this.elements.gameControls.stepCounter.textContent = this.state.stepsCount.toString();

    this.createMinefields();
    this.elements.grid = this.createGrid();
    const grid = document.querySelector('.grid');
    grid.replaceWith(this.elements.grid);
  }

  setTimer() {
    this.timerRef = setInterval(() => {
      this.state.time += 1;
      this.elements.gameControls.timer.textContent = this.state.time.toString();
    }, 1000);
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
      this.elements.gameControls.flagCounter.textContent = this.state.flagsCount.toString();
    } else {
      dataset.flaged = 'true';
      lastChild.textContent = '🚩';
      this.state.flagsCount -= 1;
      this.elements.gameControls.flagCounter.textContent = this.state.flagsCount.toString();
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
    this.state.gameStarted = false;
    clearInterval(this.timerRef);
    const { lastChild } = cell;
    lastChild.textContent = '💣';
    this.showAllBombs();
  }
}

export default Minesweeper;
