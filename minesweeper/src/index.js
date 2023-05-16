import Minesweeper from './js/Minesweeper.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.classList.add('container');

  const minesweeper = new Minesweeper(15, 20, container);
  minesweeper.init();
});
