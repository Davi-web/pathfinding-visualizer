from fastapi import FastAPI
from typing import Any, List, Optional
from pydantic import BaseModel, Json

from algorithms import dfs, bfs, dijkstra, astar

app = FastAPI()


class Body(BaseModel):
    board: List[List[int]]
    algorithm: str
    start: List[int]
    end: List[int]


@app.get('/api/python')
def hello_world():
    return {'message': 'Hello World'}


@app.post('/api/algorithms')
def algorithms(req: Body):
    start, end, algorithm = req.start, req.end, req.algorithm
    board = req.board

    match algorithm:
        case 'dfs':
            print('Performing DFS Algorithm')
            path = dfs(board, start)
        case 'bfs':
            print('Performing BFS Algorithm')
            path = bfs(board, start)
        case 'dijkstra':
            print('Perfroming Dijkstra Algorithm')
            path = dijkstra(board, start, end)
        case 'astar':
            print('Performing A* Algorithm')
            path = astar(board, start, end)
    return {
        'path': path,
        'valid': len(path) > 0
    }
