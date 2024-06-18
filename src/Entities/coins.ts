import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./car";
import { Player } from './player';

export class Coin extends Obstacle {
    img: HTMLImageElement;
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this.img = new Image();
    this.img.src = "../../coin.png";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img,this.x,this.y, this.width, this.height )
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
}