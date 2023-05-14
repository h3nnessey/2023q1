const getMinefieldWithNumbers = (matrix) => {
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

      const allDirections = [north, northWest, northEast, west, east, south, southWest, southEast];
      const minesAroundCount = allDirections.reduce(
        (acc, curr) => (curr === true ? acc + 1 : acc),
        0,
      );
      minesField[i].push(minesAroundCount);
    });
  });

  return minesField;
};

export default getMinefieldWithNumbers;
