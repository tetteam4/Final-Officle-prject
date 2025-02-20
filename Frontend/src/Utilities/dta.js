



//vserion 1
// export const booths = Array.from({ length: 12 }, (_, i) => ({
//   id: i + 1,
//   name: `میز ${i + 1}`,
//   icon: "🖥️",
//   isBusy: Math.random() < 0.5, // Randomly set booth status (busy or available)
// }));

// export const customers = [
//   { id: 1, name: "آقا محمدی", booth: 10, icon: "👤" },
//   { id: 2, name: "خانم رضایی", booth: 5, icon: "👤" },
//   { id: 3, name: "آقا حسینی", booth: 3, icon: "👤" },
//   { id: 4, name: "خانم کریمی", booth: 7, icon: "👤" },
// ];


/// version 2

// src/data.js
export const booths = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `میز ${i + 1}`,
  icon: "🖥️", // Booth icon
  isBusy: Math.random() < 0.5, // Randomly set booth status (busy or available)
}));

export const customers = [
  { id: 1, name: "آقا محمدی", booth: 10, icon: "👤" },
  { id: 2, name: "خانم رضایی", booth: 5, icon: "👤" },
  { id: 3, name: "آقا حسینی", booth: 3, icon: "👤" },
  { id: 4, name: "خانم کریمی", booth: 7, icon: "👤" },
];