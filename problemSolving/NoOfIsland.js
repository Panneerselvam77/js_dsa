// Number of Islands Problem
// Given a grid of 0s and 1s, count distinct islands (connected components of 1s)

// Solution 1: Depth-First Search (DFS)
function numIslandsDFS(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(i, j) {
    // Base cases: out of bounds or water/visited
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === 0) {
      return;
    }

    // Mark as visited by setting to 0
    grid[i][j] = 0;

    // Explore all 4 directions (up, down, left, right)
    dfs(i + 1, j); // down
    dfs(i - 1, j); // up
    dfs(i, j + 1); // right
    dfs(i, j - 1); // left
  }

  // Iterate through each cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        count++; // Found a new island
        dfs(i, j); // Mark entire island as visited
      }
    }
  }

  return count;
}

// Solution 2: Breadth-First Search (BFS)
function numIslandsBFS(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function bfs(startI, startJ) {
    const queue = [[startI, startJ]];
    grid[startI][startJ] = 0; // Mark as visited

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    while (queue.length > 0) {
      const [i, j] = queue.shift();

      // Check all 4 directions
      for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;

        // If valid land cell, add to queue and mark as visited
        if (
          ni >= 0 &&
          ni < rows &&
          nj >= 0 &&
          nj < cols &&
          grid[ni][nj] === 1
        ) {
          grid[ni][nj] = 0;
          queue.push([ni, nj]);
        }
      }
    }
  }

  // Iterate through each cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        count++; // Found a new island
        bfs(i, j); // Mark entire island as visited
      }
    }
  }

  return count;
}

// Test cases
console.log("=== Testing DFS Approach ===");

const grid1 = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];
console.log("Grid 1:");
console.log(grid1);
console.log(
  "Number of islands:",
  numIslandsDFS(JSON.parse(JSON.stringify(grid1)))
);

const grid2 = [
  [1, 1, 1, 1, 0],
  [1, 1, 0, 1, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
console.log("\nGrid 2:");
console.log(grid2);
console.log(
  "Number of islands:",
  numIslandsDFS(JSON.parse(JSON.stringify(grid2)))
);

console.log("\n=== Testing BFS Approach ===");

const grid3 = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];
console.log("Grid 3:");
console.log(grid3);
console.log(
  "Number of islands:",
  numIslandsBFS(JSON.parse(JSON.stringify(grid3)))
);

const grid4 = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1],
];
console.log("\nGrid 4:");
console.log(grid4);
console.log(
  "Number of islands:",
  numIslandsBFS(JSON.parse(JSON.stringify(grid4)))
);
