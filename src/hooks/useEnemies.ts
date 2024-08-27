import { useState, useEffect } from "react";
import FEATURES from "../features/";
import { Position } from "../custom-types";
import { WallProps } from "../components/Wall";

export const useEnemies = (
  isGameOver: boolean,
  isPaused: boolean,
  playerPositionRef: { current: Position },
  walls: WallProps[],
  enemyWidth: number,
  enemyHeight: number
) => {
  const [enemies, setEnemies] = useState<Position[]>([]);

  const isPositionBlocked = (newPosition: Position) => {
    for (let dx = 0; dx < enemyWidth; dx++) {
      for (let dy = 0; dy < enemyHeight; dy++) {
        if (
          walls.some((wall) =>
            wall.wallCoordinates.some(
              (coordinate) =>
                coordinate.x === newPosition.x + dx &&
                coordinate.y === newPosition.y + dy
            )
          )
        ) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    if (!FEATURES.ALLOW_ENEMIES) return;

    const spawnEnemyInterval = setInterval(() => {
      if (!isGameOver && enemies.length < 5 && !isPaused) {
        let newEnemyPosition;
        do {
          newEnemyPosition = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          };
        } while (isPositionBlocked(newEnemyPosition));

        setEnemies((prevEnemies) => [...prevEnemies, newEnemyPosition]);
      }
    }, 2000);

    return () => clearInterval(spawnEnemyInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver, enemies.length, isPaused]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isGameOver && !isPaused) {
        const newEnemies = enemies.map((enemy) => {
          const dx = playerPositionRef.current.x - enemy.x;
          const dy = playerPositionRef.current.y - enemy.y;
          const directionX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
          const directionY = dy === 0 ? 0 : dy > 0 ? 1 : -1;
          const newPosition = {
            x: enemy.x + directionX,
            y: enemy.y + directionY,
          };
          return isPositionBlocked(newPosition) ? enemy : newPosition;
        });
        setEnemies(newEnemies);
      }
    }, 1000);

    return () => clearInterval(moveInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemies, isGameOver, isPaused, playerPositionRef]);

  return { enemies, setEnemies };
};
