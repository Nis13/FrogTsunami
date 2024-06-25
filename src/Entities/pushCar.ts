import { CAR_HEIGHT, PLATFORM_YPOSITION, VELOCITY } from "../constants/constants";
import { obstacles } from "../managers/obstaclesManager";
import { checkFrogCollsion, removeFromArray} from "../utilis/utilis";
import { Obstacle } from "./obstacle";
import { Frog, Player } from './player';

export class PushCar extends Obstacle {
    img: HTMLImageElement;
    type: string;
    pushThreshold: number;
    isPushed: boolean;
    tagImg:HTMLImageElement;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, 'pushcar');
        this.img = new Image();
        this.img.src = "./frogCage.png";
        this.type = 'pushCar';
        this.pushThreshold = 1;
        this.isPushed = false;
        this.tagImg = new Image();
        this.tagImg.src = "./cartag.png";
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.tagImg, this.x -50, this.y-50, this.width, this.height);
    }

    update() {
        this.x -= VELOCITY.x;
    }

    handleCollision(player: Player) {
        console.log(player.hasPower);
        return true;
    }

    checkVerticalCollisions(frogs: Frog[]) {
        for (const frog of frogs) {
          if (checkFrogCollsion(frog,this) && frog.y+frog.height>PLATFORM_YPOSITION-(CAR_HEIGHT*2) &&frog.y+frog.height<PLATFORM_YPOSITION-50) {
            frog.y = this.y - frog.height; 
            frog.isOnGround = true; 
            frog.speedY = 0; 
            frog.frameX = 0;
          }
        }
      }
    checkHorizontalCollisions(frogs: Frog[], player: Player) {
      let collidedFrogCount = 0;
      let lastFrog = frogs[frogs.length - 1];
      
  
      for (const frog of frogs) {
          if (checkFrogCollsion(frog, this)) {
              if (collidedFrogCount >= this.pushThreshold) {
                  removeFromArray(obstacles,this)
                  const newFrogX = lastFrog.x - 40;
                  const newFrog = {
                      x: newFrogX,
                      y: lastFrog.y,
                      width: lastFrog.width,
                      height: lastFrog.height,
                      isOnGround: true,
                      speedY: 0,
                      alive: true,
                      frameX: 0,
                      frameY: 0,
                      push: false,
                  };
  
                  frogs.push(newFrog);
                  player.score += 1;
                  return;
              } else if (frog.x + frog.width < this.x + 10) {
                  collidedFrogCount++;
                  frog.x = this.x - frog.width - 0.01;
                  if (frog.x + frog.width <= 0) {
                      removeFromArray(frogs,frog)
                  }
              }
          }
      }
  }
  }
  
  
  
    

