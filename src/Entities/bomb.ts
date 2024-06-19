// Entities/bomb.ts

import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./car";
import { Player } from './player';

export class Bomb extends Obstacle {
    img: HTMLImageElement;
    type: string;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height, 'bomb');
    this.img = new Image();
    this.img.src = '../../bomb.png';
    this.type = 'bomb';
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.fillStyle = 'black'; 
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  update() {
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
    console.log('do this when collides with bomb');
  }
}
