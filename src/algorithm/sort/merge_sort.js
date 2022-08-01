import { Compare, defaultCompare } from '../../utils.js';

export function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) { //基本条件
    const { length } = array;
    // 找到数组中间的位置
    const middle = Math.floor(length / 2); 
    // 分出左边数组
    const left = mergeSort(array.slice(0, middle), compareFn); 
    // 分出右边数组
    const right = mergeSort(array.slice(middle, length), compareFn); 
    // 合并左右数组
    array = merge(left, right, compareFn); 
  }
  return array; 
}

function merge(left, right, compareFn) {
  // 声明两个新变量和一个数组用来迭代左右数组
  let i = 0; 
  let j = 0;
  const result = []; 
  // 开始迭代
  while (i < left.length && j < right.length) { 
    result.push(
       // 对比左数组是否小于右数组
       // 如果是，把左数组值加到结果；如果不是，把右数组值加到结果
       // 并且把用来迭代的数组加一
      compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++] 
    ); 
  }
  // 继续把每个左数组的剩余值加入，让后将右数组的剩余值加入
  return result.concat(i < left.length ? left.slice(i) : right.slice(j)); 
}