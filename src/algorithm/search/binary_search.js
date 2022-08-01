import { Compare, defaultCompare, lesserEquals, DOES_NOT_EXIST } from '../../utils.js';
import { quickSort } from '../sort/quick_sort.js';

export function binarySearch(array, value, compareFn = defaultCompare) {
  // 这里先使用快排来排序
  const sortedArray = quickSort(array); 
  // 这里我们设置高低指针
  let low = 0; 
  let high = sortedArray.length - 1; 
  // 当低指针低于高指针的时候，低指针大于高指针，代表这个数不存在
  while (lesserEquals(low, high, compareFn)) { 
    // 寻找中间索引
    const mid = Math.floor((low + high) / 2); 
    // 找到中间的值
    const element = sortedArray[mid]; 
    // 开始对比选中的数是不是比要找的数小
    if (compareFn(element, value) === Compare.LESS_THAN) {
      // 如果是，就需要继续低探，重新来过
      low = mid + 1; 
      // 接着对比选中的数是不是比要找的数大
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) { 
      // 如果是，就需要继续高探，重新来过
      high = mid - 1; 
    } else {
      // 如果以上都不是，那就是等于我们要找的结果
      return mid; 
    }
  }
  return DOES_NOT_EXIST; // {12}
} 