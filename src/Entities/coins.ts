import { VELOCITY } from "../constants/constants";
const coinPattern = [
      { x: 0, y: 460 },
      { x: 40, y: 460 },
      { x: 80, y: 460 },
      { x: 40, y: 500 },
      { x: 80, y: 500 },
      { x: 120, y: 500 }
]
export class Coin {
  x: number;
  y: number;
  height:number;
  width:number;
  value: number;
  ctx: CanvasRenderingContext2D;
  vx:number;
  vy:number;
  frameIndex :number;
  img:HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width:number, height:number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.value = 1;
    this.vx = VELOCITY.x;
        this.vy = 0;

        this.img = new Image();
        this.img.src = "../../coin.png";

        this.frameIndex = 0;

  }
  draw() {
    if (this.frameIndex >= coinPattern.length) {
      this.frameIndex = 0;
  }
  const coin = coinPattern[this.frameIndex];
  this.ctx.drawImage(
      this.img,
      coin.x, coin.y, 240, 240,  
      this.x, this.y, this.width, this.height 
  );
  this.frameIndex++;
  }

  update() {
    this.x -= VELOCITY.x;
  }
}
