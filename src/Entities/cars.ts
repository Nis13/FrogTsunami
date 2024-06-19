import { CANVAS_WIDTH, VELOCITY } from "../constants/constants";
import { Obstacle } from "./car";
import { Player } from './player';

export class Car extends Obstacle {
    img: HTMLImageElement;
    type:string;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height,'car');
    this.img = new Image();
    this.img.src = "../../car.png";
    this.type = 'car';
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img,this.x,this.y, this.width, this.height )
  }

  update() {
    if (this.x > 400){
      this.x -= VELOCITY.x;
    }
    else{
      this.x -= VELOCITY.x+ 2;
    }
    
  }

  detectCollision(player: Player): boolean {
    return (
      this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.y + this.height > player.y
    );
  }

  handleCollision(player:Player){
    console.log('do this when collides with car');
    player.decreaseFrogCount();
    return true;
  }
}
