// import { platforms } from './../managers/platformManager';
import { Player } from "./player";
export abstract class Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
    type : string;
  
    constructor(x: number, y: number, width: number, height: number,type:string) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.type = type;
    }
  
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract update(): void;
    abstract detectCollision(player: Player): boolean;
    abstract handleCollision(player:Player):boolean;
  }