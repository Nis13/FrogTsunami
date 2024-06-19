import { Platform } from "./Entities/Platform";
import { Player } from "./Entities/player";

export function detectCollisionPlayerPlatform(player: Player, platform: Platform): boolean {
    if (
        player.x + player.width > platform.x 
    ) {
        console.log("colision detected");
        return true;
    }
    return false;
}

