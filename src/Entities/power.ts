import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./obstacle";
import { Player } from './player';

const powerTypeObj = ['shield','magnet','speed','jump boost'];


export class Power extends Obstacle {
  img:HTMLImageElement
    type:string;
    powerTypeNum:number;
    powerType:string ;
    powerUpEndTime:number;

  constructor(x: number, y: number, width: number, height: number,powerTypeNum:number) {
    super(x, y, width, height, 'power');
    this.powerTypeNum = powerTypeNum;
    this.img = new Image;
    this.type = 'power';
    this.powerType = powerTypeObj[powerTypeNum];
    this.powerUpEndTime = 0;

    
  }
  /* 
  powerType:
  1: shield
  2:magnet
  3: speed
  4: jump boost
  */

  draw(ctx: CanvasRenderingContext2D) {
    if (this.powerTypeNum == 1){
      this.powerType = 'shield';
      this.img.src = "./shield.png";
    }
    else if (this.powerTypeNum == 2){
      this.powerType = 'magnet';
      this.img.src = "./magnet.png";
    }
    else if (this.powerTypeNum == 3){
      this.powerType = 'speed';
      this.img.src = "./speed.png";
    }
    else if (this.powerTypeNum == 4){
      this.powerType = 'jump boost';
      this.img.src = "./shoes.png";
    }
   
    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
  
  if (this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  }

  update() {
    this.x -= VELOCITY.x;
  }
  handleCollision(player:Player){
    console.log('do this when collides with powerup');
    if (!player.hasPower){
      player.hasPower = this.powerType;
      player.timeForPower();
    }
    return true;
  }
}
