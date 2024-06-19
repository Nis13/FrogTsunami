// managers/obstaclesManager.ts

import { Obstacle } from "../Entities/car";
import { Player } from "../Entities/player";
import { platforms } from "./platformManager"; // Assuming platforms are managed elsewhere
import { Car } from "../Entities/cars"; // Example obstacle types
import { Bomb } from "../Entities/bomb"; // Example obstacle types
import {
  BOMB_HEIGHT,
  BOMB_WIDTH,
  BUTTERFLY_HEIGHT,
  BUTTERFLY_WIDTH,
  CAR_HEIGHT,
  CAR_WIDTH,
} from "../constants/constants"; // Adjust as per your obstacle dimensions
import { Insect } from "../Entities/insect";
import { Power } from "../Entities/power";
import { getRandom } from "../utilis/utilis";

export const obstacles: Obstacle[] = [];

// export function generateObstacles() {
  
//   platforms.forEach((platform) => {
//     const obstacleX = platform.x + (platform.width - CAR_WIDTH) / 2; 
//       const obstacleY = platform.y - CAR_HEIGHT; 
  
//       const existingObstacle = obstacles.find((obstacle) => {
//         return (
//           obstacle.x <= obstacleX + CAR_WIDTH &&
//           obstacle.x + obstacle.width >= obstacleX &&
//           obstacle.y <= obstacleY + CAR_HEIGHT &&
//           obstacle.y + obstacle.height >= obstacleY
//         );
//       });

//     if (!existingObstacle && platforms[0] !== platform) {
//       const obstacleType =
//         Math.random() < 0.2
//           ? "car"
//           : Math.random() < 0.3
//           ? "bomb"
//           : Math.random() < 0.4
//           ? "butterfly"
//           :"powerup";
//       let obstacle;
//       switch (obstacleType) {
//         case "car":
//           obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT);
//           break;
//         case "bomb":
//           obstacle = new Bomb(obstacleX, obstacleY, BOMB_WIDTH, BOMB_HEIGHT);
//           break;
//         case "butterfly":
//           obstacle = new Insect(
//             obstacleX,
//             obstacleY,
//             BUTTERFLY_WIDTH,
//             BUTTERFLY_HEIGHT
//           );
//           break;
//         case "powerup":
//           const type = getRandom(1,3);
//           obstacle = new Power(
//             obstacleX,
//             obstacleY,
//             BUTTERFLY_WIDTH,
//             BUTTERFLY_HEIGHT,
//             type
//           )
//           break;
//         default:
//           obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT);
//           break;
//       }

//       // Add the obstacle to the obstacles array
//       obstacles.push(obstacle);
//     }
//   });
// }
// export function generateObstacles() {
  
//   platforms.forEach((platform) => {
//     const obstacleX = platform.x + (platform.width - CAR_WIDTH) / 2; 
//       const obstacleY = platform.y - CAR_HEIGHT; 
  
//       const existingObstacle = obstacles.find((obstacle) => {
//         return (
//           obstacle.x <= obstacleX + CAR_WIDTH &&
//           obstacle.x + obstacle.width >= obstacleX &&
//           obstacle.y <= obstacleY + CAR_HEIGHT &&
//           obstacle.y + obstacle.height >= obstacleY
//         );
//       });

//     if (!existingObstacle && platforms[0] !== platform) {
//       const obstacleType =
//         Math.random() < 0.2
//           ? "car"
//           : Math.random() < 0.3
//           ? "bomb"
//           : Math.random() < 0.4
//           ? "butterfly"
//           :"powerup";
//       let obstacle;
//       switch (obstacleType) {
//         case "car":
//           obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT);
//           break;
//         case "bomb":
//           obstacle = new Bomb(obstacleX, obstacleY, BOMB_WIDTH, BOMB_HEIGHT);
//           break;
//         case "butterfly":
//           obstacle = new Insect(
//             obstacleX,
//             obstacleY,
//             BUTTERFLY_WIDTH,
//             BUTTERFLY_HEIGHT
//           );
//           break;
//         case "powerup":
//           const type = getRandom(1,3);
//           obstacle = new Power(
//             obstacleX,
//             obstacleY,
//             BUTTERFLY_WIDTH,
//             BUTTERFLY_HEIGHT,
//             type
//           )
//           break;
//         default:
//           obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT);
//           break;
//       }

