const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;
const cellSize = 10;
const cols = canvas.width / cellSize;
const rows = canvas.height / cellSize;

let grid = populateGrid();

function populateGrid() {
  return new Array(cols).fill(null)
    .map(() => new Array(rows).fill(null)
      .map(() => Math.floor(Math.random() * 2)));
}

function update(grid) {
  const nextGeneration = grid.map(arr => [...arr]);

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numAdjacent = 0;

      // Check adjacent cells
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          if (x === 0 && y ===0) {
            continue;
          }
          const xCell = col + x;
          const yCell = row + y;

          if (xCell >= 0 && yCell >= 0 && xCell < cols && yCell < rows) {
            const adjacentCell = grid[col + x][row + y];
            numAdjacent += adjacentCell;
          }
        }
      }

      if (cell === 1 && (numAdjacent < 2 || numAdjacent > 3)) {
        nextGeneration[col][row] = 0;
      } else if (cell === 0 && numAdjacent === 3) {
        nextGeneration[col][row] = 1;
      }
    }
  }
  return nextGeneration;
}

function draw(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      
      ctx.beginPath();
      ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
    }
  }
}

function step() {
  grid = update(grid);
  draw(grid);
  requestAnimationFrame(step);
}


requestAnimationFrame(step);