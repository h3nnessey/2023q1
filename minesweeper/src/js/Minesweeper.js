import shuffleArray from './shuffleArray.js';
import sliceArrayBySize from './sliceArrayBySize.js';

class Minesweeper {
  constructor(size, bombsCount, appContainer) {
    this.state = {
      size,
      bombsCount,
      time: 0,
      volume: 1,
      gameOver: false,
      gameStarted: false,
      flagsCount: bombsCount,
      stepsCount: 0,
      booleanMatrix: [],
      openedCells: [],
      flagedCells: [],
    };

    this.timerRef = null;

    this.elements = {
      appContainer,
      app: null,
      grid: null,
      matrix: null,
      gameControls: {
        timer: null,
        flagCounter: null,
        stepCounter: null,
        resetGameButton: null,
        settingsButton: null,
      },
      settings: null,
    };
  }

  init() {
    const state = Minesweeper.getState();

    if (state) {
      this.initWithState(state);
      return;
    }

    this.state.booleanMatrix = this.createBooleanMatrix();
    this.elements.app = document.createElement('div');
    this.elements.app.classList.add('app');
    this.elements.grid = this.createGrid();
    this.elements.app.append(this.createGameControls(), this.elements.grid, this.elements.settings);
    this.elements.appContainer.append(this.elements.app);

    document.body.append(this.elements.appContainer);
    window.addEventListener('beforeunload', this.saveState);
  }

  initWithState(state) {
    this.state = state;

    this.elements.app = document.createElement('div');
    this.elements.app.classList.add('app');

    if (this.state.gameOver) {
      this.state.gameOver = false;
      this.state.booleanMatrix = this.createBooleanMatrix();
    }

    if (!this.state.gameOver && !this.state.gameStarted) {
      this.state.booleanMatrix = this.createBooleanMatrix();
    }

    this.elements.grid = this.createGrid();
    this.elements.app.append(this.createGameControls(), this.elements.grid, this.elements.settings);
    this.elements.appContainer.append(this.elements.app);

    if (!this.state.gameOver && this.state.gameStarted) {
      this.elements.gameControls.timer.lastChild.textContent = this.state.time
        .toString()
        .padStart(3, '0');
    }

    if (this.state.gameStarted) this.state.gameStarted = false;

    document.body.append(this.elements.appContainer);
    window.addEventListener('beforeunload', this.saveState);
  }

  createBooleanMatrix() {
    const { size, bombsCount } = this.state;
    const initialBooleanFlatArray = shuffleArray(
      Array(size * size - bombsCount)
        .fill(false)
        .concat(Array(bombsCount).fill(true)),
    );

    return sliceArrayBySize(initialBooleanFlatArray, size);
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

    if (this.state.gameStarted) {
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
    }
  }

  createGrid() {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    this.createMatrix();
    grid.append(...this.elements.matrix);
    return grid;
  }

  createGameInfoElement(containerClass, titleClass, infoClass, titleText, infoText, element) {
    const container = document.createElement('div');
    const title = document.createElement('span');
    const info = document.createElement('span');

    container.classList.add(containerClass);
    title.classList.add(titleClass);
    info.classList.add(infoClass);

    title.textContent = titleText;
    info.textContent = infoText;

    container.append(title, info);

    this.elements.gameControls[element] = container;
  }

