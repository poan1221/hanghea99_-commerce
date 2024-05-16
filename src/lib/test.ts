const numbers = [1, 2, 3, 4, 5];

const double = (number: number) => number * 2;
const doubledNumbers = numbers.map(double);

const isOdd = (number: number) => number % 2 !== 0;
const oddNumbers = numbers.filter(isOdd);

const add = (acc: number, cur: number) => acc + cur;
const sumOfNumbers = numbers.reduce(add);
