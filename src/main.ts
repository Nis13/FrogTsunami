import { Car } from './Entities/obstacles';
import { Game } from './Entities/types';
import { Player } from './Entities/player';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CAR_HEIGHT,
  CAR_WIDTH,
  VELOCITY
} from './constants/constants';
import { setupCanvas } from './utilis/canvasSetup';
import { initialPlatform, platforms, generatePlatform, removePlatform } from './managers/platformManager';
import {Background} from './Entities/background';

const game: Game = {
  gameFrame: 0,
  gravity: 0.8,
  groundHeight: 80
};

const { canvas, ctx } = setupCanvas('canvas1', CANVAS_WIDTH, CANVAS_HEIGHT);

const frogSprite = new Image();
frogSprite.src = './frog-sheet.png';

const background = new Background(canvas, 0, 0, ctx);
const player = new Player(game);

let carInterval = 1000; 
let carCounter = 0;

initialPlatform();
const cars: Car[] = [];

function generateCar() {
  if (platforms.length === 0) return;

  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const carX = platform.x + platform.width/2;
  const carY = platform.y -CAR_HEIGHT; 
  const car = new Car(ctx, carX, carY, CAR_WIDTH, CAR_HEIGHT);
  cars.push(car);
}


function removeCar() {
  for (let i = cars.length - 1; i >= 0; i--) {
    if (cars[i].x_position + cars[i].width < 0) {
      cars.splice(i, 1);
    }
  }
}


generateCar();

function gameLoop() {
  game.gameFrame++;
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

  cars.forEach((car) => {
    car.update();

    if (car.detectCollision(player)) {
      console.log('Collision detected with car!');
    }
  });

  
  removeCar();

  player.update(platforms);
  player.draw(ctx, frogSprite);

  carCounter++;
  if (carCounter >= carInterval) {
    generateCar();
    carCounter = 0; 
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
