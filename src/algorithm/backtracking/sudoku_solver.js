export function sudokuSolver(matrix) {
  if (solveSudoku(matrix) === true) {
    return matrix;
  }
  return 'NO SOLUTION EXISTS!';
}

const UNASSIGNED = 0;

function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;
  // 第一步先看这个拼图有没有被解决
  for (row = 0; row < matrix.length; row++) { 
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === UNASSIGNED) {
        // 如果有空的格子
        checkBlankSpaces = true; 
        break;
      }
    }
    // 我们退出两个循环
    if (checkBlankSpaces === true) { 
      break;
    }
  }
  // 如果没有空的格子，代表问题已经解决
  if (checkBlankSpaces === false) {
    return true; 
  } 
  // 就会一个个的填空
  for (let num = 1; num <= 9; num++) { 
    // 看是否可以填空
    if (isSafe(matrix, row, col, num)) { 
      // 如果可以，就填
      matrix[row][col] = num; 
      // 再次调用这个函数，尝试下一个有效的位置
      if (solveSudoku(matrix)) { 
        return true;
      }
      // 如果不是对的位置，我们改为空
      matrix[row][col] = UNASSIGNED; 
    }
  }
  // 回溯
  return false; 
}

function isSafe(matrix, row, col, num) {
  return (
    !usedInRow(matrix, row, num) &&
    !usedInCol(matrix, col, num) &&
    !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
  );
}

function usedInRow(matrix, row, num) {
  // 首先我们看这个数字是不是已经存在了
  for (let col = 0; col < matrix.length; col++) { 
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInCol(matrix, col, num) {
  // 下面我们会遍历所有的列验证数字是否在列里
  for (let row = 0; row < matrix.length; row++) { 
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInBox(matrix, boxStartRow, boxStartCol, num) { 
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      // 最后验证是不是在盒子里
      if (matrix[row + boxStartRow][col + boxStartCol] === num) { 
        return true;
      }
    }
  }
  return false;
}