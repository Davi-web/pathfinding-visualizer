from fastapi import FastAPI
from typing import Any, List, Optional
from pydantic import BaseModel, Json

from algorithms import dfs, bfs, dijkstra, astar

app = FastAPI(
    title="ChimichangApp",
    description=description,
    summary="Deadpool's favorite app. Nuff said.",
    version="0.0.1",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Deadpoolio the Amazing",
        "url": "http://x-force.example.com/contact/",
        "email": "dp@x-force.example.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)


class AlgorithmModel(BaseModel):
    board: List[List[int]]
    algorithm: str
    start: List[int]
    end: List[int]


@app.get('/api/python')
def hello_world():
    return {'message': 'Hello World'}


@app.post('/api/algorithms')
def algorithms(req: AlgorithmModel):
    start, end, algorithm = req.start, req.end, req.algorithm
    board = req.board
    path = []
    if algorithm == 'bfs':
        path = bfs(board, start)
    elif algorithm == 'dfs':
        path = dfs(board, start)
    elif algorithm == 'dijkstra':
        path = dijkstra(board, start, end)
    elif algorithm == 'astar':
        path = astar(board, start, end)

    # match algorithm:
    #     case 'bfs':
    #         print('Performing BFS Algorithm')
    #         path = bfs(board, start)
    #     case 'dijkstra':
    #         print('Perfroming Dijkstra Algorithm')
    #         path = dijkstra(board, start, end)
    #     case 'astar':
    #         print('Performing A* Algorithm')
    #         path = astar(board, start, end)
    #     case _:
    #         print('Performing DFS Algorithm')
    #         path = dfs(board, start)
    return {
        'path': path,
        'valid': len(path) > 0
    }
