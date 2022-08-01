import { defaultEquals, DOES_NOT_EXIST } from '../../utils.js';

export function sequentialSearch(array, value, equalsFn = defaultEquals) {
  // 对数组进行迭代
  for (let i = 0; i < array.length; i++) { 
    // 和要找的值对比
    if (equalsFn(value, array[i])) { 
      // 找到了，就返回索引位置
      return i; 
    }
  }
  // 如果没找到，就返回失败结果
  return DOES_NOT_EXIST; 
} 

