import { Player } from "./Entities/player";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants/constants";

export function drawStartMenu(ctx:CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
    const bgImage = new Image();
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
    bgImage.src = "./start.jpg";
  
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Welcome to Your Game', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
  }

export function drawRestartPage(ctx:CanvasRenderingContext2D,score:number){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const bgImage = new Image();
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(`Score: ${score}`,CANVAS_WIDTH / 2, 30);
    };
    bgImage.src = "./end.jpg";
  
  }

  export function drawPower(ctx:CanvasRenderingContext2D,power:string){
    ctx.font = 'bold 40px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
       ctx.fillText(`Active Power-up: ${power}`, CANVAS_WIDTH / 2, 30);
  }

  // const imageSrcList = {
  //   'shield': '../../shield.png',
  //   'magnet':'../../magnet.png',
  //   'jump boost':'../../shoes.png',
  //   'speed':'../../speed/png'
  // }