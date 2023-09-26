'use client'
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { OnClickState } from '@/lib/enums';


const useBoard = () => {
  const [size, setSize] = useState([22, 22]);
  const [start, setStart] = useState([1, 1]);
  const [end, setEnd] = useState([size[0] - 2, size[1] - 2]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [onClickState, setOnClickState] = useState<OnClickState>();

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
      element.classList.remove("animate-pulse")
      element.classList.remove("text-yellow-200")
      createRoot(element).unmount();
    });
  };

  const generateRandomBoard = (m: number, n: number) => {
    // generate random board with 0 for path and 1 for wall 2 for start and 3 for end, the edges are all walls
    clearBoard();
    setBoard((prev) => {
      const newBoard = [...prev];
      for (let i = 1; i < newBoard.length - 1; i++) {
        for (let j = 1; j < newBoard[i].length - 1; j++) {
          if (newBoard[i][j] === 2 || newBoard[i][j] === 3) continue;
          const random = Math.random();
          if (random < 0.3) {
            newBoard[i][j] = 1;
          }

          const node = document.getElementById('node-' + i + '-' + j);
          if (node) {
            node.classList.remove('bg-purple-400');
            createRoot(node).unmount();
          }
        }
      }
      return newBoard;
    });
  };
  const [board, setBoard] = useState(generateBoard(size[0], size[1]));

  const changeBoardSize = () => {
    clearAnimations();
    setBoard(generateBoard(size[0], size[1]));
    setEnd([size[0] - 2, size[1] - 2]);
    setStart([1, 1]);
  };

  const clearBoard = () => {
    clearAnimations();
    setBoard((prev) => {
      const newBoard = [...prev];
      for (let i = 1; i < newBoard.length - 1; i++) {
        for (let j = 1; j < newBoard[i].length - 1; j++) {
          if (newBoard[i][j] === 1) {
            newBoard[i][j] = 0;
          }
          const node = document.getElementById('node-' + i + '-' + j);
          if (node) {
            node.classList.remove('bg-purple-400');
          }
        }
      }
      return newBoard;
    });
  };
  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    console.log('mouse up');
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent, row: number, col: number) => {
    const node = document.getElementById('node-' + row + '-' + col);
    if (!node) return;
    if (!isDrawing) return;
    clearAnimations();
    switch (onClickState) {
      case OnClickState.ADD_WALL:
        setBoard((prev) => {
          const newBoard = [...prev];
          if (newBoard[row][col] === 0) {
            newBoard[row][col] = 1;
          }
          return newBoard;
        });
        break;
      case OnClickState.REMOVE_WALL:
        setBoard((prev) => {
          const newBoard = [...prev];
          if (
            row === 0 ||
            col === 0 ||
            row === newBoard.length - 1 ||
            col === newBoard[0].length - 1
          )
            return newBoard;
          if (newBoard[row][col] === 1) {
            newBoard[row][col] = 0;
          }
          return newBoard;
        });
        break;
    }
  };

  const handleClick = (row: number, col: number) => {
    const node = document.getElementById('node-' + row + '-' + col);
    if (!node) return;
    switch (onClickState) {
      case OnClickState.ADD_WALL:
        clearAnimations();
        setBoard((prev) => {
          const newBoard = [...prev];
          if (newBoard[row][col] !== 0) return newBoard;
          newBoard[row][col] = 1;
          return newBoard;
        });
        break;
      case OnClickState.REMOVE_WALL:
        clearAnimations();
        setBoard((prev) => {
          const newBoard = [...prev];
          if (
            row === 0 ||
            col === 0 ||
            row === newBoard.length - 1 ||
            col === newBoard[0].length - 1
          )
            return newBoard;
          if (newBoard[row][col] !== 1) return newBoard;
          newBoard[row][col] = 0;
          return newBoard;
        });
        break;

      case OnClickState.START:
        clearAnimations();
        setBoard((prev) => {
          const newBoard = [...prev];
          if (newBoard[row][col] !== 0) return newBoard;
          newBoard[row][col] = 2;
          newBoard[start[0]][start[1]] = 0;
          setStart([row, col]);
          return newBoard;
        });

        break;
      case OnClickState.END:
        clearAnimations();
        setBoard((prev) => {
          const newBoard = [...prev];
          if (newBoard[row][col] !== 0) return newBoard;
          newBoard[row][col] = 3;
          newBoard[end[0]][end[1]] = 0;
          setEnd([row, col]);
          return newBoard;
        });

        break;
    }
  };

  return {
    board,
    start,
    end,
    changeBoardSize,
    generateRandomBoard,
    clearBoard,
    clearAnimations,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleClick,
    size,
    setSize,
    onClickState,
    setOnClickState
  };
};

export default useBoard;
