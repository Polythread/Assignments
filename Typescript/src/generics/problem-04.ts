// Problem Statement:
// Write a generic function sum that accepts an array of numbers and returns the sum of all the numbers.

export function sum<T extends number>(arr: T[]): number {
  return arr.reduce((total, num) => total + num, 0);
}
