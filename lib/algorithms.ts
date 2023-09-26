export const algorithms = [
  {
    label: 'A*',
    value: 'astar',
    description: "A* is a heuristic-driven pathfinding algorithm that efficiently determines the shortest path in weighted graphs by simultaneously considering both the distance traveled and an estimate of the remaining distance.",
  },
  {
    label: 'Dijkstra',
    value: 'dijkstra',
    description: `Dijkstra's algorithm is a systematic approach for finding the shortest path in weighted graphs. It explores paths without shortcuts, ensuring an exhaustive search for the most efficient route.`,
  },
  {
    label: 'DFS',
    value: 'dfs',
    description: `DFS is like exploring a maze by going as far as you can down one path before doubling back. It's great for exploration and can find paths but might not always be the shortest.`,
  },
  {
    label: 'BFS',
    value: 'bfs',
    description: 'BFS explores all nearby options first, making it good for finding the shortest path in simple scenarios without weights. It&#39;s like checking all doors on one floor before moving up to the next.',
  },
];
