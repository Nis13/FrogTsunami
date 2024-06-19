// import { Coin } from "../Entities/coins";

// const coins: Coin[] = [];

// // Example positions
// const positions: { x: number; y: number; }[] = [
//   { x: 100, y: 200 },
//   { x: 150, y: 250 },
//   { x: 200, y: 200 },
//   { x: 250, y: 250 }
// ];

// // Function to generate coins at specified positions
// function generateCoins() {
//   positions.forEach((position) => {
//     const coin = new Coin(ctx, position.x, position.y, 10); // Assuming radius is 10 for example
//     coins.push(coin);
//   });
// }

// // Call the function to generate coins
// generateCoins();

// // Example: Rendering the coins
// function renderCoins() {
//   coins.forEach((coin) => {
//     coin.draw(); // Use the canvas context to draw each coin
//   });
// }