import { Platform } from "./Entities/Platform";
import { Player } from "./Entities/player";

export function detectCollisionPlayerPlatform(player: Player, platform: Platform): boolean {
    if (
        // player.x < platform.x + platform.width &&
        player.x + player.width > platform.x 
        // player.y < platform.y + platform.height &&
    ) {
        console.log("colision detected");
        return true;
    }
    return false;
}

