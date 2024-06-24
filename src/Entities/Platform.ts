import { getRandom } from "../utilis/utilis";
import { PLATFORM_MAX_WIDTH, PLATFORM_MIN_WIDTH } from "../constants/constants";

export class Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  img: HTMLImageElement | null;
  hasObstacle: boolean;
  hasCoins: boolean;

  constructor(x: number, y: number, height: number, width: number = getRandom(PLATFORM_MIN_WIDTH, PLATFORM_MAX_WIDTH)) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = null;
    this.hasObstacle = false;
    this.hasCoins = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.img = new Image();
      this.img.src = "./platform2.png"; 
    ctx.drawImage(this.img, this.x, this.y - 20, this.width, this.height);
  }
}
