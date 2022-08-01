import { Compare, defaultCompare, swap } from '../../utils.js';

export function countingSort(array) {
  // 如果没有或只有一个元素，就不需要排序
  if (array.length < 2) { 
    return array;
  }
  // 我们要找到最大数
  const maxValue = findMaxValue(array); 
  // 我们需要创建一个计数数组，从0开始直到最大数+1的索引
  const counts = new Array(maxValue + 1); 
  array.forEach(element => {
    // 如果第一次计数还没有初始化，会赋值为零
    if (!counts[element]) { 
      counts[element] = 0;
    }
    // 迭代每一个数组位，元素计数增加到计数数组中
    counts[element]++; 
  });
  // 声明一个辅助索引帮助我们给结果数组索引赋值
  let sortedIndex = 0;
  counts.forEach((count, i) => {
    // 直到数字变零
    while (count > 0) { 
      // 把i值加到结果数组中
      array[sortedIndex++] = i; 
      // 递减计数
      count--; 
    }
  });
  return array;
}

function findMaxValue(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}