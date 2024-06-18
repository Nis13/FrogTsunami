// managers/obstaclesManager.ts

import { Obstacle } from '../Entities/car';
import { Player } from '../Entities/player';
import { platforms } from './platformManager'; // Assuming platforms are managed elsewhere
import { Car } from '../Entities/cars'; // Example obstacle types
import { Bomb } from '../Entities/bomb'; // Example obstacle types
import { BOMB_HEIGHT, BOMB_WIDTH, CAR_HEIGHT, CAR_WIDTH } from '../constants/constants'; // Adjust as per your obstacle dimensions

export const obstacles: Obstacle[] = [];


// export function generateObstacles() {
//     if (platforms.length <=1) return;
//     platforms.forEach((platform)=>{
//         const obstacleX = platform.x + platform.width / 2;
//         const obstacleY = platform.y;
    
//         // Example: Randomly choose between a Car and a Bomb
//         const obstacleType = Math.random() < 0.5 ? 'car' : 'bomb';
    
//         // Create the obstacle based on type
//         let obstacle: Obstacle;
//         switch (obstacleType) {
//           case 'car':
//             obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT); // Adjust velocity as needed
//             break;
//           case 'bomb':
//             obstacle = new Bomb(obstacleX, obstacleY, CAR_WIDTH,CAR_WIDTH); // Adjust dimensions and velocity
//             break;
//           default:
//             obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT); // Default to car
//             break;
//         }
    
//         obstacles.push(obstacle);
//     })
    
//   }
export function generateObstacles() {
    platforms.forEach((platform) => {
      const obstacleX = platform.x + (platform.width - CAR_WIDTH) / 2; 
      const obstacleY = platform.y - CAR_HEIGHT; 
  
      const existingObstacle = obstacles.find((obstacle) => {
        return (
          obstacle.x <= obstacleX + CAR_WIDTH &&
          obstacle.x + obstacle.width >= obstacleX &&
          obstacle.y <= obstacleY + CAR_HEIGHT &&
          obstacle.y + obstacle.height >= obstacleY
        );
      });
  
      
      if (!existingObstacle && platforms[0] !== platform ) {
        const obstacleType = Math.random() < 0.5 ? 'car' : 'bomb';
        let obstacle;
        switch (obstacleType) {
          case 'car':
            obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT); 
            break;
          case 'bomb':
            obstacle = new Bomb(obstacleX, obstacleY, BOMB_WIDTH, BOMB_HEIGHT);
            break;
          default:
            obstacle = new Car(obstacleX, obstacleY, CAR_WIDTH, CAR_HEIGHT);
            break;
        }
  
        // Add the obstacle to the obstacles array
        obstacles.push(obstacle);
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
      console.log('Collision detected with obstacle!');
      // Handle collision logic
    }
  });
}
