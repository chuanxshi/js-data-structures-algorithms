export function knapSack(capacity, weights, values, n) {
  
  const KS = [];
  // 初始化矩阵 ks[n+1][capacity+1]
  for (let i = 0; i <= n; i++) {
    KS[i] = [];
  }

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // 从0以外的索引开始看
      if (i === 0 || w === 0) {
        KS[i][w] = 0;
      // 只有当i的重量小于限制时，才有可能是方案的一部分
      } else if (weights[i - 1] <= w) {
        const a = values[i - 1] + KS[i - 1][w - weights[i - 1]];
        const b = KS[i - 1][w];
        // 当i的值小于限制时，我们可以将它作为方案的一部分
        KS[i][w] = a > b ? a : b;
      } else {
        // 当重量大于可承载量的时候，我们忽略，用前一个值
        KS[i][w] = KS[i - 1][w];
      }
    }
  }
  findValues(n, capacity, KS, weights, values);
  // 答案可以在右下角获得
  return KS[n][capacity];
}

function findValues(n, capacity, kS, weights, values) {
  let i = n;
  let k = capacity;
  console.log('Items that are part of the solution:');
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(`item ${i} can be part of solution w,v: ${weights[i - 1]} , ${values[i - 1]}`);
      i--;
      k -= kS[i][k];
    } else {
      i--;
    }
  }
}