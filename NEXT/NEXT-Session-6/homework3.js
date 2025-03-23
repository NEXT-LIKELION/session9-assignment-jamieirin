const total = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * num)
  .reduce((acc, curr) => acc + curr, 0);

console.log( total );  // 264
