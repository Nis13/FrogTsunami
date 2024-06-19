import { Platform } from "../Entities/Platform";
import {
  PLATFORM_FIRST_XPOSITION,
  PLATFORM_FIRST_WIDTH,
  PLATFORM_GAP,
  PLATFORM_HEIGHT,
  PLATFORM_YPOSITION,
} from "../constants/constants";

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
  platforms.push(platform1, platform2, platform3);
};

export function generatePlatform() {
  const lastPlatform = platforms[platforms.length - 1];
  const platformX = lastPlatform
    ? lastPlatform.x + lastPlatform.width + PLATFORM_GAP
    : 10;
  let platform = new Platform(platformX, PLATFORM_YPOSITION, PLATFORM_HEIGHT);
  platforms.push(platform);
}

export const removePlatform = () => {
  if (platforms.length >= 5) {
    platforms.shift();
  }
};
