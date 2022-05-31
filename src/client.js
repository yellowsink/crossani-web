// CLIENT SIDE JS CODE

import { EASE } from "crossani";

function animateCell(x, y) {
  const elem = document.getElementById(`bg-cell-${x}-${y}`);

  elem.doTransition({
    state: {
      "background-color": "#ec2a6a",
      transform: "translateY(-20px)",
      "pointer-events": "none"
    },
    ms: 500,
    easing: EASE.ease,
  });

  setTimeout(() => elem.doTransition({ reset: true }));
}

// this may appear inefficient but it takes 9ms to run on my machine
function calculateSquaredDistances(x, y) {
  const cellsByDistance = new Map();

  for (const cell of allTiles) {
    if (cell[0] === x && cell[1] === y) continue;

    const dist = (cell[0] - x) ** 2 + (cell[1] - y) ** 2;

    if (cellsByDistance.has(dist))
      cellsByDistance.get(dist).push(cell);
    else cellsByDistance.set(dist, [cell]);
  }

  return cellsByDistance;
}

window.handleBgCellClick = (x, y) => {
  animateCell(x, y);
  const sqDistances = calculateSquaredDistances(x, y);

  for (const [dist, cells] of sqDistances)
    setTimeout(() => cells.forEach(c => animateCell(...c)), dist * 3);
};