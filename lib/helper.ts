

import { createRoot } from "react-dom/client";

const generateBoard = (m: number, n: number) => {
    const board = [];
    for (let i = 0; i < m; i++) {
      //push divs into board
      const row = [];
      for (let j = 0; j < n; j++) {
        if (i === 1 && j === 1) {
          row.push(2);
        } else if (i === m - 2 && j === n - 2) {
          row.push(3);
        } else if (i == 0 || j == 0 || i == m - 1 || j == n - 1) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
      board.push(row);
    }
    return board;
  };
const clearAnimations = () => {
    const pathElements = document.querySelectorAll('.bg-purple-400');
    pathElements.forEach((element) => {
      element.classList.remove('bg-purple-400');
      createRoot(element).unmount();
    });
  };

export {generateBoard,clearAnimations}