//       // Add the obstacle to the obstacles array
//       obstacles.push(obstacle);
//     }
//   });
// }
// export function generateObstacles() {
  
//   platforms.forEach((platform) => {
//     const obstacleX = platform.x + (platform.width - CAR_WIDTH) / 2; 
//       const obstacleY = platform.y - CAR_HEIGHT; 
  
//       const existingObstacle = obstacles.find((obstacle) => {
//         return (
//           obstacle.x <= obstacleX + CAR_WIDTH &&
//           obstacle.x + obstacle.width >= obstacleX &&
//           obstacle.y <= obstacleY + CAR_HEIGHT &&
//           obstacle.y + obstacle.height >= obstacleY
//         );
//       });

//     if (!existingObstacle && platforms[0] !== platform) {
//       const obstacleType =
//         Math.random() < 0.2
//           ? "car"
//           : Math.random() < 0.3
//           ? "bomb"
//           : Math.random() < 0.4
//           ? "butterfly"
//           :"powerup";
//       let obstacle;
//       switch (obstacleType) {
//         case "car":
//           obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT);
//           break;
//         case "bomb":
//           obstacle = new Bomb(obstacleX, obstacleY, BOMB_WIDTH, BOMB_HEIGHT);
//           break;
//         case "butterfly":
//           obstacle = new Insect(
//             obstacleX,
//             obstacleY,
//             BUTTERFLY_WIDTH,
//             BUTTERFLY_HEIGHT
//           );
//           break;
//         case "powerup":
//           const type = getRandom(1,3);
//           obstacle = new Power(
//             obstacleX,
//             obstacleY,
//             BUTTERFLY_WIDTH,
//             BUTTERFLY_HEIGHT,
//             type
//           )
//           break;
//         default:
//           obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT);
//           break;
//       }

//       // Add the obstacle to the obstacles array
//       obstacles.push(obstacle);
//     }
//   });
// }
export function generateObstacles() {
  platforms.forEach((platform) => {
    // Check if the platform already has an obstacle
    if (!platform.hasObstacle && platform !== platforms[0]) {
      // Calculate obstacle position within the platform
      const obstacleX = platform.x + getRandom(platform.width / 6, 2 * platform.width / 3); 
      const obstacleY = platform.y - getRandom(100, 200);
      
      let obstacle;
      let obstacleType;

      // Determine obstacle type randomly
      const randomNum = Math.random();
      if (randomNum < 0.2) {
        obstacleType = "car";
        obstacle = new Car(obstacleX, platform.y - CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT);
      } else if (randomNum < 0.5) {
        obstacleType = "bomb";
        obstacle = new Bomb(obstacleX, obstacleY, BOMB_WIDTH, BOMB_HEIGHT);
      } else if (randomNum < 0.8) {
        obstacleType = "butterfly";
        obstacle = new Insect(obstacleX, obstacleY, BUTTERFLY_WIDTH, BUTTERFLY_HEIGHT);
      } else {
        obstacleType = "powerup";
        const powerType = getRandom(1, 3);
        obstacle = new Power(obstacleX, obstacleY, BUTTERFLY_WIDTH, BUTTERFLY_HEIGHT, powerType);
      }

      // Add obstacle type to the obstacle object
      obstacle.type = obstacleType;

      // Add obstacle to obstacles array
      obstacles.push(obstacle);
      // Mark platform as having an obstacle
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
  // Update all obstacles
  obstacles.forEach((obstacle) => {
    obstacle.update();
  });
}

export function drawObstacles(ctx: CanvasRenderingContext2D) {
  // Draw all obstacles
  obstacles.forEach((obstacle) => {
    obstacle.draw(ctx);
  });
}

export function checkObstacleCollision(player: Player) {
  obstacles.forEach((obstacle) => {
    if (obstacle.detectCollision(player)) {
      console.log("Collision detected with obstacle!");
      console.log(obstacle.type);
      // Handle collision logic
      switch (obstacle.type) {
        case "car":
          obstacle.handleCollision(player);
          break;
        case "bomb":
          obstacle.handleCollision(player);
          break;
        case "butterfly":
          obstacle.handleCollision(player);
          break;
        case "powerup":
          obstacle.handleCollision(player);
          break;
        default:
          // Handle default case if necessary
          console.log("Unknown obstacle type:");
          break;
      }
    }
  });
}
