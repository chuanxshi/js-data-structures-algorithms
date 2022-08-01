export function minCoinChange(coins, amount) {
  // 记忆函数缓存
  const cache = [];
  // 找钱的递归函数
  const makeChange = (value) => {
    // 如果小于0，返回空数组
    if (!value) {
      return [];
    }
    // 如果结果已经缓存了，直接返回值
    if (cache[value]) {
      return cache[value];
    }
    let min = [];
    let newMin;
    let newAmount;
    // 对于每种币值
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      // 我们都计算新的剩余找零，一直降低到最小可以给的找零
      newAmount = value - coin;
      if (newAmount >= 0) {
        // 如果新的面值是一个正数，继续递归
        newMin = makeChange(newAmount);
      }
      if (
        // 最后我们会验证剩余找零是不是零或正数
        newAmount >= 0 && 
        // 新的最小值是不是小于之前最小值
        (newMin.length < min.length - 1 || !min.length) &&
        // newAmount是不是有效结果
        (newMin.length || !newAmount)
      ) {
        // 如果所有验证都通过了，就证明有了比之前好的结果
        min = [coin].concat(newMin);
        console.log('new Min ' + min + ' for ' + amount);
      }
    }
    // 12 最后返回结果
    return (cache[value] = min);
  };
  // 13 这里可以输入金额
  return makeChange(amount);
}