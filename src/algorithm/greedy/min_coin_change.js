export function minCoinChange(coins, amount) {
  const change = [];
  let total = 0;
  // 对于每一种面值的硬币，从最大的开始到最小的
  for (let i = coins.length; i >= 0; i--) { 
    const coin = coins[i];
    // 我们把硬币面值加上，总数要少于金额
    while (total + coin <= amount) { 
      // 我们会把面值加到数组
      change.push(coin); 
      // 总数也做递增
      total += coin; 
    }
  }
  return change;
}