import { Player } from "../Entities/player";
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
import { checkFrogCollsion, getRandom } from "../utilis/utilis";

export const obstacles: ( Car | Insect | Bomb | Power )[] = [];


export function generateObstacles() {
  platforms.forEach((platform) => {
    if (!platform.hasObstacle && platform !== platforms[0]) {
      const obstacleX = platform.x + getRandom(platform.width / 6, 2 * platform.width / 3); 
      const obstacleY = platform.y - getRandom(100, 200);
      
      let obstacle;
      let obstacleType;

      const randomNum = Math.random();
      if (randomNum < 0.2) {
        obstacleType = "car";
        obstacle = new Car(obstacleX, platform.y - CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT);
      } else if (randomNum < 0.5) {
        obstacleType = "bomb";
        obstacle = new Bomb(obstacleX, obstacleY, BOMB_WIDTH, BOMB_HEIGHT);
      } else if (randomNum < 0.8) {
        obstacleType = 'insect';
        obstacle = new Insect(obstacleX, obstacleY, BUTTERFLY_WIDTH, BUTTERFLY_HEIGHT);
      } else {
        obstacleType = "power";
        const powerType = getRandom(1, 4);
        obstacle = new Power(obstacleX, obstacleY, BUTTERFLY_WIDTH, BUTTERFLY_HEIGHT, powerType);
      }

      obstacle.type = obstacleType;
      obstacles.push(obstacle);
      platform.hasObstacle = true;

      console.log(`Added ${obstacle} obstacle at (${obstacleX}, ${obstacleY})`);
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

// export function checkObstacleCollision(player: Player) {
//   for (let i = obstacles.length - 1; i >= 0; i--) {
//     const obstacle = obstacles[i];
//     if (obstacle.detectCollision(player)) {
//       console.log("Collision detected with obstacle!");
//       console.log(obstacle.type);

//       let shouldRemove = false;
//       switch (obstacle.type) {
//         case "car":
//           shouldRemove = obstacle.handleCollision(player);
//           break;
//         case "bomb":
//           shouldRemove = obstacle.handleCollision(player);
//           break;
//         case "insect":
//           shouldRemove = obstacle.handleCollision(player);
//           break;
//         case "power":
//           shouldRemove = obstacle.handleCollision(player);

//           break;
//         default:
//           console.log("Unknown obstacle type:", obstacle.type);
//           break;
//       }
//       if (shouldRemove) {
//         obstacles.splice(i, 1);
//       }
//     }
//   }
// }

export function checkObstacleCollision(player: Player) {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    player.frogs.forEach((frog) => {
      if (checkFrogCollsion(frog,obstacle)) {
        console.log("Collision detected with obstacle!");
        console.log(obstacle.type);

        let shouldRemove = false;
        switch (obstacle.type) {
          case "car":
          case "bomb":
            player.increaseFrogCount();
            break;
          case "insect":
            shouldRemove = true;
            player.increaseFrogCount();  
            break;
          case "power":
            shouldRemove = obstacle.handleCollision(player);
            break;
          default:
            console.log("Unknown obstacle type:", obstacle.type);
            break;
        }
        if (shouldRemove) {
          obstacles.splice(i, 1);
        }
      }
    });
  }
}

