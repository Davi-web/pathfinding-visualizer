from fastapi import FastAPI, Request
from typing import Any, List, Optional
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Json
from algorithms import dfs, bfs, dijkstra, astar
from enum import Enum

app = FastAPI(
    title="Pathfinding Visualizer",
    summary="Craft visualized pathways on an m x n board using custom walls for algorithmic exploration.",
    description="We were able to create the algorithms to solve the maze using python and FastAPI.",
    version="0.0.1",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openai.json"
)


class Algorithms(str, Enum):
    dfs = 'dfs'
    bfs = 'bfs'
    dijkstra = 'dijkstra'
    astar = "astar"


class AlgorithmModel(BaseModel):
    board: List[List[int]]
    algorithm: Algorithms
    start: List[int]
    end: List[int]


@app.get('/api/python', description="Endpoint to check that server is running!")
def hello_world():
    return {'message': 'Hello World'}


@app.post('/api/algorithms', description="Returns the path that the algorithm took. Will return an empty array if the algorithm could not find a path from start to finish.")
def algorithms(req: AlgorithmModel):
    start, end, algorithm = req.start, req.end, req.algorithm
    board = req.board
    path = []

    if algorithm is Algorithms.bfs:
        print('Performing BFS Algorithm')
        path = bfs(board, start)
    elif algorithm is Algorithms.dijkstra:
        print('Perfroming Dijkstra Algorithm')
        path = dijkstra(board, start, end)
    elif algorithm is Algorithms.astar:
        print('Performing A* Algorithm')
        path = astar(board, start, end)
    elif algorithm is Algorithms.dfs:
        print('Performing DFS Algorithm')
        path = dfs(board, start)
    return {
        'path': path,
        'valid': len(path) > 0
    }
