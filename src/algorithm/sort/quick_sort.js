import { Compare, defaultCompare, swap } from '../../utils.js';

export function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
};

function quick(array, left, right, compareFn) {
  // 首先声明索引变量
  // 帮助我们通过区分开大小数组，来用递归方式调用快排
  let index; 
  // 数组长度要大于一，如果只有一个数字，那本来就排好了
  if (array.length > 1) { 
  	// 在子数组上执行分区动作来获得索引，第一次是全数组
    index = partition(array, left, right, compareFn); 
    // 如果一个子数组有小于的元素
    if (left < index - 1) { 
    	// 我们就重复流程
      quick(array, left, index - 1, compareFn); 
    }
    // 对于大于的，也做同样操作
    if (index < right) { 
    	// 重复快排的动作
      quick(array, index, right, compareFn); 
    }
  }
  return array;
}; 

function partition(array, left, right, compareFn) {
  // 把中间的选做为支点
  const pivot = array[Math.floor((right + left) / 2)];
  // 初始化两个标，第一个元素是左、最后一个元素是右
  let i = left; 
  let j = right; 

  // 当左右没有交集的时候来执行
  while (i <= j) { 
  	// 除非我们找到了大于支点的数字，不然就移动右标
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) { 
      i++;
    }
    // 除非我们找到了小于支点的数字，不然就移动左标
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }
    // 当左标大于支点或右标小于支点的时候
    if (i <= j) { // {14}
    	// 我们会把它们对换
      swap(array, i, j); // {15}
      i++;
      j--;
    }
  }
  // 最后返回用来创建子数组的左标索引
  return i; 
} 