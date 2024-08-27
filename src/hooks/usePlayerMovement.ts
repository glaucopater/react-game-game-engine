import { useState, useEffect, useRef } from "react";
import { MIN_LEFT_X, MIN_BOTTOM_Y } from "../constants";
import { Position } from "../custom-types";
import { WallProps } from "../components/Wall";

export const usePlayerMovement = (
  initialPosition: Position,
  playerWidth: number,
  playerHeight: number,
  walls: WallProps[]
) => {
  const [position, setPosition] = useState(initialPosition);
  const playerPositionRef = useRef(initialPosition);

  useEffect(() => {
    playerPositionRef.current = position;
  }, [position]);

  const isPositionBlocked = (newPosition: Position) => {
    for (let dx = 0; dx < playerWidth; dx++) {
      for (let dy = 0; dy < playerHeight; dy++) {
        if (
          walls?.some((wall) =>
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

  const moveRight = () => {
    setPosition((prev: Position) => {
      const newPosition = { ...prev, x: Math.min(MIN_LEFT_X, prev.x + 1) };
      return isPositionBlocked(newPosition) ? prev : newPosition;
    });
  };

  const moveLeft = () => {
    setPosition((prev: Position) => {
      const newPosition = { ...prev, x: Math.max(0, prev.x - 1) };
      return isPositionBlocked(newPosition) ? prev : newPosition;
    });
  };

  const moveDown = () => {
    setPosition((prev: Position) => {
      const newPosition = { ...prev, y: Math.min(MIN_BOTTOM_Y, prev.y + 1) };
      return isPositionBlocked(newPosition) ? prev : newPosition;
    });
  };

  const moveUp = () => {
    setPosition((prev: Position) => {
      const newPosition = { ...prev, y: Math.max(0, prev.y - 1) };
      return isPositionBlocked(newPosition) ? prev : newPosition;
    });
  };

  return {
    position,
    playerPositionRef,
    moveRight,
    moveLeft,
    moveDown,
    moveUp,
    setPosition,
  };
};
