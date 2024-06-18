import { Platform } from '../Entities/Platform';
import { Car } from '../Entities/obstacles';
import {
  PLATFORM_FIRST_XPOSITION,
  PLATFORM_FIRST_WIDTH,
  PLATFORM_GAP,
  PLATFORM_HEIGHT,
  PLATFORM_YPOSITION,
  CAR_HEIGHT,
  CAR_WIDTH,
} from '../constants/constants';

export let platforms: Platform[] = [];

export const initialPlatform = () => {
  let platform1 = new Platform(
    PLATFORM_FIRST_XPOSITION,
    PLATFORM_YPOSITION,
    PLATFORM_HEIGHT,
    PLATFORM_FIRST_WIDTH
  );
  let platform2 = new Platform(
    platform1.x + platform1.width + PLATFORM_GAP,
    PLATFORM_YPOSITION,
    PLATFORM_HEIGHT,
    PLATFORM_FIRST_WIDTH
  );

  let platform3 = new Platform(
    platform2.x + platform2.width + PLATFORM_GAP,
    PLATFORM_YPOSITION,
    PLATFORM_HEIGHT,
    PLATFORM_FIRST_WIDTH
  );
  platforms.push(platform1,platform2,platform3);
};

export function generatePlatform() {
  const lastPlatform = platforms[platforms.length - 1];
  const platformX = lastPlatform ? lastPlatform.x + lastPlatform.width + PLATFORM_GAP : 10;
  let platform = new Platform(
    platformX,
    PLATFORM_YPOSITION,
    PLATFORM_HEIGHT
  );
  platforms.push(platform);
}

export const removePlatform = () => {
  if (platforms.length >= 10) {
    platforms.shift();
  }
};
export const cars: Car[] = [];

export function generateCar() {
  if (platforms.length <=1) return;
  platforms.forEach((platform)=>{
    const carX = platform.x + platform.width/2;
    const carY = platform.y -CAR_HEIGHT; 
    const car = new Car(carX, carY, CAR_WIDTH, CAR_HEIGHT);
    if (platforms[0] == platform) return;
    cars.push(car);
  })
  // const platform = platforms[Math.floor(Math.random() * platforms.length)];
}


export function removeCar() {
  for (let i = cars.length - 1; i >= 0; i--) {
    if (cars[i].x_position + cars[i].width < 0) {
      cars.splice(i, 1);
    }
  }
}
