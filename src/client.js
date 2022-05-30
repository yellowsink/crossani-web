// CLIENT SIDE JS CODE

import { EASE } from "crossani";

function animateCell(x, y) {
  const elem = document.getElementById(`bg-cell-${x}-${y}`);

  elem.doTransition({
    state: {
      "background-color": "#ec2a6a",
      transform: "translateY(-20px) scaleY(.5) rotate(45deg)",
    },
    ms: 500,
    easing: EASE.ease,
  });

  setTimeout(() => elem.doTransition({ reset: true }));
}

window.handleBgCellClick = (x, y) => {
  console.log("rippling bg cell", x, y);

  animateCell(x, y);
};