import { Compare, defaultCompare, defaultEquals, defaultDiff, biggerEquals } from '../../utils.js';


export function interpolationSearch(array, value,
  compareFn = defaultCompare,
  equalsFn = defaultEquals,
  diffFn = defaultDiff
) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;
  while (
    low <= high &&
    biggerEquals(value, array[low], compareFn) &&
    lesserEquals(value, array[high], compareFn)
  ) {
    // 数组里的值最好是统一分布的，这种情况下delta会非常小
    delta = diffFn(value, array[low]) / diffFn(array[high], array[low]); // {1}
    // 首先先计算位置
    // 如果要找的值更靠近高数组，就找到临近位置更大的值
    // 如果要找的值更靠近低数组，就找到临近位置更小的值
    position = low + Math.floor((high - low) * delta); 
    // 如果值能找到，我们返回它的索引
    if (equalsFn(array[position], value)) { 
      return position;
    }
    // 如果搜索到的值小于现在位置的值，重复左、右数组的逻辑
    if (compareFn(array[position], value) === Compare.LESS_THAN) { // {4}
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return DOES_NOT_EXIST;
}