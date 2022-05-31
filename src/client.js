// CLIENT SIDE JS CODE

import { EASE } from "crossani";

function animateCell(x, y) {
  const elem = document.getElementById(`bg-cell-${x}-${y}`);

  elem.doTransition({
    state: {
      "background-color": "#ec2a6a",
      transform: "translateY(-20px)",
      "pointer-events": "none",
    },
    ms: 250,
    easing: EASE.linear,
  });

  setTimeout(() => elem.doTransition({ reset: true }));
}

// this may appear inefficient but it takes 9ms to run on my machine
function calculateDistances(x, y) {
  const cellsByDistance = new Map();

  for (const cell of allTiles) {
    const dist = Math.sqrt((cell[0] - x) ** 2 + (cell[1] - y) ** 2);

    if (cellsByDistance.has(dist)) cellsByDistance.get(dist).push(cell);
    else cellsByDistance.set(dist, [cell]);
  }

  return cellsByDistance;
}

window.handleRippleStart = (x, y) => {
  const sqDistances = calculateDistances(x, y);

  for (const [dist, cells] of sqDistances)
    setTimeout(() => cells.forEach((c) => animateCell(...c)), dist * 150);
};

const parseCoordFromId = (id) => [id.split("-")[2], id.split("-")[3]];

const visibleTiles = Array.from(
  document.getElementById("bg-container").children
)
  .filter(
    (c) =>
      c.style.left.slice(0, -2) > 0 &&
      c.style.left.slice(0, -2) < window.innerWidth
  )
  .map((c) => parseCoordFromId(c.id));

const minCell = visibleTiles.reduce((acc, curr) => [
  Math.min(acc[0], curr[0]),
  Math.min(acc[1], curr[1]),
]);

const maxCell = visibleTiles.reduce((acc, curr) => [
  Math.max(acc[0], curr[0]),
  Math.max(acc[1], curr[1]),
]);

const xRange = maxCell[0] - minCell[0];
const yRange = maxCell[1] - minCell[1];

let nextToAnimate;

setInterval(
  () =>
    nextToAnimate
      ? handleRippleStart(nextToAnimate[0], nextToAnimate[1])
      : handleRippleStart(
          Math.round(Math.random() * xRange + minCell[0]),
          Math.round(Math.random() * yRange + minCell[1])
        ),
  4000
);

let timeouts = 0;

for (const elem of document.getElementById("bg-container").children)
  elem.onmouseover = () => {
    nextToAnimate = parseCoordFromId(elem.id);
    timeouts++;
    setTimeout(() => {
      if (--timeouts === 0) nextToAnimate = null;
    }, 10000);
  };
