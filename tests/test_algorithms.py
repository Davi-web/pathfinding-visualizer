import math
from algorithms import *

maze1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
m1start = [1, 1]
m1end = [20, 20]

maze2 = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
]
m2start = [1, 1]
m2end = [5, 1]

maze3 = [
    [1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 3, 0, 0, 1],
    [1, 1, 1, 1, 1]
]

m3start = [1, 1]
m3end = [3, 1]
maze4 = [
    [1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 1, 1, 1, 1]
]
m4start = [1, 1]
m4end = [3, 1]


def test_bfs():
    path = bfs(maze1, m1start)
    assert len(path) > 0
    path = bfs(maze2, m2start)
    assert len(path) > 0
    path = bfs(maze3, m3start)
    assert len(path) > 0
    path = bfs(maze4, m4start)
    assert len(path) == 0


def test_dfs():
    path = dfs(maze1, m1start)
    assert len(path) > 0
    path = dfs(maze2, m2start)
    assert len(path) > 0
    path = dfs(maze3, m3start)
    assert len(path) > 0
    path = dfs(maze4, m4start)
    assert len(path) == 0


def test_astar():
    path = astar(maze1, m1start, m1end)
    assert len(path) > 0
    path = astar(maze2, m2start, m2end)
    assert len(path) > 0
    path = astar(maze3, m3start, m3end)
    assert len(path) > 0
    path = astar(maze4, m4start, m4end)
    assert len(path) == 0


def test_dijkstra():
    path = dijkstra(maze1, m1start, m1end)
    assert len(path) > 0
    path = dijkstra(maze2, m2start, m2end)
    assert len(path) > 0
    path = dijkstra(maze3, m3start, m3end)
    assert len(path) > 0
    path = dijkstra(maze4, m4start, m4end)
    assert len(path) == 0
