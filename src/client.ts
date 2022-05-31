import "crossani";

function animateCell(x: number, y: number) {
  const elem = document.getElementById(`bg-cell-${x}-${y}`);

  if (!elem) return;

  elem.doTransition({
    state: {
      "background-color": "#ec2a6a",
      transform: "translateY(-20px)",
      "pointer-events": "none",
    },
    ms: 250,
  });

  elem.doTransition({ reset: true });
}

// this may appear inefficient but it takes 9ms to run on my machine
function calculateDistances(x: number, y: number) {
  const cellsByDistance = new Map<number, [[number, number]]>();

  // @ts-expect-error
  for (const cell of allTiles) {
    const dist = Math.sqrt((cell[0] - x) ** 2 + (cell[1] - y) ** 2);

    if (cellsByDistance.has(dist)) cellsByDistance.get(dist).push(cell);
    else cellsByDistance.set(dist, [cell]);
  }

  return cellsByDistance;
}

function handleRippleStart(x: number, y: number) {
  const sqDistances = calculateDistances(x, y);

  for (const [dist, cells] of sqDistances)
    setTimeout(() => cells.forEach((c) => animateCell(...c)), dist * 150);
}

const parseCoordFromId = (id: string): [number, number] => [
  parseInt(id.split("-")[2]),
  parseInt(id.split("-")[3]),
];

let previousInterval: number;
// @ts-expect-error
window.beginAnimating = () => {
  if (previousInterval !== undefined) clearInterval(previousInterval);

  // @ts-expect-error
  if (!window.allTiles) return setTimeout(beginAnimating);

  // @ts-expect-error
  const maxCell = allTiles.reduce((acc, curr) => [
    Math.max(acc[0], curr[0]),
    Math.max(acc[1], curr[1]),
  ]);
  let nextToAnimate: [number, number];

  previousInterval = setInterval(
    () =>
      nextToAnimate
        ? handleRippleStart(nextToAnimate[0], nextToAnimate[1])
        : handleRippleStart(
            Math.round(Math.random() * maxCell[0]),
            Math.round(Math.random() * maxCell[1])
          ),
    4000
  );

  let timeouts = 0;

  for (const elem of document.getElementById("bg-container").children)
    if (elem instanceof HTMLElement)
      elem.onmouseover = () => {
        nextToAnimate = parseCoordFromId(elem.id);
        timeouts++;
        setTimeout(() => {
          if (--timeouts === 0) nextToAnimate = null;
        }, 10000);
      };
};