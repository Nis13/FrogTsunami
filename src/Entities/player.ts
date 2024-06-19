import { CANVAS_HEIGHT, FROG_FULLIMAGE_HEIGHT, FROG_FULLIMAGE_WIDTH } from '../constants/constants';
import { Game } from './types';
import { Platform } from './Platform';

export class Player {
  x: number;
  y: number;
  speedY: number;
  height: number;
  width: number;
  speedX: number;
  targetX: number;
  isOnGround: boolean;
  spriteWidth: number;
  spriteHeight: number;
  frameX: number;
  frameY: number;
  spritePace: number;
  game: Game;
  jumpHeight: number;
  jumpDuration: number;
  spacePressed: boolean;
  spaceReleasedTimeout: number | null;
  life: number;

  hasPower:string|null;

  constructor(game: Game) {
    this.x = 0;
    this.game = game;
    this.y = CANVAS_HEIGHT - this.game.groundHeight -50 ;
    this.speedY = 0;
    this.height = 64;
    this.width = 64;
    this.targetX = 150; 
    this.speedX = 2;
    this.isOnGround = true;
    this.spriteWidth = FROG_FULLIMAGE_WIDTH / 12;
    this.spriteHeight = FROG_FULLIMAGE_HEIGHT / 4;
    this.frameX = 1;
    this.frameY = 0;
    this.spritePace = 3;
    this.jumpHeight = 20;
    this.jumpDuration = 3000;
    this.spacePressed = false;
    this.spaceReleasedTimeout = null;


    this.life = 1;
    // this.frogcount = 1;
    this.hasPower = null;
    document.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event: KeyboardEvent) => this.handleKeyUp(event));
  }

  update(platforms: Platform[]) {
    if (this.x < this.targetX) {
      this.x += this.speedX;
    }
    if (this.x >= this.targetX) {
      this.y += this.speedY;
    }

    let onGround = false;
    platforms.forEach(platform => {
      if (
        this.y + this.height >= platform.y &&
      this.y + this.height <= platform.y + 20 &&
      this.x + this.width - 10 >= platform.x &&
      this.x <= platform.x + platform.width +10
      ) {
        onGround = true;
       
        this.speedY = 10;
        if (this.y > CANVAS_HEIGHT-20) {
          console.log('game over');
          this.speedY += this.game.gravity;
        }
        else{
          this.y = platform.y - this.height;
        }

      }

    });

    if (!onGround) {
      this.speedY += this.game.gravity;
      this.isOnGround = false;

    } else {
      this.isOnGround = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D, frogSprite: HTMLImageElement) {
    if (this.isOnGround) {
      this.frameY = 0;
    } else {
      this.frameY = 1;
    }

    ctx.drawImage(
      frogSprite,
      this.spriteWidth * this.frameX,
      this.spriteHeight * this.frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    );

    if (this.game.gameFrame % this.spritePace === 0) {
      if (this.frameX < 11) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }
  }

  jump() {
    if (this.isOnGround) {
      this.speedY = -this.jumpHeight;
      this.isOnGround = false;
    }
  }

  increaseFrogCount() {
    this.life += 1;
    console.log(`Frog count increased to ${this.life}`);
  }
  decreaseFrogCount(){
    if (this.life >1){
      this.life -= 1;
    }
    
    console.log(`Frog count decreased to ${this.life}`);
  }

  drawFrogs(ctx: CanvasRenderingContext2D, frogSprite: HTMLImageElement) {
    for (let i = 0; i < this.life; i++) {
      const frogX = this.x - i * (this.width); 
      const frogY = this.y; 
      ctx.drawImage(
        frogSprite,
        this.spriteWidth * this.frameX,
        this.spriteHeight * this.frameY,
        this.spriteWidth,
        this.spriteHeight,
        frogX,
        frogY,
        this.spriteWidth,
        this.spriteHeight
      );
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space' && !this.spacePressed) {
      this.spacePressed = true;
      this.frameY = 1; 
      this.jump();
      

      if (this.spaceReleasedTimeout) {
        clearTimeout(this.spaceReleasedTimeout);
        this.spaceReleasedTimeout = null;
      }
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.spacePressed = false;

      this.spaceReleasedTimeout = window.setTimeout(() => {
        this.frameY = 0; 
        this.spaceReleasedTimeout = null;
      }, this.jumpDuration);
    }
  }
}
