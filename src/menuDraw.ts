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
      const powerImage = new Image();
      switch (power){
        case 'shield':
          powerImage.src = '../../shield.png';
          break;
        case 'magnet':
          powerImage.src = '../../magnet.png';
          break;
          case 'jump boost':
            powerImage.src = '../../shoes.png';
            break;
            case 'speed':
              powerImage.src = '../../speed.png';
              break;
        default:
          break;
      }
      ctx.drawImage(powerImage, CANVAS_WIDTH/2 - 50,100,70,70);
  }