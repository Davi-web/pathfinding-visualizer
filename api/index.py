from fastapi import FastAPI
from typing import Any, List, Optional
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Json
from algorithms import dfs, bfs, dijkstra, astar

app = FastAPI(
    title="Pathfinding Visualizer",
    summary="Craft visualized pathways on an m x n board using custom walls for algorithmic exploration.",
    description="We were able to create the algorithms to solve the maze using python and FastAPI.",
    version="0.0.1",
)


class AlgorithmModel(BaseModel):
    board: List[List[int]]
    algorithm: str
    start: List[int]
    end: List[int]


@app.get("/api/docs", description="Endpoint so that Swagger-UI docs are compliant with NextJS and Vercel.")
async def get_docs():
    # Redirect to /docs (relative URL)
    return RedirectResponse(url="/docs", status_code=302)


@app.get("/api/redoc", description="Endpoint so that Swagger-UI docs are compliant with NextJS and Vercel.")
async def get_redoc():
    # Redirect to /redoc (relative URL)
    return RedirectResponse(url="/redoc", status_code=302)


@app.get("/api/openai.json", description="Endpoint so that Swagger-UI docs are compliant with NextJS and Vercel.")
async def openai():
    return RedirectResponse(url="/openai.json", status_code=302)


@app.get('/api/python', description="Endpoint to check that server is running!")
def hello_world():
    return {'message': 'Hello World'}


@app.post('/api/algorithms', description="Returns the path that the algorithm took. Will return an empty array if the algorithm could not find a path from start to finish.")
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
