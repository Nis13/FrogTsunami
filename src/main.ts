import { Game } from "./Entities/types";
import { Player } from "./Entities/player";
import { CANVAS_HEIGHT, CANVAS_WIDTH, VELOCITY } from "./constants/constants";
import { setupCanvas } from "./utilis/canvasSetup";
import {
  initialPlatform,
  platforms,
  generatePlatform,
  removePlatform,
  resetPlatform,
} from "./managers/platformManager";
import { Background } from "./Entities/background";
import {
  generateObstacles,
  updateObstacles,
  drawObstacles,
  obstacles,
  resetObstacles,
} from "./managers/obstaclesManager";
import { checkCoinCollision, drawCoins, generateCoins, resetCoins, updateCoins } from './managers/coinManager';
import { drawRestartPage, drawStartMenu } from "./menuDraw";

const game: Game = {
  gameFrame: 0,
  gravity: 0.8,
  groundHeight: 80,
};

const { canvas, ctx } = setupCanvas("canvas1", CANVAS_WIDTH, CANVAS_HEIGHT);

const frogSprite = new Image();
frogSprite.src = "./frog-sheet.png";

const img = new Image();
  img.src = '../startimage.jpg';

const background = new Background(canvas, 0, 0, ctx);
let player = new Player(game, 1);
let isGameOver = false;

initialPlatform();

const resetButton = document.querySelector<HTMLButtonElement>('#reset-button')!;



function gameLoop() {
  if (isGameOver) {
    drawRestartPage(ctx,player.score);
    resetButton.style.display = 'block';
    return;
  }

  game.gameFrame++;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


  background.update();
  background.draw();
 
  drawScore();
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

  generateCoins(ctx, 3);
  updateCoins(player);
  drawCoins();
  checkCoinCollision(player);

  player.update(platforms);
  player.draw(ctx, frogSprite);
  obstacles.forEach((obstacle) => {
    player.checkCollision(obstacle);
    if (!player.frogs.some(frog => frog.alive)) {
      isGameOver = true;
    }
  });

  requestAnimationFrame(gameLoop);
}

function resetGame() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle='blue';
  ctx.rect(20,20,500,500);
 

  isGameOver = false;

  resetCoins();
  resetPlatform();
  resetObstacles();
  player = new Player(game,1);

  initialPlatform();
}

function restartGame() {
  resetGame();
  gameLoop();
}


function main(){
    drawStartMenu(ctx);
  const startButton = document.querySelector<HTMLButtonElement>('#start-button')!;
  
  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameLoop();
  });
  resetButton.addEventListener('click', () => {
    resetButton.style.display = 'none';
    restartGame();
  });
  
}

main();


function drawScore(){
  ctx.fillStyle = 'black';
    ctx.font = 'bold 30px Arial' ;
    ctx.fillText(`Score: ${player.score}`,100,80);
    ctx.fillText(`Frog: ${player.frogs.length}`, 100,120);
}