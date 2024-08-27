/*
issue with netlify

const ALLOW_ENEMIES = import.meta.env.VITE_ALLOW_ENEMIES === "true" ?? true;
const ALLOW_POWERUPS = import.meta.env.VITE_ALLOW_POWERUPS === "true" ?? true;
const ALLOW_PLAYER_IMMORTAL =
  import.meta.env.VITE_ALLOW_PLAYER_IMMORTAL === "true" ?? true;
*/

export default {
  ALLOW_ENEMIES: true,
  ALLOW_POWERUPS: true,
  ALLOW_PLAYER_IMMORTAL: false,
  ALLOW_WALLS: true,
};
