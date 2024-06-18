export class Obstacles{
    ctx:CanvasRenderingContext2D;
    x_position: number;
    y_position: number;
    width: number;
    height: number;
    
  
    constructor(ctx: CanvasRenderingContext2D,x_position: number, y_position: number, width: number, height: number) {
      this.ctx = ctx;
      this.x_position = x_position;
      this.y_position = y_position;
      this.width = width;
      this.height = height;
}
}
export class Bomb extends Obstacles{
    draw():void{
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x_position, this.y_position, this.width, this.height);
    }
}