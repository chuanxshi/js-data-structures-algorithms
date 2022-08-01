export function knapSack(capacity, weights, values) {
  const n = values.length;
  let load = 0;
  let val = 0;
  // 数量要少于可承载量
  for (let i = 0; i < n && load < capacity; i++) { 
    // 如果重量小于剩余可承载量，就往里放
    if (weights[i] <= capacity - load) { 
      val += values[i];
      load += weights[i];
    } else {
      // 如果大于，我们就计算能用的比例
      const r = (capacity - load) / weights[i]; 
      val += r * values[i];
      load += weights[i];
    }
  }
  return val;
}