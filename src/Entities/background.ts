import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/constants";
import { VELOCITY } from "../constants/constants";

export class Background {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  img: HTMLImageElement;

  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.img = new Image();
    this.img.src = "./bg2.jpg";
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.canvas.width,
      CANVAS_HEIGHT
    );
    this.ctx.drawImage(
      this.img,
      this.x + CANVAS_WIDTH,
      this.y,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }

  update() {
    this.draw();
    this.x -= VELOCITY.x;
    if (this.x <= -CANVAS_WIDTH) {
      this.x = 0;
    }
  }
}
