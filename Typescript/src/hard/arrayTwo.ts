// Problem Statement
// Given a list of users, filter out users who are from a specific country (e.g., "India"). Each user object contains name, age, and country.

// Example Input:

// users = [
//     { name: "Alice", age: 25, country: "India" },
//     { name: "Bob", age: 30, country: "USA" },
//     { name: "Charlie", age: 22, country: "India" },
//     { name: "David", age: 28, country: "Canada" }
//   ]
//   country = "India"

// Example Output:

//   [
//     { name: "Alice", age: 25, country: "India" },
//     { name: "Charlie", age: 22, country: "India" }
//   ]

export type User = {
  name: string;
  age: number;
  country: string;
};

export function filterUsersByCountry(users: User[], country: string): User[] {
  return users.filter((user) => user.country === country);
}

const users: User[] = [
  { name: "Alice", age: 25, country: "India" },
  { name: "Bob", age: 30, country: "USA" },
  { name: "Charlie", age: 22, country: "India" },
  { name: "David", age: 28, country: "Canada" },
];

console.log(filterUsersByCountry(users, "India"));
