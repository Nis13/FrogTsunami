import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./obstacle";
import { Player } from './player';

export class Car extends Obstacle {
    img: HTMLImageElement;
    type:string;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height,'car');
    this.img = new Image();
    this.img.src = "./car.png";
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

  handleCollision(player:Player){
    console.log(player.hasPower);
    return true;
  }
}
