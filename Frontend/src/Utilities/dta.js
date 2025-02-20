// src/data.js
export const desktops = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Desktop ${i + 1}`,
  icon: `🖥️`, // You can replace this with an actual icon or image
}));

export const customers = [
  { id: 1, name: "John Doe", desktop: 1 },
  { id: 2, name: "Jane Smith", desktop: 5 },
  { id: 3, name: "Alice Johnson", desktop: 9 },
  { id: 4, name: "Bob Brown", desktop: 3 },
];
