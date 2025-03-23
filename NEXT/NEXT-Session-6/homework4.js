const jsonString = `
[
  { "id": 1, "name": "Alice", "age": 25, "email": "alice@example.com" },
  { "id": 2, "name": "Bob", "age": 30, "email": "bob@example.com" },
  { "id": 3, "name": "Charlie", "age": 35, "email": "charlie@example.com" }
]
`;

const parsedData = JSON.parse( jsonString );

const result = parsedData.map(({ id, name, age }) => ({
  id,
  name,
  age
}));

console.log(result);
