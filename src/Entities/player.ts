import { VELOCITY } from "./../constants/constants";
import {
  CANVAS_HEIGHT,
  FROG_FULLIMAGE_HEIGHT,
  FROG_FULLIMAGE_WIDTH,
} from "../constants/constants";
import { Game } from "./types";
import { Platform } from "./Platform";
import { Car } from "./cars";
import { Insect } from "./insect";
import { Bomb } from "./bomb";
import { Power } from "./power";
import { obstacles } from "../managers/obstaclesManager";
import {
  checkFrogCollsion,
  removeFromArray,
  shiftFrogs,
} from "../utilis/utilis";
import { drawPower } from "../menuDraw";
import { PushCar } from "./pushCar";

const jumpSound = new Audio("./frogjump.mp3");
const bombSound = new Audio("./bomb.wav");
const insectSound = new Audio("./insect.mp3");
const carSound = new Audio("./car.mp3");

export interface Frog {
  x: number;
  y: number;
  width: number;
  height: number;
  isOnGround: boolean;
  speedY: number;
  alive: boolean;
  frameX: number;
  frameY: number;
}

export class Player {
  frogs: Frog[];
  game: Game;
  spriteWidth: number;
  spriteHeight: number;
  frameX: number;
  frameY: number;
  spritePace: number;
  jumpHeight: number;
  jumpDuration: number;
  spacePressed: boolean;
  spaceReleasedTimeout: number | null;
  hasPower: string | null;
  powerUpEndTime: number;
  isShieldActive: boolean;
  isMagnetActive: boolean;
  score: number;
  jumpDelay: number;

