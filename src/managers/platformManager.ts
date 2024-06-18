import { Platform } from '../Entities/Platform';
import {
  PLATFORM_FIRST_XPOSITION,
  PLATFORM_FIRST_WIDTH,
  PLATFORM_GAP,
  PLATFORM_HEIGHT,
  PLATFORM_YPOSITION,
} from '../constants/constants';

export let platforms: Platform[] = [];

export const initialPlatform = () => {
  let firstPlatform = new Platform(
    PLATFORM_FIRST_XPOSITION,
    PLATFORM_YPOSITION,
    PLATFORM_HEIGHT,
    PLATFORM_FIRST_WIDTH
  );
  let secondPlatform = new Platform(
    firstPlatform.x + firstPlatform.width + PLATFORM_GAP,
    PLATFORM_YPOSITION,
    PLATFORM_HEIGHT,
    PLATFORM_FIRST_WIDTH
  );

  let thirdPlatform = new Platform(
    secondPlatform.x + secondPlatform.width + PLATFORM_GAP,
    PLATFORM_YPOSITION,
    PLATFORM_HEIGHT,
    PLATFORM_FIRST_WIDTH
  );
  platforms.push(firstPlatform, secondPlatform, thirdPlatform);
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
