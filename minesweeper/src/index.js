document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.classList.add('container');

  const grid = document.createElement('div');
  grid.classList.add('grid');

  const gridCell = document.createElement('div');
  gridCell.classList.add('grid__cell');

  const fragment = document.createDocumentFragment();
  // from shelter
  const sliceArrayBySize = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      const arr = array.slice(i, i + size);
      result.push(arr);
    }
    return result;
  };
  // from basic-js task
  function minesweeper(matrix) {
    const minesField = [];

    matrix.forEach((row, i) => {
      minesField[i] = [];
      row.forEach((cell, j) => {
        const prevRow = matrix[i - 1];
        const nextRow = matrix[i + 1];
        const north = prevRow ? prevRow[j] : null;
        const northWest = prevRow ? prevRow[j - 1] : null;
        const northEast = prevRow ? prevRow[j + 1] : null;
        const west = row[j - 1] || null;
        const east = row[j + 1] || null;
        const south = nextRow ? nextRow[j] : null;
        const southWest = nextRow ? nextRow[j - 1] : null;
        const southEast = nextRow ? nextRow[j + 1] : null;

        const allDirections = [
          north,
          northWest,
          northEast,
          west,
          east,
          south,
          southWest,
          southEast,
        ];
        const minesAroundCount = allDirections.reduce(
          (acc, curr) => (curr === true ? acc + 1 : acc),
          0,
        );
        minesField[i].push(minesAroundCount);
      });
    });

    return minesField;
  }

  const prepArray = Array(90)
    .fill(false)
    .concat(Array(10).fill(true))
    .sort(() => Math.random() - 0.5);

  const slicedArrBy10 = sliceArrayBySize(prepArray, 10);
  console.log(slicedArrBy10);
  let matrix = minesweeper(slicedArrBy10);

  const result = matrix.map((row, x) => {
    const div = document.createElement('div');
    div.classList.add('grid__row');

    div.append(
      ...row.map((el, y) => {
        const cell = document.createElement('div');
        cell.classList.add('grid__cell');
        cell.dataset.pos = `${x}:${y}`;

        const isBomb = slicedArrBy10[x][y] === true;

        if (isBomb) {
          cell.textContent = '💣';
        } else {
          cell.textContent = matrix[x][y].toString();
        }

        cell.addEventListener('click', (e) => {
          const [posX, posY] = e.target.dataset.pos.split(':');
          console.log(slicedArrBy10[posX][posY], matrix[posX][posY], `x: ${posX}; y: ${posY}`);
        });
        return cell;
      }),
    );

    return div;
  });

  fragment.append(...result);
  grid.append(fragment);
  container.append(grid);
  document.body.append(container);
});
