import { VELOCITY } from "../constants/constants";
import { Player } from "./player";
export class Insect {
    ctx:CanvasRenderingContext2D;
    x_position: number;
    y_position: number;
    width: number;
    height: number;
    img: HTMLImageElement;
  
    constructor(ctx: CanvasRenderingContext2D,x_position: number, y_position: number, width: number, height: number) {
      this.ctx = ctx;
      this.x_position = x_position;
      this.y_position = y_position;
      this.width = width;
      this.height = height;
      
      this.img = new Image();
      this.img.src = "../../car.png";
    }
  
    draw() {
      this.ctx.fillRect(this.x_position, this.y_position, this.width, this.height);
    // this.ctx.drawImage(this.img,this.x_position, this.y_position, this.width, this.height);
    }
  
    detectCollision(player: Player): boolean {
      return (
        this.x_position < player.x + player.width &&
        this.x_position + this.width > player.x &&
        this.y_position < player.y + player.height &&
        this.y_position + this.height > player.y
      );
    }
  
    update() {
        this.draw();
        this.x_position -= VELOCITY.x;
    }
  }


  