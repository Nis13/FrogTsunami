import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./obstacle";
import { Player } from "./player";

export const butterflyCoordinates = [
    { x: 0, y: 0 },
    { x: 240, y: 0 },
    { x: 480, y: 0 },
    { x: 720, y: 0 },
    { x: 0, y: 240 },
    { x: 240, y: 240 },
    { x: 480, y: 240 },
    { x: 720, y: 240 }
  ];
export class Insect extends Obstacle {
    img: HTMLImageElement;
    frameIndex: number;
    type: string;
    frameThreshold:number;
  frameCounter:number;
  
    constructor(x: number, y: number, width: number, height: number) {
      super(x, y, width, height, 'insect')
      this.img = new Image();
      this.img.src = "./butterfly.png";
      this.frameIndex = 0;
      this.frameThreshold = 5;
      this.frameCounter = 0;
      this.type = 'insect';
    }
    draw(ctx:CanvasRenderingContext2D) {
      const butterfly = butterflyCoordinates[this.frameIndex];
      ctx.drawImage(
        this.img,
        butterfly.x, butterfly.y, 240, 240,  
        this.x, this.y, this.width, this.height 
      );
    
      this.frameCounter++;
    
      if (this.frameCounter >= this.frameThreshold) {
        this.frameCounter = 0;
        this.frameIndex++;
        if (this.frameIndex >=butterflyCoordinates.length) {
          this.frameIndex = 0;
        }
      }
    }
  
    update() {
        this.x -= VELOCITY.x;
        
        
    }
    handleCollision(player: Player){
        console.log('handle collsion with insect');
        player.increaseFrogCount();
        return true;
        
    }
  }


  