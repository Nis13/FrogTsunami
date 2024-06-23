import { platforms } from "./platformManager";
import { Coin } from "../Entities/coins";
import { getRandom } from "../utilis/utilis";
import { Player } from "../Entities/player";

export let coins: Coin[] = [];

export function generateCoins(
  ctx: CanvasRenderingContext2D,
  coinsPerPlatform: number
) {
  platforms.forEach((platform, index) => {
    const placeCoin = index % 3 == 0;
    if (!platform.hasCoins && platform !== platforms[0] && placeCoin) {
      let coinX =
        platform.x + getRandom(platform.width / 6, (2 * platform.width) / 3);
      let coinY = platform.y - getRandom(100, 200);
      let w = 30;
      let h = 40;
      for (let j = 0; j < coinsPerPlatform; j++) {
        coinX += w;
        coinY -= h;
        const width = 40;
        const height = 40;
        const coin = new Coin(ctx, coinX, coinY, width, height);
        coins.push(coin);
        w += 5;
        h += 5;
      }
      platform.hasCoins = true;
    }
  });
}

export function removeCoins() {
  coins.forEach((coin, index) => {
    if (coin.x + coin.width < -100) {
      coins.splice(index, 1);
    }
  });
}

export function updateCoins(player: Player) {
  coins.forEach((coin) => {
    coin.update(player);
  });
}

export function drawCoins() {
  coins.forEach((coin) => {
    coin.draw();
  });
}

export function checkCoinCollision(player: Player) {
  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    player.frogs.forEach((frog) => {
      if (coin.detectCollision(frog)) {
        console.log("Collision detected with coin!");
        player.score += 1;
        coins.splice(i, 1);
        console.log(`score:${player.score}`);
      }
    });
  }
}
export function resetCoins(){
  coins = [];
}
