import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./car";
import {  Player } from './player';

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
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  update() {
    this.x -= VELOCITY.x;
  }
  handleCollision(player:Player){
    return true;
  }
}
