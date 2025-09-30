
 let gameLoop;



  const isAlive = (cell, neighbours) => {
    return neighbours === 3 || (Boolean(cell) && neighbours === 2) ? 1 : 0;
  };

  const generate = (count) => {
    return new Array(count * count).fill(0);
  };

  const regenerate = (cells) => {
    return cells.map((cell, index) => isAlive(cell, countNeighbours(cells, index)));
  };

  const countNeighbours = (cells, index) => {
    const width = Math.sqrt(cells.length);
    return add(
      cells[index - width],
      cells[index + width],
      ...leftColumnValues(index, width, cells),
      ...rightColumnValues(index, width, cells)
    );
  };

  const drawGrid = (cells) => {
    const grid = document.getElementById('grid');
    grid.innerHTML = ""; // clear old grid
    const container = createElement('container');
    let row;
    const width = Math.sqrt(cells.length);
    cells.forEach((cell, index) => {
      if (index % width === 0) {
        row = createElement('row');
        container.appendChild(row);
      }
      const cellEle = createElement(`cell ${cell===0 ? 'dead' : 'live'}`);
      row.appendChild(cellEle);
    });
    grid.appendChild(container);
  };

  const attachGridEventHandler = () => {
    document.getElementById("grid").addEventListener("click", (e) => {
      const className = e.target.className;
      e.target.className = className.includes("dead")
        ? className.replace("dead", "live")
        : className.replace("live", "dead");
    });
  };

  const getCellsFromDom = () => {
    return Array.from(document.querySelectorAll(".cell"))
      .map(item => item.className.includes('dead') ? 0 : 1);
  };

 

  const start = () => {
    let generation = game.getCellsFromDom();
    gameLoop = setInterval(() => {
      console.log("next generation");
      
      generation = game.regenerate(generation);
      game.drawGrid(generation);
    }, 500);
  };

  const stop = () => {
    clearInterval(gameLoop);
  };


// helper functions kept private
const add = (...args) => args.reduce((acc, current) => acc + (current || 0), 0);

const leftColumnValues = (index, width, cells) =>
  index % width
    ? [cells[index - 1], cells[index - width - 1], cells[index + width - 1]]
    : [];

const rightColumnValues = (index, width, cells) =>
  (index + 1) % width
    ? [cells[index + 1], cells[index - width + 1], cells[index + width + 1]]
    : [];

const createElement = className => {
  const element = document.createElement('div');
  element.className = className;
  return element;
};

window.game = {
  isAlive,
  generate,
  regenerate,
  countNeighbours,
  drawGrid,
  attachGridEventHandler,
  getCellsFromDom,
  start,
  stop
};

