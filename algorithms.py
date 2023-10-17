from typing import Any, List, Optional
from collections import deque
import heapq


def dfs(board: List[List[int]], start: List[int]):
    stack = []
    stack.append((start[0], start[1]))
    visited = set((start[0], start[1]))
    # (down, right, up, left)
    neighbors = [(1, 0), (0, 1),(-1, 0), (0, -1)]

    path = []

    while stack:
        i, j = stack.pop()
        path.append([i, j])
        # print("[i]: ", i, "[j]: ", j)
        if board[i][j] == 3:
            return path

        for nei in neighbors:
            newI, newJ = nei[0] + i, nei[1] + j
            # print("neighbors: [i]: ", newI, ", [j]: ",
            #       newJ, ", [val]: ", board[newI][newJ])
            if 0 <= newI < len(board) and 0 <= newJ < len(board[0]) and (newI, newJ) not in visited and board[newI][newJ] in [0, 3]:
                stack.append((newI, newJ))
                visited.add((i, j))

    return []


def bfs(board: List[List[int]], start: List[int]):
    queue = deque()
    queue.append((start[0], start[1]))
    visited = set((start[0], start[1]))
    # (down, right, up, left)
    neighbors = [(1, 0), (0, 1),(-1, 0), (0, -1)]
    path = []

    while len(queue) > 0:
        i, j = queue.popleft()
        path.append([i, j])
        # print("[i]: ", i, "[j]: ", j)
        if board[i][j] == 3:
            return path

        for nei in neighbors:
            newI, newJ = nei[0] + i, nei[1] + j
            if 0 <= newI < len(board) and 0 <= newJ < len(board[0]) and (newI, newJ) not in visited and board[newI][newJ] in [0, 3]:
                queue.append((newI, newJ))
                visited.add((newI, newJ))
    return []


def dijkstra(board: List[List[int]], start: List[int], end: List[int]):
    # (down, right, up, left)
    directions = [(1, 0), (0, 1),(-1, 0), (0, -1)]

    m = len(board)
    n = len(board[0])

    # Create a 2D array to store the distance from the start position
    distance = [[float('inf')] * n for _ in range(m)]
    distance[start[0]][start[1]] = 0

    # Create a 2D array to store the parent of each cell
    parent = [[None] * n for _ in range(m)]

    # Create a priority queue to store nodes to be explored
    pq = [(0, start)]
    path = []

    while pq:
        _, current = heapq.heappop(pq)

        # If we've reached the end position, reconstruct and return the path
        if current == end:
            print("HERE")
            while current != start:
                path.append(current)
                current = parent[current[0]][current[1]]
            path.append(start)
            return path[::-1]

        for dx, dy in directions:
            new_x, new_y = current[0] + dx, current[1] + dy

            # Check if the new position is within bounds and not a wall
            if 0 <= new_x < m and 0 <= new_y < n and board[new_x][new_y] != 1:
                cost = distance[current[0]][current[1]] + board[new_x][new_y]

                # If this path is shorter than the previously known distance, update it
                if cost < distance[new_x][new_y]:
                    distance[new_x][new_y] = cost
                    parent[new_x][new_y] = current  # Update the parent
                    heapq.heappush(pq, (cost, [new_x, new_y]))

    # If no path is found, return an empty list
    return []

# Calculate the Manhattan distance between two points a and b


def manhattan_distance(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def astar(board: List[List[int]], start: List[int], end: List[int]):
    # (down, right, up, left)
    directions = [(1, 0), (0, 1),(-1, 0), (0, -1)]

    m = len(board)
    n = len(board[0])

    # Create a 2D array to store the distance from the start position
    distance = [[float('inf')] * n for _ in range(m)]
    distance[start[0]][start[1]] = 0

    # Create a 2D array to store the parent of each cell
    parent = [[None] * n for _ in range(m)]

    # Create a priority queue to store nodes to be explored
    # f = g + h, where g is distance, h is heuristic
    pq = [(0 + manhattan_distance(start, end), start)]

    while pq:
        _, current = heapq.heappop(pq)
        # print(current, _)

        # If we've reached the end position, reconstruct and return the path
        if current == end:
            path = []
            while current != start:
                path.append(current)
                current = parent[current[0]][current[1]]
            path.append(start)
            return path[::-1]

        for dx, dy in directions:
            new_x, new_y = current[0] + dx, current[1] + dy

            # Check if the new position is within bounds
            if 0 <= new_x < m and 0 <= new_y < n and board[new_x][new_y] != 1:
                cost = distance[current[0]][current[1]] + \
                    board[new_x][new_y]

                # If this path is shorter than the previously known distance, update it
                if cost < distance[new_x][new_y]:
                    distance[new_x][new_y] = cost
                    parent[new_x][new_y] = current  # Update the parent

                    # Calculate f = g + h for A* (where g is distance, h is heuristic)
                    f = cost + manhattan_distance((new_x, new_y), end)
                    heapq.heappush(pq, (f, [new_x, new_y]))

    # If no path is found, return an empty list
    return []
