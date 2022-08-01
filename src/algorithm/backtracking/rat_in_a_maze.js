export function ratInAMaze(maze) {
  const solution = [];
  //首先创建一个迷宫矩阵
  for (let i = 0; i < maze.length; i++) { 
    solution[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }
  //每一个老鼠走过的，我们就标记成1
  if (findPath(maze, 0, 0, solution) === true) { 
    // 如果能找到，就返回答案
    return solution;
  }
  // 如果不行，就返回找不到路径
  return 'NO PATH FOUND'; 
}

function findPath(maze, x, y, solution) {
  const n = maze.length;
  // 第一步看验证老鼠有没有到目的地
  if (x === n - 1 && y === n - 1) { 
    solution[x][y] = 1;
    return true;
  }
  // 如果不是最后的位置，我们验证是否可以进到下一个位置
  if (isSafe(maze, x, y) === true) { 
    // 如果可以，就加到路经里
    solution[x][y] = 1; 
    // 我们尝试往右移动
    if (findPath(maze, x + 1, y, solution)) { 
      return true;
    }
    // 如果不成功，我们尝试下移
    if (findPath(maze, x, y + 1, solution)) { 
      return true;
    }
    // 如果右移和下移都不行，我们回溯
    solution[x][y] = 0; 
    return false;
  }
  // 如果怎么都不行，就返回无法找到路径的结果
  return false; 
}

function isSafe(maze, x, y) {
  const n = maze.length;
  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true; 
  }
  return false;
}