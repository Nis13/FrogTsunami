import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./car";
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
    // x_position: number;
    // y_position: number;
    // width: number;
    // height: number;
    img: HTMLImageElement;
    frameIndex: number;
    type: string;
  
    constructor(x: number, y: number, width: number, height: number) {
      super(x, y, width, height, 'insect')
      this.img = new Image();
      this.img.src = "../../butterfly.png";
      this.frameIndex = 0;
      this.type = 'insect';
    }
  
    draw(ctx:CanvasRenderingContext2D) {
        // Ensure frameIndex stays within the range of available coordinates
        if (this.frameIndex >= butterflyCoordinates.length) {
            this.frameIndex = 0;
        }
        
        // Get the current frame's coordinates
        const butterfly = butterflyCoordinates[this.frameIndex];
    
        // Draw the image using the current frame's coordinates
        ctx.drawImage(
            this.img,
            butterfly.x, butterfly.y, 240, 240,  
            this.x, this.y, this.width, this.height 
        );
    
        // Increment frameIndex for the next draw call
        this.frameIndex++;
    }
    
  
    detectCollision(player: Player): boolean {
      return (
        this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.y + this.height > player.y
      );
    }
  
    update() {
        this.x -= VELOCITY.x;
        
        
    }
    handleCollision(player: Player){
        console.log('handle collsion with insect');
    }
  }


  