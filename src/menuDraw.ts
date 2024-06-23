import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants/constants";

export function drawStartMenu(ctx:CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
    const bgImage = new Image();
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
    bgImage.src = "../start.jpg";
  
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Welcome to Your Game', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
  }

export function drawRestartPage(ctx:CanvasRenderingContext2D){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const bgImage = new Image();
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
    bgImage.src = "../end.jpg";
  }