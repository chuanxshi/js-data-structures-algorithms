import { findMaxValue, findMinValue } from '../search/min_max_search.js';

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
  let bucketsIndex;
  const buckets = [];
  const aux = [];
  // 首先初始化桶
  for (let i = 0; i < radixBase; i++) { 
    buckets[i] = 0;
  }
  //在数组中
  for (let i = 0; i < array.length; i++) { 
    // 基于有效位数
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); 
    // 接下来做计数排序
    buckets[bucketsIndex]++; 
  }
  // 因为是计数排序，所以我们要计算每次增加
  for (let i = 1; i < radixBase; i++) { 
    buckets[i] += buckets[i - 1];
  }
  // 计数后，我们要把值挪回到原始数组中
  for (let i = array.length - 1; i >= 0; i--) { 
    // 对数组中的每一个值，我们要重新获取它的有效位数
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); 
    // 把它的值放到辅助数组中，减掉桶排序里的计数
    aux[--buckets[bucketsIndex]] = array[i]; 
  }
  // 把辅助数组里的值传到原始数组中
  for (let i = 0; i < array.length; i++) { // {13}
    array[i] = aux[i];
  }
  return array;
}

export function radixSort(array, radixBase = 10) {
  if (array.length < 2) {
    return array;
  }
  const minValue = findMinValue(array);
  const maxValue = findMaxValue(array);

  // 开始基于所有数字的最后一位数排序
  let significantDigit = 1; 
  // 通过迭代一直到没有有效位数
  while ((maxValue - minValue) / significantDigit >= 1) { 
    array = countingSortForRadix(array, radixBase, significantDigit, minValue);
    // 我们从最后一位数排序，下一次迭代，基于第二位数，之后第三位数，以此类推
    significantDigit *= radixBase; 
  }
  return array;
}