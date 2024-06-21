import { Game } from "./Entities/types";
import { Player } from "./Entities/player";
import { CANVAS_HEIGHT, CANVAS_WIDTH, VELOCITY } from "./constants/constants";
import { setupCanvas } from "./utilis/canvasSetup";
import {
  initialPlatform,
  platforms,
  generatePlatform,
  removePlatform,
} from "./managers/platformManager";
import { Background } from "./Entities/background";
import {
  generateObstacles,
  updateObstacles,
  drawObstacles,
  obstacles,
} from "./managers/obstaclesManager";
import { checkCoinCollision, drawCoins, generateCoins, updateCoins } from './managers/coinManager';

const game: Game = {
  gameFrame: 0,
  gravity: 0.8,
  groundHeight: 80,
};

const { canvas, ctx } = setupCanvas("canvas1", CANVAS_WIDTH, CANVAS_HEIGHT);

const frogSprite = new Image();
frogSprite.src = "./frog-sheet.png";

const background = new Background(canvas, 0, 0, ctx);
const player = new Player(game,1);


initialPlatform();


function gameLoop() {
  // if (game.gameFrame> )

  game.gameFrame++;
  // console.log(game.gameFrame)
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  background.update();
  background.draw();

  platforms.forEach((platform) => {
    platform.draw(ctx);
    platform.x -= VELOCITY.x;
    if (platform.x + platform.width < 0) {
      generatePlatform();
    }
  });
  removePlatform();

  generateObstacles();
  updateObstacles();
  drawObstacles(ctx);
  // checkObstacleCollision(player);

 generateCoins(ctx,3);
 updateCoins(player);
 drawCoins();
 checkCoinCollision(player);


  player.update(platforms);
  player.draw(ctx, frogSprite);
  obstacles.forEach((obstacle)=>{
    player.checkCollision(obstacle);

  })
  requestAnimationFrame(gameLoop);
}



gameLoop();
