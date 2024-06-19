// Entities/car.ts

import { VELOCITY } from "../constants/constants";
import { Obstacle } from "./car";
import { Player } from './player';

const powerTypeObj = {
  1: 'shield',
  2:'magnet',
  3:'speed',
  4:'jump boost'
}

export class Power extends Obstacle {
  img:HTMLImageElement
    type:string;
    powerTypeNum:number;
    powerType:string | null;

  constructor(x: number, y: number, width: number, height: number,powerTypeNum:number) {
    super(x, y, width, height, 'power');
    this.powerTypeNum = powerTypeNum;
    this.img = new Image;
    this.type = 'power';
    this.powerType = null;
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
      this.img.src = "../../shield.png";
    }
    else if (this.powerTypeNum == 2){
      this.powerType = 'magnet';
      this.img.src = "../../magnet.png";
    }
    else if (this.powerTypeNum == 3){
      this.powerType = 'speed';
      this.img.src = "../../speed.png";
    }
    else if (this.powerTypeNum == 4){
      this.powerType = 'jump boost';
      this.img.src = "../../speed.png";
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
    player.hasPower = this.powerType;
      switch (player.hasPower){
          case 'shield':
            console.log('got shield');
            
            break;
          case 'magnet':
            console.log('got magnet');
            break;
          case 'speed':
            console.log('got speed boost');
            break;
          case 'jump boost':
            console.log('jump boost');
            break;
          default:
            break;
  
      }
    return true;
  }
}
