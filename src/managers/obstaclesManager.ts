import { platforms } from "./platformManager"; 
import { Car } from "../Entities/cars"; 
import { Bomb } from "../Entities/bomb"; 
import {
  BOMB_HEIGHT,
  BOMB_WIDTH,
  BUTTERFLY_HEIGHT,
  BUTTERFLY_WIDTH,
  CAR_HEIGHT,
  CAR_WIDTH,
} from "../constants/constants"; 
import { Insect } from "../Entities/insect";
import { Power } from "../Entities/power";
import {getRandom } from "../utilis/utilis";
import { PushCar } from "../Entities/pushCar";
import { Player } from "../Entities/player";

export let obstacles: ( Car | Insect | Bomb | Power | PushCar)[] = [];


export function generateObstacles(player:Player) {
  platforms.forEach((platform) => {
    if (!platform.hasObstacle && platform !== platforms[0]) {
      const obstacleX = platform.x + getRandom(platform.width / 6, 2 * platform.width / 3); 
      const obstacleY = platform.y - getRandom(100, 200);
      
      let obstacle;
      let obstacleType;
      
      const randomNum = Math.random();
      // obstacleType ='pushCar';
      // obstacle = new PushCar(obstacleX, platform.y-(CAR_HEIGHT), CAR_WIDTH*3, CAR_HEIGHT);
      if (randomNum < 0.3) {
        obstacleType = "car";
        obstacle = new Car(obstacleX, platform.y - CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT);
      } else if (randomNum < 0.7) {
        obstacleType = "bomb";
        obstacle = new Bomb(obstacleX, obstacleY, BOMB_WIDTH, BOMB_HEIGHT);
      } else if (randomNum < 0.9) {
        obstacleType = 'insect';
        obstacle = new Insect(obstacleX, obstacleY, BUTTERFLY_WIDTH, BUTTERFLY_HEIGHT);
      }
      else if (randomNum <1){
        const secondRandom = Math.random();
        if (secondRandom<0.5){
        obstacleType ='pushCar';
        obstacle = new PushCar(obstacleX, platform.y-(CAR_HEIGHT)-10, CAR_WIDTH, CAR_HEIGHT);
      }
      else {
        if (!player.hasPower){
        obstacleType = "power";
        const powerType = getRandom(1, 4);
        obstacle = new Power(obstacleX, obstacleY, BUTTERFLY_WIDTH, BUTTERFLY_HEIGHT, powerType);
        }
        else{
          obstacleType = "car";
          obstacle = new Car(obstacleX, platform.y - CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT);
        }
      }
      } else{
        obstacleType = "car";
        obstacle = new Car(obstacleX, platform.y - CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT);
      }

      

      obstacle.type = obstacleType;
      obstacles.push(obstacle);
      platform.hasObstacle = true;
    }
  });
}


export function removeObstacles() {
  obstacles.forEach((obstacle, index) => {
    if (obstacle.x + obstacle.width < -100) {
      obstacles.splice(index, 1);
    }
  });
}

export function updateObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.update();
  });
}

export function drawObstacles(ctx: CanvasRenderingContext2D) {
  obstacles.forEach((obstacle) => {
    obstacle.draw(ctx);
  });
}
export function resetObstacles(){
  obstacles =[];
}

