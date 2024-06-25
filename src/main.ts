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
import {
  checkCoinCollision,
  drawCoins,
  generateCoins,
  resetCoins,
  updateCoins,
} from "./managers/coinManager";
import { drawRestartPage, drawScore, drawStartMenu } from "./menuDraw";

export const game: Game = {
  gameFrame: 0,
  gravity: 0.8,
  groundHeight: 80,
  initialHighScore: 0,
  highScore: 0,
};

const { canvas, ctx } = setupCanvas("canvas1", CANVAS_WIDTH, CANVAS_HEIGHT);
const frogSprite = new Image();
frogSprite.src = "./frog-sheet.png";

const background = new Background(canvas, 0, 0, ctx);
let player = new Player(game, 1);
export let isGameOver = false;

initialPlatform();

const resetButton = document.querySelector<HTMLButtonElement>("#reset-button")!;

function gameLoop() {
  if (isGameOver) {
    if (player.score > game.highScore) {
      game.highScore = player.score;
      saveHighScore();
    }
    drawRestartPage(ctx, player.score, game.highScore);
    resetButton.style.display = "block";
    return;
  }
  updateVelocityBasedOnScore(player.score);
  game.gameFrame++;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  background.update();
  background.draw();

  drawScore(ctx, player);
  platforms.forEach((platform) => {
    platform.draw(ctx);
    platform.x -= VELOCITY.x;
    if (platform.x + platform.width < 0) {
      generatePlatform();
    }
  });
  removePlatform();

  generateObstacles(player);
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
    if (!player.frogs.some((frog) => frog.alive)) {
      isGameOver = true;
    }
  });

  requestAnimationFrame(gameLoop);
}

function resetGame() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "blue";
  ctx.rect(20, 20, 500, 500);

  isGameOver = false;

  resetCoins();
  resetPlatform();
  resetObstacles();
  player = new Player(game, 1);

  initialPlatform();
}

function restartGame() {
  resetGame();
  gameLoop();
}
function loadHighScore() {
  const storedHighScore = localStorage.getItem("highScore");
  if (storedHighScore !== null) {
    game.highScore = parseInt(storedHighScore, 10);
  } else {
    game.highScore = game.initialHighScore;
  }
}

function saveHighScore() {
  localStorage.setItem("highScore", game.highScore.toString());
}

function updateVelocityBasedOnScore(score: number): void {
  if (score > 40) {
    VELOCITY.x = 12;
  } else if (score > 20) {
    VELOCITY.x = 8;
  }
}

function main() {
  loadHighScore();
  drawStartMenu(ctx);
  const startButton =
    document.querySelector<HTMLButtonElement>("#start-button")!;

  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    gameLoop();
  });

  resetButton.addEventListener("click", () => {
    resetButton.style.display = "none";
    restartGame();
  });
}

main();
