import { useState, useEffect } from "react";
import { MAX_BULLETS, WIN_SCORE } from "../constants";
import { PLAYER_MAX_HEALTH } from "../constants";
import { playSound } from "../helpers";
import { Position } from "../custom-types";

type UseGameStateProps = {
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setEnemies: React.Dispatch<React.SetStateAction<Position[]>>;
  setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setLastDamageTime: React.Dispatch<React.SetStateAction<number>>;
  setBullets: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
  bullets: number;
  enemies: Position[];
};

export const useGameState = ({
  isGameOver,
  setIsGameOver,
  setEnemies,
  setPlayerHealth,
  setPosition,
  setIsPaused,
  setLastDamageTime,
  setBullets,
  isPaused,
  bullets,
  enemies,
}: UseGameStateProps) => {
  const [score, setScore] = useState(0);
  const [isShooting, setIsShooting] = useState(false);

  const resetGame = () => {
    setPosition({ x: 9, y: 9 });
    setEnemies([]);
    setIsGameOver(false);
    setPlayerHealth(PLAYER_MAX_HEALTH);
    setScore(0);
    setIsPaused(false);
    setLastDamageTime(0);
    setBullets(MAX_BULLETS);
  };

  const pauseGame = () => {
    setIsPaused((prevPaused: boolean) => !prevPaused);
  };

  const handleMouseDown = (e: {
    currentTarget: { getBoundingClientRect: () => DOMRect };
    clientX: number;
    clientY: number;
  }) => {
    if (isGameOver || isPaused || bullets === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setIsShooting(true);
    playSound("shotgun");
    setBullets((prevBullets: number) => prevBullets - 1);
    const clickedEnemyIndex = enemies.findIndex(
      (enemy: Position) =>
        mouseX >= enemy.x * 20 &&
        mouseX < (enemy.x + 1) * 20 &&
        mouseY >= enemy.y * 20 &&
        mouseY < (enemy.y + 1) * 20
    );
    if (clickedEnemyIndex !== -1) {
      const updatedEnemies = [...enemies];
      updatedEnemies.splice(clickedEnemyIndex, 1);
      setEnemies(updatedEnemies);
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleMouseUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsShooting(false);
  };

  useEffect(() => {
    if (score >= WIN_SCORE) {
      setIsGameOver(true);
    }
  }, [score, setIsGameOver]);

  const handlePauseModalClose = () => {
    setIsPaused(false);
  };

  return {
    isGameOver,
    score,
    isPaused,
    bullets,
    isShooting,
    resetGame,
    pauseGame,
    handleMouseDown,
    handleMouseUp,
    handlePauseModalClose,
  };
};
