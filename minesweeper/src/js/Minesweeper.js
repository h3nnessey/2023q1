import shuffleArray from './shuffleArray.js';
import sliceArrayBySize from './sliceArrayBySize.js';

class Minesweeper {
  constructor(size, bombsCount, appContainer) {
    this.state = {
      size,
      bombsCount,
      time: 0,
      volume: 0.3,
      currentVolume: 0.3,
      theme: 'app_theme-light',
      gameOver: false,
      gameStarted: false,
      flagsCount: 0,
      stepsCount: 0,
      bombPosition: [],
      booleanMatrix: [],
      openedCells: [],
      flaggedCells: [],
      lastResults: Array(10).fill(null),
    };
    this.audio = new Audio();
    this.timerRef = null;
    this.elements = {
      appContainer,
      app: null,
      grid: null,
      matrix: null,
      gameInfo: {
        timer: null,
        flagCounter: null,
        stepCounter: null,
      },
      settings: null,
      notification: null,
      leaderboard: null,
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
    this.elements.app.append(this.createGameInfo(), this.elements.grid, this.elements.settings);
    this.elements.appContainer.append(this.elements.app);

    document.body.classList.add(this.state.theme);
    document.body.append(this.elements.appContainer, this.createLeaderboard());
    window.addEventListener('beforeunload', this.saveState);
  }

  initWithState(state) {
    this.state = state;

    this.elements.app = document.createElement('div');
    this.elements.app.classList.add('app');
    this.elements.grid = this.createGrid();
    this.elements.app.append(this.createGameInfo(), this.elements.grid, this.elements.settings);
    this.elements.appContainer.append(this.elements.app);

    if (this.state.gameOver && this.state.bombPosition.length) {
      const [row, column] = this.state.bombPosition;
      const bombClicked = this.elements.matrix[+row].children[+column];
      bombClicked.classList.add('bomb');
      this.showAllBombs();
      this.createNotification('loss');
    }

    if (this.state.gameOver && !this.state.bombPosition.length) {
      this.showAllBombs();
      this.createNotification('win');
    }

    if (!this.state.gameOver && this.state.gameStarted) {
      this.elements.gameInfo.timer.lastChild.textContent = (this.state.time / 1000)
        .toFixed(2)
        .toString();
    }

    if (this.state.gameStarted) this.state.gameStarted = false;

    document.body.classList.add(this.state.theme);
    document.body.append(this.elements.appContainer, this.createLeaderboard());
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

    this.elements.matrix.forEach((matrixRow) => {
      const row = Array.from(matrixRow.children);

      row.forEach((cell) => {
        const [r, c] = Minesweeper.getCellPosition(cell);
        const { lastChild, dataset } = cell;
        const isOpened = this.state.openedCells.find(([i, j]) => i === r && j === c);
        const isFlagged = this.state.flaggedCells.find(([i, j]) => i === r && j === c);

        if (isFlagged) {
          cell.classList.add('flagged');
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

  createGrid() {
    const grid = document.createElement('div');
    grid.classList.add('grid', `grid_size-${this.state.size}`);
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

    this.elements.gameInfo[element] = container;

    return this.elements.gameInfo[element];
  }

  createGameInfo() {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls');
    controlsContainer.append(
      this.createGameInfoElement(
        'flag-counter',
        'flag-counter__title',
        'flag-counter__count',
        '🚩',
        `${this.state.flagsCount.toString()} / ${this.state.bombsCount - this.state.flagsCount} 💣`,
        'flagCounter',
      ),
      this.createGameInfoElement(
        'timer',
        'timer__title',
        'timer__count',
        '⏲:',
        (this.state.time / 1000).toFixed(2).toString(),
        'timer',
      ),
      this.createGameInfoElement(
        'step-counter',
        'step-counter__title',
        'step-counter__count',
        'Steps:',
        this.state.stepsCount.toString(),
        'stepCounter',
      ),
      this.createButton('reset', () => {
        this.resetGame();
      }),
      this.createButton('save', () => {
        this.state.gameStarted = false;
        clearInterval(this.timerRef);
        this.saveState();
      }),
      this.createThemeChanger(),
    );

    this.createSettings();

    return controlsContainer;
  }

  createButton(classMod, handler) {
    const button = document.createElement('button');

    button.classList.add('btn', `btn_${classMod}`);
    button.insertAdjacentHTML('afterbegin', '<span class="btn__icon"></span>');

    button.addEventListener('click', (e) => {
      handler(e);
    });

    return button;
  }

  createThemeChanger() {
    const themeChangerLabel = document.createElement('label');
    themeChangerLabel.classList.add('theme-changer__label');
    themeChangerLabel.insertAdjacentHTML(
      'afterbegin',
      `<input class='theme-changer' type='checkbox' ${
        this.state.theme === 'app_theme-dark' ? 'checked' : ''
      }>`,
    );

    themeChangerLabel.addEventListener('change', (e) => {
      const theme = e.target.checked ? 'app_theme-dark' : 'app_theme-light';
      this.state.theme = theme;
      document.body.className = '';
      document.body.classList.add(theme);
    });

    return themeChangerLabel;
  }

  createSettings() {
    const settingsContainer = document.createElement('div');
    const sizeSelector = document.createElement('select');
    const sizeSelectorLabel = document.createElement('label');
    const bombsCountLabel = document.createElement('label');
    const volumeControls = document.createElement('div');

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

    const bombsCountTemplate = `
      <input class='bombs-count-input' type='range'
        step='1'
        min='10'
        max='99'
        value=${this.state.bombsCount || '10'}
      >
      <span class='bombs-count-input__count'>${this.state.bombsCount || '10'}</span>
    `;

    sizeSelector.insertAdjacentHTML('afterbegin', optionsTemplate);
    sizeSelector.name = 'size';
    sizeSelector.classList.add('select');
    sizeSelectorLabel.classList.add('select__label');
    sizeSelectorLabel.textContent = 'Field size: ';
    sizeSelectorLabel.append(sizeSelector);

    bombsCountLabel.classList.add('range-input__label');
    bombsCountLabel.textContent = 'Bombs: ';
    bombsCountLabel.insertAdjacentHTML('beforeend', bombsCountTemplate);

    const bombsRangeInput = bombsCountLabel.querySelector('.bombs-count-input');
    const bombsRangeInputValue = bombsCountLabel.querySelector('.bombs-count-input__count');

    sizeSelector.addEventListener('change', (e) => {
      const size = e.currentTarget.value;
      const bombsCountMap = {
        10: 10,
        15: 40,
        25: 99,
      };
      const bombsCount = bombsCountMap[size];
      bombsRangeInput.value = `${bombsCount}`;
      bombsRangeInputValue.textContent = `${bombsCount}`;
      this.resetGame(+size, bombsCount);
    });

    bombsRangeInput.addEventListener('input', (e) => {
      const bombsCount = e.currentTarget.value;
      bombsRangeInputValue.textContent = `${bombsCount}`;
      this.resetGame(null, Number(bombsCount));
    });

    const volumeTemplate = `
      <input class='volume__range-input' type='range'
        step='0.01'
        min='0'
        max='1'
        value=${this.state.volume}
      >
      <span class='volume__range-input__value'>${Math.trunc(this.state.volume * 100)}</span>
    `;

    volumeControls.classList.add('volume');
    volumeControls.insertAdjacentHTML('afterbegin', volumeTemplate);

    const volumeRangeInput = volumeControls.querySelector('.volume__range-input');
    const volumeValue = volumeControls.querySelector('.volume__range-input__value');

    const volumeButton = this.createButton('volume', () => {
      if (this.state.volume) {
        this.state.currentVolume = this.state.volume;
        this.state.volume = 0;
        this.audio.volume = 0;
        volumeRangeInput.value = '0';
        volumeValue.textContent = '0';
        volumeButton.classList.add('btn_volume-muted');
      } else {
        this.state.volume = this.state.currentVolume;
        this.audio.volume = this.state.currentVolume;
        volumeRangeInput.value = `${this.state.volume}`;
        volumeValue.textContent = `${Math.trunc(this.state.volume * 100)}`;
        volumeButton.classList.remove('btn_volume-muted');
      }

      if (!this.state.currentVolume) {
        this.state.volume = 0.3;
        this.audio.volume = 0.3;
        volumeRangeInput.value = '0.3';
        volumeValue.textContent = '30';
        volumeButton.classList.remove('btn_volume-muted');
      }
    });

    if (!this.state.volume) {
      volumeButton.classList.add('btn_volume-muted');
    }

    volumeControls.insertAdjacentElement('afterbegin', volumeButton);

    settingsContainer.classList.add('settings');

    volumeRangeInput.addEventListener('input', (e) => {
      const volume = Number(e.target.value);

      volumeValue.textContent = `${Math.trunc(volume * 100)}`;
      this.state.volume = volume;
      this.audio.volume = volume;
      this.state.currentVolume = volume;

      if (!volume) {
        volumeButton.classList.add('btn_volume-muted');
      } else {
        volumeButton.classList.remove('btn_volume-muted');
      }
    });

    const settingsColumn = document.createElement('div');
    const settingsRow = document.createElement('div');
    settingsRow.classList.add('settings__row');
    settingsColumn.classList.add('settings__column');

    const firstColumn = settingsColumn.cloneNode();
    const secondColumn = settingsColumn.cloneNode();

    const btn = this.createButton('toggle-leaderboard', () => {
      this.elements.leaderboard.classList.toggle('leaderboard_opened');
      this.state.gameStarted = false;
      clearInterval(this.timerRef);
    });

    btn.lastChild.textContent = 'View Leaderboard';

    settingsRow.append(volumeControls);
    firstColumn.append(bombsCountLabel, sizeSelectorLabel);
    secondColumn.append(settingsRow, btn);

    settingsContainer.append(firstColumn, secondColumn);

    this.elements.settings = settingsContainer;
  }

  createNotification(type) {
    const container = document.createElement('div');
    container.classList.add('result');

    const templates = {
      win: `
        <h2 class='result__title'>
          Hooray!
        </h2>
        <p class='result__info'>
          You found all mines in ${(this.state.time / 1000).toFixed(2)} seconds and
          ${this.state.stepsCount} moves!
        </p>`,
      loss: `
        <h2 class='result__title'>
          Game over.
        </h2>
        <p class='result__info'>
          Try Again!
        </p>`,
    };

    container.insertAdjacentHTML('afterbegin', templates[type]);

    const buttons = document.createElement('div');
    buttons.classList.add('result__buttons');
    buttons.append(
      this.createButton('ok', () => {
        container.remove();
      }),
      this.createButton('reset', () => {
        this.resetGame();
      }),
    );
    container.append(buttons);

    if (this.elements.notification) {
      this.elements.grid('.result').replaceWith(container);
    } else {
      this.elements.grid.append(container);
    }

    this.elements.notification = container;
  }

  createLeaderboard() {
    const container = document.createElement('div');
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    container.classList.add('leaderboard');
    ul.classList.add('leaderboard__list', 'leaderboard-list');
    li.classList.add('leaderboard-list__item');

    const titles = `
      <li class="leaderboard__fields">
        <span>Time (s)</span>
        <span>Steps</span>
        <span>Field size</span>
        <span>Bombs</span>
      </li>`;

    let results = this.state.lastResults.slice(0);

    results.reverse().forEach((item) => {
      const result = li.cloneNode();
      let liTemplate = '';

      if (item) {
        liTemplate = `
            <span>${(item.timeSpent / 1000).toFixed(2)}</span>
            <span>${item.steps}</span>
            <span>${item.fieldSize}X${item.fieldSize}</span>
            <span>${item.bombsCount}</span>
        `;
      } else {
        liTemplate = `
            <span>--</span>
            <span>--</span>
            <span>--</span>
            <span>--</span>
        `;
      }

      result.insertAdjacentHTML('afterbegin', liTemplate);
      ul.append(result);
    });

    ul.insertAdjacentHTML('afterbegin', titles);

    container.append(
      ul,
      this.createButton('close', () => {
        this.elements.leaderboard.classList.remove('leaderboard_opened');
      }),
    );

    container.addEventListener('click', (e) => {
      const isClickOnOverlay = e.target.classList.contains('leaderboard');
      if (isClickOnOverlay) this.elements.leaderboard.classList.remove('leaderboard_opened');
    });

    this.elements.leaderboard = container;

    return container;
  }

  playAudio(type) {
    const paths = {
      win: './assets/audio/win.mp3',
      loss: './assets/audio/loss.mp3',
      open: './assets/audio/open.mp3',
      flagPlaced: './assets/audio/flag-place.mp3',
      flagRemoved: './assets/audio/flag-remove.mp3',
    };
    this.audio = null;
    this.audio = new Audio(paths[type]);
    this.audio.volume = this.state.volume;
    this.audio.load();
    this.audio.play().then().catch();
  }

  firstStepHandler(cell) {
    const [row, column] = Minesweeper.getCellPosition(cell);
    const isBomb = this.isBomb(cell);
    let isFound = false;

    if (isBomb) {
      this.state.booleanMatrix.forEach((r, i) => {
        r.forEach((c, j) => {
          if (c === false && !isFound) {
            isFound = true;
            [this.state.booleanMatrix[i][j], this.state.booleanMatrix[row][column]] = [
              this.state.booleanMatrix[row][column],
              this.state.booleanMatrix[i][j],
            ];
          }
        });
      });
    }
  }

  handleCellClick = (e) => {
    const target = e.target.closest('.grid__cell');

    if (target) {
      if (this.state.gameOver) return;

      if (!this.state.gameStarted) {
        this.setTimer();
      }

      if (!this.state.openedCells.length) {
        this.firstStepHandler(target);
      }

      if (target.classList.contains('opened') || target.classList.contains('flagged')) return;

      if (this.isBomb(target)) {
        target.classList.add('opened', 'bomb');
        this.state.stepsCount += 1;
        this.elements.gameInfo.stepCounter.lastChild.textContent = this.state.stepsCount;
        this.state.bombPosition = Minesweeper.getCellPosition(target);
        this.gameOver();
        this.createNotification('loss');
        this.playAudio('loss');
        return;
      }

      this.state.stepsCount += 1;
      this.elements.gameInfo.stepCounter.lastChild.textContent = this.state.stepsCount;

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
      this.createNotification('win');
      this.saveWinResult();
      this.elements.leaderboard = null;
      document.body.querySelector('.leaderboard').replaceWith(this.createLeaderboard());
    }
  }

  saveWinResult() {
    this.state.lastResults = this.state.lastResults.slice(1);
    this.state.lastResults.push({
      timestamp: Date.now(),
      timeSpent: this.state.time,
      steps: this.state.stepsCount,
      fieldSize: this.state.size,
      bombsCount: this.state.bombsCount,
    });
  }

  toggleFlag(cell) {
    const { lastChild } = cell;
    const isFlagged = cell.classList.contains('flagged');
    const [row, column] = Minesweeper.getCellPosition(cell);

    if (isFlagged) {
      lastChild.textContent = '';
      cell.classList.remove('flagged');
      this.state.flagsCount -= 1;
      this.state.flaggedCells.pop();
      this.playAudio('flagRemoved');
    } else {
      cell.classList.add('flagged');
      lastChild.textContent = '🚩';
      this.state.flagsCount += 1;
      this.state.flaggedCells.push([row, column]);
      this.playAudio('flagPlaced');
    }

    this.elements.gameInfo.flagCounter.lastChild.textContent = `${this.state.flagsCount.toString()} / ${
      this.state.bombsCount - this.state.flagsCount
    } 💣`;
  }

  setTimer() {
    this.state.gameStarted = true;
    this.timerRef = setInterval(() => {
      this.state.time += 10;

      this.elements.gameInfo.timer.lastChild.textContent = (this.state.time / 1000)
        .toFixed(2)
        .toString();
    }, 10);
  }

  openCell(cell) {
    const [row, column] = Minesweeper.getCellPosition(cell);

    if (cell.classList.contains('flagged') || cell.classList.contains('opened')) return;

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
      flagsCount: 0,
      stepsCount: 0,
      bombPosition: [],
      booleanMatrix: [],
      openedCells: [],
      flaggedCells: [],
    };

    this.audio.src = '';
    this.elements.grid = null;
    this.elements.matrix = null;
    this.elements.notification = null;

    this.elements.gameInfo.timer.lastChild.textContent = '0.00';
    this.elements.gameInfo.flagCounter.lastChild.textContent = `${this.state.flagsCount.toString()} / ${
      this.state.bombsCount - this.state.flagsCount
    } 💣`;
    this.elements.gameInfo.stepCounter.lastChild.textContent = this.state.stepsCount.toString();

    this.state.booleanMatrix = this.createBooleanMatrix();
    this.elements.grid = this.createGrid();
    this.elements.app.querySelector('.grid').replaceWith(this.elements.grid);
    // this.elements.grid.querySelector('.result').remove();
  }

  gameOver() {
    this.state.gameOver = true;
    this.state.gameStarted = false;
    clearInterval(this.timerRef);
    this.showAllBombs();
  }

  showAllBombs() {
    this.elements.matrix.forEach((r) => {
      const row = Array.from(r.children);
      row.forEach((cell) => {
        const isFlagged = cell.classList.contains('flagged');
        const isBomb = this.isBomb(cell);

        if (isFlagged && !isBomb) cell.classList.add('flagged_wrong');

        if (isBomb) {
          const bomb = cell;
          bomb.textContent = '💣';
          bomb.classList.add('opened');
        }
      });
    });
  }

  saveState = () => {
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