  constructor(game: Game, frogCount: number) {
    this.game = game;
    this.spriteWidth = FROG_FULLIMAGE_WIDTH / 12;
    this.spriteHeight = FROG_FULLIMAGE_HEIGHT / 4;
    this.frameX = 1;
    this.frameY = 0;
    this.spritePace = 4;
    this.jumpHeight = 20;
    this.jumpDuration = 3000;
    this.spacePressed = false;
    this.spaceReleasedTimeout = null;
    this.hasPower = null;
    this.powerUpEndTime = 0;
    this.isShieldActive = false;
    this.isMagnetActive = false;
    this.score = 0;
    this.jumpDelay = 75;

    this.frogs = [];
    for (let i = 0; i < frogCount; i++) {
      this.frogs.push({
        x: 200,
        y: CANVAS_HEIGHT - this.game.groundHeight - 50 - i * 20,
        width: 64,
        height: 64,
        isOnGround: true,
        speedY: 0,
        alive: true,
        frameX: 0,
        frameY: 0,
      });
    }

    document.addEventListener("keydown", (event: KeyboardEvent) =>
      this.handleKeyDown(event)
    );
    document.addEventListener("keyup", (event: KeyboardEvent) =>
      this.handleKeyUp(event)
    );
    document.addEventListener("touchstart", () => {
      this.jump();
    });
  }
  update(platforms: Platform[]) {
    if (this.frogs.length === 0) return;
    this.frogs.forEach((frog) => {
      if (frog.y > CANVAS_HEIGHT || frog.alive == false) {
        removeFromArray(this.frogs, frog);
      }
    });
    this.handlePowerUps();

    this.frogs.forEach((frog) => {
      if (frog.alive) {
        frog.y += frog.speedY;

        let onGround = false;
        platforms.forEach((platform) => {
          if (
            frog.y + frog.height >= platform.y &&
            frog.y + frog.height <= platform.y + 20 &&
            frog.x + frog.width - 10 >= platform.x &&
            frog.x <= platform.x + platform.width + 10
          ) {
            onGround = true;
            frog.speedY = 10;
            if (frog.y > CANVAS_HEIGHT - 20) {
              frog.speedY += this.game.gravity;
            } else {
              frog.y = platform.y - frog.height;
            }
          }
        });

        if (!onGround) {
          frog.speedY += this.game.gravity;
          frog.isOnGround = false;
        } else {
          frog.isOnGround = true;
        }
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D, frogSprite: HTMLImageElement) {
    this.frogs.forEach((frog) => {
      if (frog.alive) {
        if (frog.isOnGround) {
          frog.frameY = 0;
        } else {
          frog.frameY = 1;
        }

        ctx.drawImage(
          frogSprite,
          this.spriteWidth * frog.frameX,
          this.spriteHeight * frog.frameY,
          this.spriteWidth,
          this.spriteHeight,
          frog.x,
          frog.y,
          this.spriteWidth,
          this.spriteHeight
        );

        if (this.game.gameFrame % this.spritePace === 0) {
          if (frog.frameX < 11) {
            frog.frameX++;
          } else {
            frog.frameX = 0;
          }
        }
      }
    });

    if (this.hasPower) {
      drawPower(ctx, this.hasPower);
    }
  }

  jump() {
    if(this.frogs.length > 0)
    if (this.frogs[0].isOnGround ) {
      jumpSound.currentTime = 0;
      jumpSound.play();
    }
    this.frogs.forEach((frog, index) => {
      setTimeout(() => {
        if (frog.isOnGround) {
          frog.speedY = -this.jumpHeight;
          frog.isOnGround = false;
        }
      }, this.jumpDelay * index);
    });
  }

  increaseFrogCount() {
    const lastFrog = this.frogs[this.frogs.length - 1];
    this.frogs.push({
      x: lastFrog.x - 50,
      y: lastFrog.y,
      width: 64,
      height: 64,
      isOnGround: true,
      speedY: 0,
      alive: true,
      frameX: 0,
      frameY: 0,
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Space" && !this.spacePressed) {
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
    if (event.code === "Space") {
      this.spacePressed = false;

      this.spaceReleasedTimeout = window.setTimeout(() => {
        this.frameY = 0;
        this.spaceReleasedTimeout = null;
      }, this.jumpDuration);
    }
  }

  checkCollision(obstacle: Car | Insect | Bomb | Power | PushCar): void {
    this.frogs.forEach((frog) => {
      if (frog.alive && checkFrogCollsion(frog, obstacle)) {
        
        if (obstacle instanceof PushCar) {
          obstacle.checkVerticalCollisions(this.frogs);
          obstacle.checkHorizontalCollisions(this.frogs, this);
        } else {
          removeFromArray(obstacles, obstacle);
          if (this.frogs.length > 0) shiftFrogs(this.frogs);
        }

        if (obstacle.type == "car" || obstacle.type == "bomb")
          if (!this.isShieldActive) {
            frog.alive = false;
            if (obstacle.type == "bomb") {
              bombSound.currentTime = 0;
              bombSound.play();
            }
            else{
              carSound.currentTime = 0;
              carSound.play();
            }
          }
        if (obstacle.type == "insect") {
          insectSound.currentTime = 0;
          insectSound.play();
          this.increaseFrogCount();}
        if (obstacle.type == "power") {
          obstacle.handleCollision(this)
        };
      }
    });
  }
  handlePowerUps() {
    if (this.hasPower === "speed" && Date.now() < this.powerUpEndTime) {
      VELOCITY.x = 8;
    } else if (
      this.hasPower === "jump boost" &&
      Date.now() < this.powerUpEndTime
    ) {
      this.jumpHeight = 30;
    } else if (this.hasPower === "shield" && Date.now() < this.powerUpEndTime) {
      this.isShieldActive = true;
    } else if (this.hasPower === "magnet" && Date.now() < this.powerUpEndTime) {
      this.isMagnetActive = true;
    } else {
      this.jumpHeight = 20;
      this.isShieldActive = false;
      this.jumpDuration = 3000;
      VELOCITY.x = 6;
      this.hasPower = null;
      this.isMagnetActive = false;
    }
  }
  timeForPower() {
    this.powerUpEndTime = Date.now() + 7000;
  }
}
