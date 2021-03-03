const BOMB = '*';
const SPACE = '.';

const fillBombCount = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (isBomb(grid[x][y])) {
        incrementNeighbors(grid, x, y);
      }
    }
  }
  
  return grid;
}

const isOutOfBounds = (grid, x, y) => {
  if (x < 0 || y < 0) return true;
  if (x >= grid.length || y >= grid[0].length) return true;
  return false;
}
const isItself = (x, y, x_, y_) => x === x_ && y === y_;

const incrementNeighbors = (grid, x, y) => {
  for (const i of [-1, 0, 1]) {
    for (const j of [-1, 0, 1]) {
      const neighborX = x + i;
      const neighborY = y + j;
      if (isItself(x, y, neighborX, neighborY)) continue;
      if (isOutOfBounds(grid, neighborX, neighborY)) continue;
      if (isBomb(grid[neighborX][neighborY])) continue;
      
      if (isSpace(grid[neighborX][neighborY])) grid[neighborX][neighborY] = 1;
      else grid[neighborX][neighborY] += 1;
    }
  }
}

const generateMinesweep = (rows, cols, bombs) => {
  const grid = Array(rows).fill().map(_ => Array(cols).fill(SPACE));

  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    const [x, y] = randomCoords(rows, cols);
    if (isSpace(grid[x][y])) {
      grid[x][y] = BOMB;
      bombsPlaced++;
    }
  }

  return fillBombCount(grid);
}

// const generateFullGame = (rows, cols, bombs) => {
//   const grid = generateMinesweep(rows, cols, bombs);
//   return gameFromGrid(grid);
// }

const gameFromGrid = (grid) => {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      grid[x][y] = { open: false, content: grid[x][y] }
    }
  }
  return grid;
}

const openCell = (game, x, y) => {
  if (isBomb(game[x][y].content)) return { game, died: true };

  game[x][y].open = true;
  if (isSpace(game[x][y].content)) {
    openNeighbors(game, x, y);
  }
  return { game, died: false };
} 

const openNeighbors = (game, x, y) => {
  for (const i of [-1, 0, 1]) {
    for (const j of [-1, 0, 1]) {
      const neighborX = x + i;
      const neighborY = y + j;
      if (isItself(x, y, neighborX, neighborY)) continue;
      if (isOutOfBounds(game, neighborX, neighborY)) continue;
      if (game[neighborX][neighborY].open) continue;

      game[neighborX][neighborY].open = true;
      if (isSpace(game[neighborX][neighborY].content)) openNeighbors(game, neighborX, neighborY);
    }
  }
}

const randomCoords = (xLimit, yLimit) => [randomInt(xLimit), randomInt(yLimit)];
const randomInt = (max) => Math.floor(Math.random() * max)

const isBomb = (element) => element === BOMB;
const isSpace = (element) => element === SPACE;

module.exports = { BOMB, SPACE, fillBombCount, generateMinesweep, gameFromGrid, openCell }
