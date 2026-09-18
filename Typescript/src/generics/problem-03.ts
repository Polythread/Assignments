// Problem Statement:
// Write a function mergeObjects that merges two objects and returns a new object with all properties.

export function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
