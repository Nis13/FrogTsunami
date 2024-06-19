// Entities/car.ts

import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./car";
import { Player } from './player';

export class Power extends Obstacle {
  img:HTMLImageElement
    type:string;
    powerType:number;
  constructor(x: number, y: number, width: number, height: number,powerType:number) {
    super(x, y, width, height, 'power');
    this.powerType = powerType;
    this.img = new Image;
    this.type = 'power';
    
    // this.img.src = "../../magnet.png";

    
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.powerType == 1){
      this.img.src = "../../shield.png";
    }
    else if (this.powerType == 2){
      this.img.src = "../../magnet.png";
    }
    else if (this.powerType == 3){
      this.img.src = "../../speed.png";
    }
   
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
  
  // In case the image source is changed after onload event
  if (this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  update() {
    // Implement car update logic
    this.x -= VELOCITY.x;
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
    console.log('do this when collides with powerup');
  }
}
