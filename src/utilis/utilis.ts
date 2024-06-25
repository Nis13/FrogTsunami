import { Bomb } from "../Entities/bomb";
import { Car } from "../Entities/cars";
import { Insect } from "../Entities/insect";
import { Frog } from "../Entities/player";
import { Power } from "../Entities/power";
import { Coin } from "../Entities/coins";

export const getRandom = (minValue: number, maxValue: number): number => {
  return Math.floor(minValue + Math.random() * (maxValue - minValue + 1));
};

export function checkFrogCollsion(
  frog: Frog,
  obstacle: Car | Insect | Power | Bomb
) {
  return (
    obstacle.x < frog.x + frog.width &&
    obstacle.x + obstacle.width > frog.x &&
    obstacle.y < frog.y + frog.height &&
    obstacle.y + obstacle.height > frog.y
  );
}

export function removeFromArray(
  array: (Frog | Car | Bomb | Power | Insect | Coin)[],
  element: Frog | Car | Bomb | Power | Insect | Coin
): void {
  const index = array.indexOf(element);
  if (index > -1) array.splice(index, 1);
}

export function shiftFrogs(frogs: Frog[]) {
  const targetX = 200;
  const shift = targetX - frogs[0].x;
  for (let i = 0; i < frogs.length; i++) {
    frogs[i].x += shift;
  }
}
