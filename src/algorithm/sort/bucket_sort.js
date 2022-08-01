import { Compare, defaultCompare, swap } from '../../utils.js';
import { insertionSort} from './insertion_sort.js';

// 明确要多少个用来排序的桶
export function bucketSort(array, bucketSize = 5) { 
  if (array.length < 2) {
    return array;
  }
  // 创建桶，然后把元素分布到桶中
  const buckets = createBuckets(array, bucketSize); 
  // 调用插入排序算法，把每一个元素插入桶中
  return sortBuckets(buckets); 
}

function createBuckets(array, bucketSize) {
  let minValue = array[0];
  let maxValue = array[0];
  // 找到最大和最小值
  for (let i = 1; i < array.length; i++) { 
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  // 最大和最小值相减，除以桶的数量，计算每一个桶里应该分配多少元素
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; 
  const buckets = [];
  // 初始化每一个桶
  for (let i = 0; i < bucketCount; i++) { 
    buckets[i] = [];
  }
  // 迭代每一个元素
  for (let i = 0; i < array.length; i++) { 
    // 计算应该放到哪个桶里
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); 
    buckets[bucketIndex].push(array[i]); 
  }
  return buckets;
}

function sortBuckets(buckets) {
  // 创建一个新的用来放结果的数组
  const sortedArray = []; 
  // 迭代每一个桶
  for (let i = 0; i < buckets.length; i++) { 
    if (buckets[i] != null) {
      // 执行插入排序
      insertionSort(buckets[i]); 
      // 把排序后的桶里所有元素加到结果数组里
      sortedArray.push(...buckets[i]); 
    }
  }
  return sortedArray;
}