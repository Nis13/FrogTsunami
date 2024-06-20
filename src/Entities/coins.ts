import { CANVAS_WIDTH, VELOCITY } from "../constants/constants";
import { Player } from "./player";
const coinPattern = [
      { x: 7, y:7 ,width:129, height:130},
      { x: 145, y: 4 ,width:140, height:133},
      { x: 269, y: 7 ,width:91, height:136},
      { x: 48, y: 158 ,width:61, height:145},
      { x: 141, y: 158 ,width:74, height:136},
      { x: 237, y: 158 ,width:118, height:136}
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
  frameThreshold:number;
  frameCounter:number;

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
        // this.img.src = "../../singlecoin.png";
        this.img.src = "../../coin.png";

        this.frameIndex = 0;
        this.frameThreshold = 5;
        this.frameCounter = 0;

  }
draw() {
  const coin = coinPattern[this.frameIndex];
  this.ctx.drawImage(
    this.img,
    coin.x, coin.y, coin.width, coin.height,  
    this.x, this.y, this.width, this.height 
  );

  this.frameCounter++;

  if (this.frameCounter >= this.frameThreshold) {
    this.frameCounter = 0;
    this.frameIndex++;
    if (this.frameIndex >= coinPattern.length) {
      this.frameIndex = 0;
    }
  }
}


  update(player:Player) {
    const magnetStrength = 10;
    if (player.isMagnetActive && this.x > 0 && this.x <CANVAS_WIDTH) {
     
        let directionX = player.x - this.x;
        let directionY = player.y - this.y;
        
        let distance = Math.sqrt(directionX * directionX + directionY * directionY);
        
        let normalizedX = directionX / distance;
        let normalizedY = directionY / distance;
        
        this.x += normalizedX * magnetStrength;
        this.y += normalizedY * magnetStrength;
      
      
  } else {
    this.x -= VELOCITY.x;
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
  
}
