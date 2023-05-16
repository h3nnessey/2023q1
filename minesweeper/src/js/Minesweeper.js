import shuffleArray from './shuffleArray.js';
import sliceArrayBySize from './sliceArrayBySize.js';

class Minesweeper {
  constructor(size, bombsCount, container) {
    this.state = {
      size,
      bombsCount,
      time: 0,
      gameOver: false,
      gameStarted: false,
      flagsCount: bombsCount,
      stepsCount: 0,
      bombPosition: [],
      booleanMatrix: [],
      openedCells: [],
      flagedCells: [],
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
  }

  init() {
    const state = Minesweeper.getState();

    if (state) {
      this.initWithState(state);
      return;
    }

    this.createMinefields();
    this.elements.grid = this.createGrid();
    this.elements.container.append(this.createGameControls(), this.elements.grid);
    document.body.append(this.elements.container);
    window.addEventListener('beforeunload', this.saveState);
  }

  initWithState(state) {
    this.state = state;
    this.elements.grid = this.createGrid();
    this.elements.container.append(this.createGameControls(), this.elements.grid);

    if (this.state.gameOver) this.showAllBombs();

    if (!this.state.gameOver && this.state.gameStarted) {
      this.elements.gameControls.timer.lastChild.textContent = this.state.time
        .toString()
        .padStart(3, '0');
    }

    if (this.state.bombPosition.length) {
      const [row, column] = this.state.bombPosition;
      const bombClicked = this.elements.matrix[+row].children[+column];
      bombClicked.classList.add('bomb');
    }

    if (this.state.gameStarted) this.state.gameStarted = !this.state.gameStarted;

    document.body.append(this.elements.container);
    window.addEventListener('beforeunload', this.saveState);
  }

  createMinefields() {
    const { size, bombsCount } = this.state;
    const initialBooleanFlatArray = shuffleArray(
      Array(size * size - bombsCount)
        .fill(false)
        .concat(Array(bombsCount).fill(true)),
    );

    this.state.booleanMatrix = sliceArrayBySize(initialBooleanFlatArray, size);
  }

  createMatrix() {
    this.elements.matrix = this.state.booleanMatrix.map((matrixRow, row) => {
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

    this.elements.matrix.forEach((matrixRow) => {
      const row = Array.from(matrixRow.children);

      row.forEach((cell) => {
        const [r, c] = Minesweeper.getCellPosition(cell);
        const { lastChild, dataset } = cell;
        const isOpened = this.state.openedCells.find(([i, j]) => i === r && j === c);
        const isFlaged = this.state.flagedCells.find(([i, j]) => i === r && j === c);

        if (isFlaged) {
          dataset.flaged = 'true';
          lastChild.textContent = '🚩';
        }

        if (isOpened) {
          cell.classList.add('opened');
          const cellsAround = this.getCellsAround(r, c);
          const bombsAroundCount = this.getBombsAroundCount(cellsAround);

          if (bombsAroundCount) {
            dataset.bombs = bombsAroundCount.toString();
            lastChild.textContent = bombsAroundCount.toString();
          }
        }
      });
    });

    return this.elements.matrix;
  }

  createGrid() {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.append(...this.createMatrix());
    return grid;
  }

  createTimer() {
    const container = document.createElement('div');
    const title = document.createElement('span');
    const count = document.createElement('span');

    container.classList.add('timer');
    title.classList.add('timer__title');
    count.classList.add('timer__count');

    title.textContent = '⏲:';
    count.textContent = this.state.time.toString().padStart(3, '0');

    container.append(title, count);

    this.elements.gameControls.timer = container;
  }

  createFlagCounter() {
    const container = document.createElement('div');
    const title = document.createElement('span');
    const count = document.createElement('span');

    container.classList.add('flag-counter');
    title.classList.add('flag-counter__title');
    count.classList.add('flag-counter__count');

    title.textContent = '🚩:';
    count.textContent = this.state.flagsCount;

    container.append(title, count);

    this.elements.gameControls.flagCounter = container;
  }

  createStepCounter() {
    const container = document.createElement('div');
    const title = document.createElement('span');
    const count = document.createElement('span');

    container.classList.add('step-counter');
    title.classList.add('step-counter__title');
    count.classList.add('step-counter__count');

    title.textContent = 'Steps:';
    count.textContent = this.state.stepsCount.toString();

    container.append(title, count);

    this.elements.gameControls.stepCounter = container;
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

  handleCellClick = (e) => {
    const target = e.target.closest('.grid__cell');

    if (target) {
      if (this.state.gameOver) return;

      if (!this.state.gameStarted) {
        this.setTimer();
      }

      if (target.classList.contains('opened')) return;
      if (target.dataset.flaged === 'true') return;

      if (this.isBomb(target)) {
        target.classList.add('opened', 'bomb');
        this.state.stepsCount += 1;
        this.elements.gameControls.stepCounter.lastChild.textContent = this.state.stepsCount;
        this.state.bombPosition = Minesweeper.getCellPosition(target);
        this.gameOver(target);
        return;
      }

      this.state.stepsCount += 1;
      this.elements.gameControls.stepCounter.lastChild.textContent = this.state.stepsCount;

      this.openCell(target);
      this.checkMinefieldForWin();
    }
  };

  handleCellRightClick = (e) => {
    e.preventDefault();

    if (this.state.gameOver) return;

    if (!this.state.gameStarted) {
      this.setTimer();
    }

    const target = e.target.closest('.grid__cell');

    if (target) {
      if (target.classList.contains('opened')) return;
      this.toggleFlag(target);
    }
  };

  checkMinefieldForWin() {
    const openedCellsCount = this.elements.matrix.reduce((count, row) => {
      const rowArr = Array.from(row.children);
      const openedInRowCount = rowArr.reduce(
        (acc, cell) => (cell.classList.contains('opened') && !this.isBomb(cell) ? acc + 1 : acc),
        0,
      );
      return count + openedInRowCount;
    }, 0);

    const { size, bombsCount } = this.state;
    const cellsToOpenLeftCount = size * size - openedCellsCount - bombsCount;

    if (cellsToOpenLeftCount === 0) {
      this.gameOver();
    }
  }

  toggleFlag(cell) {
    const { lastChild, dataset } = cell;
    const isFlaged = cell.dataset.flaged === 'true';
    const [row, column] = Minesweeper.getCellPosition(cell);

    if (isFlaged) {
      lastChild.textContent = '';
      dataset.flaged = 'false';
      this.state.flagsCount += 1;
      this.state.flagedCells.pop();
    } else {
      dataset.flaged = 'true';
      lastChild.textContent = '🚩';
      this.state.flagsCount -= 1;
      this.state.flagedCells.push([row, column]);
    }

    this.elements.gameControls.flagCounter.lastChild.textContent = this.state.flagsCount.toString();
  }

  setTimer() {
    this.state.gameStarted = true;
    this.state.bombPosition = [];
    this.timerRef = setInterval(() => {
      this.state.time += 1;
      this.elements.gameControls.timer.lastChild.textContent = this.state.time
        .toString()
        .padStart(3, '0');
    }, 1000);
  }

  openCell(cell) {
    const [row, column] = Minesweeper.getCellPosition(cell);

    if (cell.classList.contains('opened')) return;
    if (cell.dataset.flaged === 'true') return;

    cell.classList.add('opened');

    this.state.openedCells.push([row, column]);

    const cellsAround = this.getCellsAround(row, column);
    const bombsAroundCount = this.getBombsAroundCount(cellsAround);

    if (bombsAroundCount) {
      const { dataset, lastChild } = cell;
      dataset.bombs = bombsAroundCount;
      lastChild.textContent = bombsAroundCount;
    } else {
      cellsAround.forEach((target) => this.openCell.call(this, target, row, column));
    }
  }

  isBomb(cell) {
    const [row, column] = Minesweeper.getCellPosition(cell);
    return this.state.booleanMatrix[row][column];
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

  static getCellPosition(cell) {
    return cell.dataset.pos.split(':').map(Number);
  }

  resetGame() {
    clearInterval(this.timerRef);
    this.state = {
      ...this.state,
      time: 0,
      gameOver: false,
      gameStarted: false,
      flagsCount: this.state.bombsCount,
      stepsCount: 0,
      bombPosition: [],
      booleanMatrix: [],
      openedCells: [],
      flagedCells: [],
    };

    this.elements.gameControls.timer.lastChild.textContent = this.state.time
      .toString()
      .padStart(3, '0');
    this.elements.gameControls.flagCounter.lastChild.textContent = this.state.flagsCount.toString();
    this.elements.gameControls.stepCounter.lastChild.textContent = this.state.stepsCount.toString();

    this.elements.grid = null;
    this.elements.matrix = null;

    this.state.booleanMatrix = null;

    this.createMinefields();
    this.elements.grid = this.createGrid();

    const grid = document.querySelector('.grid');
    grid.replaceWith(this.elements.grid);
  }

  gameOver(cell) {
    this.state.gameOver = true;
    this.state.gameStarted = false;
    clearInterval(this.timerRef);

    if (cell) {
      const { lastChild } = cell;
      lastChild.textContent = '💣';
    }

    this.showAllBombs();
  }

  showAllBombs() {
    this.elements.matrix
      .reduce((acc, curr) => {
        const row = Array.from(curr.children);
        const bombsInRow = row.reduce(
          (prev, cell) => (this.isBomb(cell) ? [...prev, cell] : prev),
          [],
        );
        return [...acc, ...bombsInRow];
      }, [])
      .forEach((cell) => {
        const bomb = cell;
        bomb.textContent = '💣';
        bomb.classList.add('opened');
      });
  }

  saveState = () => {
    localStorage.setItem('game-state', JSON.stringify(this.state));
  };

  static getState = () => {
    const json = localStorage.getItem('game-state');
    return json ? JSON.parse(json) : null;
  };
}

export default Minesweeper;
