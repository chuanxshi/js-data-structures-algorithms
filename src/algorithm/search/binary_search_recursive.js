import { Compare, defaultCompare, lesserEquals, DOES_NOT_EXIST } from '../../utils.js';
import { quickSort } from '../sort/quick_sort.js';


function binarySearchRecursive(
  array, value, low, high, compareFn = defaultCompare
) {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];
    //如果搜搜到的值小于中间值，我们继续递归
    if (compareFn(element, value) === Compare.LESS_THAN) {
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    //如果搜搜到的值大于中间值，我们继续递归 
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      return binarySearchRecursive(array, value, mid - 1, low, compareFn);
    } else {
    //如果既不大于，也不小于，证明我们找到了值
      return mid;
    }
  }
  // 如果都不是，就返回没找到
  return DOES_NOT_EXIST; 
}

export function binarySearch(array, value, compareFn = defaultCompare) {
  // 这里先使用快排来排序
  const sortedArray = quickSort(array);
  // 这里我们设置高低指针
  const low = 0;
  const high  = sortedArray.length - 1;

  return binarySearchRecursive(array, value, low, high, compareFn);
}