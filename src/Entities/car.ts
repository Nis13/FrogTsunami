import { Player } from "./player";
export abstract class Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
  
    constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    // Abstract methods to be implemented by subclasses
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract update(): void;
    abstract detectCollision(player: Player): boolean;
  }