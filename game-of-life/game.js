export const game = {
  isAlive : false
};

export function isAlive(cell, neighbours) {
  return (!Boolean(cell) && neighbours === 3) || (Boolean(cell) && neighbours === 2)  ? 1 : 0;
}

export function generate(count) {
  return new Array(count * count).fill(0);
}

export function regenerate(cells) {
  return cells.map((cell, index) => isAlive(cell, countNeighbours(cells, index)));
}

const add = (...args) => args.reduce((acc, current) => acc + (current || 0), 0);

const leftColumnValues = (index, width, cells) =>
  index % width
    ? [cells[index - 1], cells[index - width - 1], cells[index + width - 1]]
    : [];

const rightColumnValues = (index, width, cells) =>
  (index + 1) % width
    ? [cells[index + 1], cells[index - width + 1], cells[index + width + 1]]
    : [];

export const countNeighbours = (cells, index) => {
  const width = Math.sqrt(cells.length);
  return add(
    cells[index - width],
    cells[index + width],
    ...leftColumnValues(index, width, cells),
    ...rightColumnValues(index, width, cells)
  );
};

export function drawGrid(cells) {
  const grid = document.getElementById('grid');
  const container = createElement('container');
  let row;
  const width = Math.sqrt(cells.length);
  cells.forEach((cell, index) => {
    if(index % width === 0) {
      row = createElement('row');
      container.appendChild(row);
    }
    const cellEle = createElement(`cell ${cell ? 'live' : 'dead'}`);
    row.appendChild(cellEle);
  });
  grid.appendChild(container);
}

const createElement = className => {
  const element = document.createElement('div');
  element.className = className;
  return element;
}

export function attachGridEventHandler() {
  document.getElementById("grid").addEventListener("click", (e) => {
    const className = e.target.className;
    e.target.className = className.includes("dead") 
                        ? className.replace("dead", "live")
                        : className.replace("live", "dead");                     
  });
}

export function getCellsFromDom() {
  return Array.from(document.querySelectorAll(".cell"))
  .map(item => item.className.includes('dead') ? 0 : 1);
}

export function start(){
  let generation = getCellsFromDom();
  setInterval(() => {
    generation = regenerate(generation);
    drawGrid();
  }, 500);
}