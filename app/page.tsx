'use client';

import Image from 'next/image';
import { createRoot } from 'react-dom/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Settings } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { set, useForm } from 'react-hook-form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from '@/components/ui/use-toast';

import { ChevronsUpDown, Check } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { MoveUp } from 'lucide-react';

const algorithms = [
  { label: 'A*', value: 'astar' },
  { label: 'Dijkstra', value: 'dijkstra' },
  { label: 'DFS', value: 'dfs' },
  { label: 'BFS', value: 'bfs' },
] as const;

const FormSchema = z.object({
  algorithm: z.string({
    required_error: 'Please select an algorithm.',
  }),
  start: z.array(z.number()).min(2),
  end: z.array(z.number()).min(2),
  board: z.array(z.array(z.number())),
});

type state = {
  row: number;
  col: number;
  isStart: boolean;
  isclicked: boolean;
  isWall: boolean;
  isEnd: boolean;
};

export default function Home() {
  const [size, setSize] = useState([30, 30]);
  const [start, setStart] = useState([1, 1]);
  const [end, setEnd] = useState([size[0] - 2, size[1] - 2]);
  const [algorithm, setAlgorithm] = useState('astar');
  const [disabled, setDisabled] = useState(false);

  const [path, setPath] = useState([]);
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

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const clearBoard = () => {
    setPath([]);
    setBoard((prev) => {
      const newBoard = [...prev];
      for (let i = 1; i < newBoard.length - 1; i++) {
        for (let j = 1; j < newBoard[i].length - 1; j++) {
          if (newBoard[i][j] === 1) {
            newBoard[i][j] = 0;
          }
          const node = document.getElementById('node-' + i + '-' + j);
          if (node) {
            node.classList.remove('bg-yellow-400');
            createRoot(node).unmount();
          }
        }
      }
      return newBoard;
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
            node.classList.remove('bg-yellow-400');
          }
        }
      }
      return newBoard;
    });
  };
  const [board, setBoard] = useState(generateBoard(size[0], size[1]));

  enum OnClickState {
    START = 'START',
    REMOVE_WALL = 'REMOVE_WALL',
    ADD_WALL = 'ADD_WALL',
    END = 'END',
    NULL = 'NULL',
  }

  enum BOARDSTATE {
    EMPTY = 0,
    WALL = 1,
    START = 2,
    END = 3,
  }
  const [onClickState, setOnClickState] = useState<OnClickState>();
  const handleState = (state: OnClickState) => {
    if (state === onClickState) {
      setOnClickState(OnClickState.NULL);
      return;
    }

    toast({
      title: 'You are changing: ' + state,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-auto">
          <code className="text-white">
            {`Click${
              state === OnClickState.ADD_WALL ||
              state === OnClickState.REMOVE_WALL
                ? ' or drag'
                : ''
            } to change the ${state} location`}
          </code>
        </pre>
      ),
    });
    setOnClickState(state);
  };

  // const form = useForm<z.infer<typeof FormSchema>>({
  // resolver: zodResolver(FormSchema),
  // });
  const [isDrawing, setIsDrawing] = useState(false);
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

    switch (onClickState) {
      case OnClickState.ADD_WALL:
        clearAnimations();
        setBoard((prev) => {
          const newBoard = [...prev];
          if (newBoard[row][col] === 0) {
            newBoard[row][col] = 1;
          }
          return newBoard;
        });
        node.classList.add('bg-black');
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
          if (newBoard[row][col] === 1) {
            newBoard[row][col] = 0;
          }
          return newBoard;
        });
        if (!node.classList.contains('wall')) {
          node.classList.remove('bg-black');
        }
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
        node.classList.add('bg-black');
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
        if (!node.classList.contains('wall')) {
          node.classList.remove('bg-black');
        }

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
        if (!node.classList.contains('bg-black')) {
          node.classList.add('bg-red-500');
        }
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
        if (!node.classList.contains('bg-black')) {
          node.classList.add('bg-blue-500');
        }
        break;
    }
  };
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const runAlgorithm = () => {
    console.log('Running algorithm');
    setDisabled(true);
    axios
      .post('/api/algorithms', {
        start: start,
        algorithm: algorithm,
        end: end,
        board: board,
      })
      .then((res) => {
        setPath(res.data.path);

        if (!res.data.valid) {
          toast({
            title: 'No Path Found',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-auto">
                <code className="text-white">{JSON.stringify(res.data)}</code>
              </pre>
            ),
          });
          return;
        }

        toast({
          title: 'We Found a Path!',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-auto">
              <code className="text-white">{JSON.stringify(res.data)}</code>
            </pre>
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearAnimations = () => {
    const pathElements = document.querySelectorAll('.bg-purple-400');
    pathElements.forEach((element) => {
      element.classList.remove('bg-purple-400');
      createRoot(element).unmount();
    });
  };

  useEffect(() => {
    //clear the previous path to restart the animation
    clearAnimations();
    // end the the visualization if there is no path
    if (path.length === 0) {
      return;
    }
    //add the new path
    //ignore the first and last node
    // we will also inform the direction of the path
    const stack = [
      'bg-yellow-400',
      'bg-purple-400',
      'bg-green-400',
      'bg-rose-400',
    ];
    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        const node = path[i];

        const nodeElement = document.getElementById(
          'node-' + node[0] + '-' + node[1]
        );
        const prevNode = path[i - 1];
        const prevNodeElement = document.getElementById(
          'node-' + prevNode[0] + '-' + prevNode[1]
        );
        let direction = [0, 0];

        if (nodeElement && prevNodeElement) {
          direction = [node[0] - prevNode[0], node[1] - prevNode[1]];
          if (direction[0] > 0 && direction[1] === 0) {
            // move down
            createRoot(nodeElement).render(
              <MoveUp
                size={10}
                className="transform flex justify-center rotate-180"
              />
            );
          } else if (direction[0] < 0 && direction[1] === 0) {
            //move up

            createRoot(nodeElement).render(
              <MoveUp
                size={10}
                className="transform flex justify-center rotate-0"
              />
            );
          } else if (direction[0] === 0 && direction[1] > 0) {
            // move right
            createRoot(nodeElement).render(
              <MoveUp
                size={10}
                className="transform flex justify-center rotate-90"
              />
            );
          } else if (direction[0] === 0 && direction[1] < 0) {
            // move left
            createRoot(nodeElement).render(
              <MoveUp size={10} className="transform -rotate-90" />
            );
          } else if (direction[0] > 0 && direction[1] > 0) {
            createRoot(nodeElement).render(
              <MoveUp
                size={10}
                className="transform flex justify-center rotate-135"
              />
            );
          } else if (direction[0] < 0 && direction[1] < 0) {
            createRoot(nodeElement).render(
              <MoveUp
                size={10}
                className="transform flex justify-center rotate-315"
              />
            );
          } else if (direction[0] < 0 && direction[1] < 0) {
            createRoot(nodeElement).render(
              <MoveUp
                size={10}
                className="transform flex justify-center rotate-225"
              />
            );
          } else if (direction[0] < 0 && direction[1] > 0) {
            createRoot(nodeElement).render(
              <MoveUp
                size={10}
                className="transform flex justify-center rotate-45"
              />
            );
          }

          nodeElement.classList.add(stack[1]);
        }
        if (i === path.length - 2) {
          setDisabled(false);
        }
      }, 20 * i);
    }
  }, [path]);

  return (
    <main className="flex flex-col min-h-screen justify-start w-full">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Node Path visualizer</CardTitle>
            <CardDescription className="text-center">
              Visualize different path finding algorithms by creating your own
              board
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleState(OnClickState.START)}
                disabled={disabled}
                className={cn(
                  onClickState === OnClickState.START &&
                    'bg-red-500 hover:bg-red-400'
                )}
              >
                Change Start Location
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default" disabled={disabled}>
                    Dimensions
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="">Board</Label>

                      <div className="grid grid-cols-8 items-center gap-4">
                        <Label htmlFor="">x</Label>
                        <Input
                          id="x-input"
                          name="x"
                          className="col-span-2 h-8"
                          type="number"
                          value={size[0]}
                          onChange={(e) => {
                            setSize((prev) => [
                              parseInt(e.target.value),
                              prev[1],
                            ]);
                          }}
                        />
                        <Label htmlFor="">y</Label>
                        <Input
                          id="y-input"
                          name="y"
                          type="number"
                          value={size[1]}
                          onChange={(e) => {
                            setSize((prev) => [
                              prev[0],
                              parseInt(e.target.value),
                            ]);
                          }}
                          className="col-span-2 h-8"
                        />
                        <Button
                          variant={'secondary'}
                          size={'sm'}
                          className="col-span-2"
                          onClick={() => {
                            setBoard(generateBoard(size[0], size[1]));
                            setEnd([size[0] - 2, size[1] - 2]);
                            setStart([1, 1]);
                          }}
                          disabled={disabled}
                        >
                          <Check size={26} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="default"
                size="sm"
                onClick={() => handleState(OnClickState.END)}
                className={cn(
                  onClickState === OnClickState.END &&
                    ' bg-blue-500 hover:bg-blue-400'
                )}
                disabled={disabled}
              >
                Change End Location
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default" disabled={disabled}>
                    Algorithms
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="bfsCheck">BFS</Label>
                        <Input
                          id="bfsCheck"
                          name="algorithm"
                          type="radio"
                          className="col-span-2 h-8"
                          checked={algorithm === 'bfs'}
                          onChange={() => setAlgorithm('bfs')}
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="dfsCheck">DFS</Label>
                        <Input
                          id="dfsCheck"
                          name="algorithm"
                          type="radio"
                          value={algorithm}
                          onChange={() => setAlgorithm('dfs')}
                          checked={algorithm === 'dfs'}
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="dijkstra">Dijkstra</Label>
                        <Input
                          id="dijkstra"
                          name="algorithm"
                          onChange={() => setAlgorithm('dijkstra')}
                          checked={algorithm === 'dijkstra'}
                          type="radio"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="astarButton">A*</Label>
                        <Input
                          id="astarButton"
                          name="algorithm"
                          onChange={() => setAlgorithm('astar')}
                          checked={algorithm === 'astar'}
                          type="radio"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleState(OnClickState.ADD_WALL)}
                className={cn(
                  onClickState === OnClickState.ADD_WALL &&
                    ' bg-red-500 hover:bg-red-400'
                )}
                disabled={disabled}
              >
                Add Walls
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleState(OnClickState.REMOVE_WALL)}
                className={cn(
                  onClickState === OnClickState.REMOVE_WALL &&
                    ' bg-red-500 hover:bg-red-400'
                )}
                disabled={disabled}
              >
                Remove Walls
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <Button
              onClick={() => generateRandomBoard(size[0], size[1])}
              disabled={disabled}
            >
              Generate Random Board
            </Button>
            <Button onClick={() => clearBoard()} disabled={disabled}>
              Clear Board
            </Button>
            <Button onClick={runAlgorithm} disabled={disabled}>
              Visualize Path
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col mt-4 justify-center" id="board">
        <div className="flex justify-center">
          {onClickState === OnClickState.START ? (
            <div className="flex flex-row items-center">
              <ChevronsUpDown size={32} />
              <p>Click on a node to set the start location</p>
              <ChevronsUpDown size={32} />
            </div>
          ) : onClickState === OnClickState.END ? (
            <div className="flex flex-row items-center">
              <ChevronsUpDown size={32} />
              <p>Click on a node to set the end location</p>

              <ChevronsUpDown size={32} />
            </div>
          ) : onClickState === OnClickState.ADD_WALL ? (
            <div className="flex flex-row items-center">
              <ChevronsUpDown size={32} />
              <p>Click and drag to add walls</p>
              <ChevronsUpDown size={32} />
            </div>
          ) : onClickState === OnClickState.REMOVE_WALL ? (
            <div className="flex flex-row items-center">
              <ChevronsUpDown size={32} />
              <p>Click and drag to remove walls</p>
              <ChevronsUpDown size={32} />
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <ChevronsUpDown size={32} />
              <p>Visualizo.io</p>
              <ChevronsUpDown size={32} />
            </div>
          )}
        </div>
        <div className={cn(' rounded-lg flex flex-col justify-center')}>
          {board.map((row, i) => {
            return (
              <div className="flex justify-center" key={i}>
                {row.map((col, j) => {
                  let bgColor = 'bg-green-200';
                  if (col === BOARDSTATE.START) {
                    bgColor = 'bg-red-500';
                  }
                  if (col === BOARDSTATE.END) {
                    bgColor = 'bg-blue-500';
                  }
                  if (col === BOARDSTATE.WALL) {
                    bgColor = 'bg-black';
                  }
                  let wall = '';
                  if (col === BOARDSTATE.WALL) {
                    wall = 'wall';
                  }
                  return (
                    <div
                      key={'node-' + i + '-' + j}
                      id={'node-' + i + '-' + j}
                      className={cn('h-3 w-3', bgColor, wall)}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      onMouseMove={(e) => handleMouseMove(e, i, j)}
                      onClick={() => handleClick(i, j)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Toaster />
    </main>
  );
}