  createGameControls() {
    this.createGameInfoElement(
      'timer',
      'timer__title',
      'timer__count',
      '⏲:',
      this.state.time.toString().padStart(3, '0'),
      'timer',
    );
    this.createGameInfoElement(
      'flag-counter',
      'flag-counter__title',
      'flag-counter__count',
      '🚩:',
      `${this.state.flagsCount.toString()} / ${this.state.bombsCount}`,
      'flagCounter',
    );

    this.createGameInfoElement(
      'step-counter',
      'step-counter__title',
      'step-counter__count',
      'Steps:',
      this.state.stepsCount.toString(),
      'stepCounter',
    );

    this.createResetGameButton();
    this.createSettings();

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

  createResetGameButton() {
    const resetGameButton = document.createElement('div');
    resetGameButton.textContent = '🔃';
    resetGameButton.classList.add('reset-btn');

    resetGameButton.addEventListener('click', () => {
      this.resetGame();
    });

    this.elements.gameControls.resetGameButton = resetGameButton;
  }

  createSettings() {
    const settingsContainer = document.createElement('div');
    const sizeSelector = document.createElement('select');
    const sizeSelectorLabel = document.createElement('label');

    const bombsCountLabel = document.createElement('label');
    const volumeLabel = document.createElement('label');

    const optionsTemplate = `
        <option class='select__option' value='10'
          ${this.state.size === 10 ? 'selected' : ''}
        >10⨉10</option>
        <option class='select__option' value='15'
          ${this.state.size === 15 ? 'selected' : ''}
        >15⨉15</option>
        <option class='select__option' value='25'
          ${this.state.size === 25 ? 'selected' : ''}
        >25⨉25</option>
    `;

    sizeSelector.insertAdjacentHTML('afterbegin', optionsTemplate);
    sizeSelector.name = 'size';
    sizeSelector.classList.add('select');
    sizeSelectorLabel.classList.add('select__label');
    sizeSelectorLabel.textContent = 'Field size: ';
    sizeSelectorLabel.append(sizeSelector);

    const saveSettingsBtn = document.createElement('button');
    saveSettingsBtn.classList.add('settings-btn_save');
    saveSettingsBtn.textContent = '💾';

    const bombsCountTemplate = `
      <input class='range-input' type='range'
        step='1'
        min='10'
        max='99'
        value=${this.state.bombsCount || '10'}
      >
      <input class='number-input' type='number'
        step='1'
        min='10'
        max='99'
        value=${this.state.bombsCount || '10'}
      >
    `;

    bombsCountLabel.classList.add('range-input__label');
    bombsCountLabel.textContent = 'Bombs: ';
    bombsCountLabel.insertAdjacentHTML('beforeend', bombsCountTemplate);

    const bombsRangeInput = bombsCountLabel.querySelector('.range-input');
    const bombsNumberInput = bombsCountLabel.querySelector('.number-input');

    const volumeTemplate = `
      <input class='range-input' type='range'
        step='0.01'
        min='0'
        max='1'
        value=${this.state.volume}
      >
      <input class='number-input' type='number'
        step='1'
        min='0'
        max='100'
        value=${Math.trunc(this.state.volume * 100)}
      >
    `;

    volumeLabel.classList.add('range-input__label');
    volumeLabel.textContent = 'Volume:';
    volumeLabel.insertAdjacentHTML('beforeend', volumeTemplate);

    const volumeRangeInput = volumeLabel.querySelector('.range-input');
    const volumeNumberInput = volumeLabel.querySelector('.number-input');

    settingsContainer.classList.add('settings');
    settingsContainer.append(sizeSelectorLabel, bombsCountLabel, volumeLabel, saveSettingsBtn);

    sizeSelector.addEventListener('change', (e) => {
      const size = e.currentTarget.value;
      const bombsCountMap = {
        10: 10,
        15: 40,
        25: 99,
      };
      bombsRangeInput.value = bombsCountMap[size];
      bombsNumberInput.value = bombsCountMap[size];
    });

    bombsRangeInput.addEventListener('input', (e) => {
      bombsNumberInput.value = e.currentTarget.value;
    });

    const handleBombsCountChange = (e) => {
      const bombsCount = Number(e.target.value);
      if (bombsCount > 99) bombsNumberInput.value = '99';
      if (bombsCount < 10) bombsNumberInput.value = '10';
      bombsRangeInput.value = bombsCount.toString();
    };

    const handleVolumeChange = (e) => {
      const volume = Number(e.target.value);
      if (volume < 0) volumeNumberInput.value = '0';
      if (volume > 100) volumeNumberInput.value = '100';
      this.state.volume = volume / 100;
      volumeRangeInput.value = (volume / 100).toString();
    };

    bombsNumberInput.addEventListener('focusout', handleBombsCountChange);

    bombsNumberInput.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' && !e.repeat) {
        handleBombsCountChange(e);
      }
    });

    volumeRangeInput.addEventListener('input', (e) => {
      const volume = Number(e.target.value);
      this.state.volume = volume;
      volumeNumberInput.value = Math.trunc(volume * 100).toString();
    });

    volumeNumberInput.addEventListener('input', handleVolumeChange);

    volumeNumberInput.addEventListener('focusout', handleVolumeChange);

    volumeNumberInput.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' && !e.repeat) {
        handleVolumeChange(e);
      }
    });

    saveSettingsBtn.addEventListener('click', () => {
      this.elements.settings.classList.toggle('settings_active');
      this.resetGame(+sizeSelector.value, +bombsRangeInput.value);
    });

    this.elements.settings = settingsContainer;
  }

  playAudio(type) {
    if (this.isSoundPlaying) return;
    const paths = {
      win: './assets/audio/win.mp3',
      loss: './assets/audio/loss.mp3',
      open: './assets/audio/open.mp3',
      flagPlaced: './assets/audio/flag-place.mp3',
      flagRemoved: './assets/audio/flag-remove.mp3',
    };

    const audio = new Audio();
    audio.volume = this.state.volume;
    audio.src = paths[type];
    audio.play().then();
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
        this.gameOver();
        this.playAudio('loss');
        return;
      }

      this.state.stepsCount += 1;
      this.elements.gameControls.stepCounter.lastChild.textContent = this.state.stepsCount;

      this.openCell(target);
      this.playAudio('open');
      this.checkMinefieldForWin();
    }
  };

  handleCellRightClick = (e) => {
    e.preventDefault();

    const target = e.target.closest('.grid__cell');

    if (target) {
      if (this.state.gameOver) return;

      if (!this.state.gameStarted) {
        this.setTimer();
      }

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
      this.playAudio('win');
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
      this.playAudio('flagRemoved');
    } else {
      dataset.flaged = 'true';
      lastChild.textContent = '🚩';
      this.state.flagsCount -= 1;
      this.state.flagedCells.push([row, column]);
      this.playAudio('flagPlaced');
    }

    this.elements.gameControls.flagCounter.lastChild.textContent = `${this.state.flagsCount.toString()} / ${
      this.state.bombsCount
    }`;
  }

  setTimer() {
    this.state.gameStarted = true;
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

  resetGame(size, bombsCount) {
    clearInterval(this.timerRef);

    this.state = {
      ...this.state,
      size: size || this.state.size,
      bombsCount: bombsCount || this.state.bombsCount,
      time: 0,
      gameOver: false,
      gameStarted: false,
      flagsCount: bombsCount || this.state.bombsCount,
      stepsCount: 0,
      booleanMatrix: [],
      openedCells: [],
      flagedCells: [],
    };

    this.elements.grid = null;
    this.elements.matrix = null;

    this.elements.gameControls.timer.lastChild.textContent = this.state.time
      .toString()
      .padStart(3, '0');
    this.elements.gameControls.flagCounter.lastChild.textContent = `${this.state.flagsCount.toString()} / ${
      this.state.bombsCount
    }`;
    this.elements.gameControls.stepCounter.lastChild.textContent = this.state.stepsCount.toString();

    this.state.booleanMatrix = this.createBooleanMatrix();
    this.elements.grid = this.createGrid();
    this.elements.app.querySelector('.grid').replaceWith(this.elements.grid);
  }

  gameOver() {
    this.state.gameOver = true;
    this.state.gameStarted = false;
    clearInterval(this.timerRef);
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
    if (this.state.gameOver || (!this.state.gameOver && !this.state.gameStarted)) {
      this.state = {
        ...this.state,
        size: 10,
        bombsCount: 10,
        flagsCount: 10,
        openedCells: [],
        flagedCells: [],
        booleanMatrix: [],
        gameStarted: false,
        time: 0,
        stepsCount: 0,
      };
    }

    localStorage.setItem(
      '34a7a71c2290f0e145d0448dde6bc1ab2628c1d02d31a45702792a829321cf17',
      JSON.stringify(this.state),
    );
  };

  static getState = () => {
    const json = localStorage.getItem(
      '34a7a71c2290f0e145d0448dde6bc1ab2628c1d02d31a45702792a829321cf17',
    );
    return json ? JSON.parse(json) : null;
  };
}

export default Minesweeper;
