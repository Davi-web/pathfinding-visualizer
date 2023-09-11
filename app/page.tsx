'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
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
  const [size, setSize] = useState([10, 10]);
  const [start, setStart] = useState([1, 1]);
  const [end, setEnd] = useState([size[0] - 2, size[1] - 2]);
  const [algorithm, setAlgorithm] = useState('dfs');
  const [valid, setValid] = useState(false);

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
  const [board, setBoard] = useState(generateBoard(size[0], size[1]));

  enum OnClickState {
    START = 'START',
    WALL = 'WALL',
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
  const handleClick = (row: number, col: number) => {
    switch (onClickState) {
      case OnClickState.START:
        setBoard((prev) => {
          const newBoard = [...prev];
          if (newBoard[row][col] !== 0) return newBoard;
          newBoard[row][col] = 2;
          newBoard[start[0]][start[1]] = 0;
          setStart([row, col]);
          return newBoard;
        });
        break;
      case OnClickState.WALL:
        setBoard((prev) => {
          const newBoard = [...prev];
          if (newBoard[row][col] === 1) {
            newBoard[row][col] = 0;
          } else {
            newBoard[row][col] = 1;
          }
          return newBoard;
        });
        break;
      case OnClickState.END:
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
  const handleState = (state: OnClickState) => {
    if (state === onClickState) {
      setOnClickState(OnClickState.NULL);
      return;
    }
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
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    // Get the div element that was clicked
    const targetDiv = e.target;

    // Add a class (e.g., 'wall') to the div to represent a wall
    if (targetDiv instanceof HTMLDivElement) {
      targetDiv.classList.add('bg-black');
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
    axios
      .post('/api/algorithms', {
        start: start,
        algorithm: algorithm,
        end: end,
        board: board,
      })
      .then((res) => {
        setPath(res.data.path);
        setValid(res.data.valid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //clear the previous path
    const pathElements = document.querySelectorAll('.bg-yellow-300');
    pathElements.forEach((element) => {
      element.classList.remove('bg-yellow-300');
    });
    // end the the visualization if there is no path
    if (!valid) return;
    //add the new path
    //ignore the first and last node
    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        const node = path[i];
        const nodeElement = document.getElementById(
          'node-' + node[0] + '-' + node[1]
        );
        if (nodeElement) {
          nodeElement.classList.add('bg-yellow-300');
        }
      }, 100 * i);
    }
  }, [path, valid]);

  return (
    <main className="flex flex-col min-h-screen justify-start w-full">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Node Path visualizer</CardTitle>
            <CardDescription className="text-center">
              Click the buttons below to change it on the board
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-2 ">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleState(OnClickState.START)}
                className={cn(
                  onClickState === OnClickState.START && 'text-slate-100'
                )}
              >
                Change Start Location
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleState(OnClickState.WALL)}
                className={cn(
                  onClickState === OnClickState.WALL && ' text-slate-100'
                )}
              >
                Add Walls
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleState(OnClickState.END)}
                className={cn(
                  onClickState === OnClickState.END && ' text-slate-100'
                )}
              >
                Change End Location
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default">Algorithms</Button>
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
                          onClick={() => setAlgorithm('bfs')}
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="dfsCheck">DFS</Label>
                        <Input
                          id="dfsCheck"
                          name="algorithm"
                          type="radio"
                          onClick={() => setAlgorithm('dfs')}
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="dijkstra">Dijkstra</Label>
                        <Input
                          id="dijkstra"
                          name="algorithm"
                          onClick={() => setAlgorithm('dijkstra')}
                          type="radio"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="astarButton">A*</Label>
                        <Input
                          id="astarButton"
                          name="algorithm"
                          onClick={() => setAlgorithm('astar')}
                          type="radio"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default">Dimensions</Button>
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
                        >
                          <Check size={26} />
                        </Button>
                      </div>
                      <Label htmlFor="bfsCheck">Start Location</Label>
                      <div className="grid grid-cols-7 items-center gap-4">
                        <Label htmlFor="dfsCheck">x</Label>
                        <Input
                          id="dfsCheck"
                          name="algorithm"
                          className="col-span-2 h-8"
                        />
                        <Label htmlFor="dfsCheck">y</Label>
                        <Input
                          id="dfsCheck"
                          name="algorithm"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={runAlgorithm}>Generate Shortest Path</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col">
        {board.map((row, i) => {
          return (
            <div className="flex justify-center" key={i}>
              {row.map((col, j) => {
                let bgColor = 'bg-green-200';
                if (col === BOARDSTATE.START) {
                  bgColor = 'bg-red-200';
                }
                if (col === BOARDSTATE.END) {
                  bgColor = 'bg-blue-500';
                }
                if (col === BOARDSTATE.WALL) {
                  bgColor = 'bg-black';
                }
                return (
                  <div
                    key={'node-' + i + '-' + j}
                    id={'node-' + i + '-' + j}
                    className={cn(
                      'h-4 w-4 border-[1px] border-red-300',
                      bgColor
                    )}
                    onClick={() => handleClick(i, j)}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={(e) => handleMouseMove(e)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
