import React, { useState, useEffect, useRef } from "react";
import Modal from "../Modal"; // Adjust the path accordingly

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 9, y: 9 }); // Set initial player position to the center
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([]);
  const [enemyCount, setEnemyCount] = useState(0); // Track the number of enemies
  const [isGameOver, setIsGameOver] = useState(false);
  const [, setMouseClicked] = useState(false);
  const playerPositionRef = useRef({ x: 9, y: 9 });
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setPosition({ x: 9, y: 9 });
    setEnemies([]);
    setEnemyCount(0); // Reset the enemy count
    setIsGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return; // Disable movement when game is over
      switch (e.key) {
        case "ArrowUp":
          setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - 1) }));
          break;
        case "ArrowDown":
          setPosition((prev) => ({ ...prev, y: Math.min(19, prev.y + 1) }));
          break;
        case "ArrowLeft":
          setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }));
          break;
        case "ArrowRight":
          setPosition((prev) => ({ ...prev, x: Math.min(19, prev.x + 1) }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameOver]);

  useEffect(() => {
    playerPositionRef.current = position; // Update the player position ref whenever the player position changes
  }, [position]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver && enemyCount < 5) {
        // Increment enemy count and add new enemy
        setEnemyCount((prevCount) => prevCount + 1);
        setEnemies((prevEnemies) => [
          ...prevEnemies,
          {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          },
        ]);
      }
    }, 2000); // Adjust enemy spawn rate as needed

    return () => clearInterval(interval);
  }, [enemyCount, isGameOver]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!isGameOver) {
        const newEnemies = enemies.map((enemy) => {
          // Calculate the direction of movement based on the relative positions of enemy and player
          const dx = playerPositionRef.current.x - enemy.x;
          const dy = playerPositionRef.current.y - enemy.y;
          const directionX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
          const directionY = dy === 0 ? 0 : dy > 0 ? 1 : -1;

          return {
            x: enemy.x + directionX,
            y: enemy.y + directionY,
          };
        });
        setEnemies(newEnemies);
      }
    }, 1000); // Adjust enemy movement speed as needed

    return () => clearInterval(moveInterval);
  }, [enemies, isGameOver]);

  // Check for collisions between player and enemies
  useEffect(() => {
    const collision = enemies.some(
      (enemy) => enemy.x === position.x && enemy.y === position.y
    );
    if (collision) {
      setIsGameOver(true);
    }
  }, [enemies, position]);

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isGameOver) return; // Disable shooting when game is over
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    // Check if any enemy is clicked
    const clickedEnemyIndex = enemies.findIndex(
      (enemy) =>
        mouseX >= enemy.x * 20 &&
        mouseX < (enemy.x + 1) * 20 &&
        mouseY >= enemy.y * 20 &&
        mouseY < (enemy.y + 1) * 20
    );
    if (clickedEnemyIndex !== -1) {
      // Remove clicked enemy
      const updatedEnemies = [...enemies];
      updatedEnemies.splice(clickedEnemyIndex, 1);
      setEnemies(updatedEnemies);
    }
    // Change cursor color when clicked
    setMouseClicked(true);
    setTimeout(() => {
      setMouseClicked(false);
    }, 100);
  };

  const handleMouseEnter = () => {
    // Change cursor to pointer and add target emoji when hovering over the game area
    if (gameAreaRef.current) {
      gameAreaRef.current.style.cursor = "pointer";
    }
  };

  const handleMouseLeave = () => {
    // Reset cursor style when leaving the game area
    if (gameAreaRef.current) {
      gameAreaRef.current.style.cursor = "auto";
    }
  };

  return (
    <div>
      <h1>Move the character with arrow keys</h1>
      <div
        ref={gameAreaRef}
        style={{
          position: "relative",
          width: "400px",
          height: "400px",
          border: "1px solid black",
        }}
        onClick={handleMouseClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Render player */}
        <div
          style={{
            position: "absolute",
            top: `${position.y * 20}px`,
            left: `${position.x * 20}px`,
            width: "20px",
            height: "20px",
            backgroundColor: "red",
          }}
        />

        {/* Render enemies */}
        {enemies.map((enemy, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${enemy.y * 20}px`,
              left: `${enemy.x * 20}px`,
              width: "20px",
              height: "20px",
              backgroundColor: "blue",
            }}
          />
        ))}

        {/* Add target emoji */}
        {gameAreaRef.current && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "30px",
            }}
          >
            🎯
          </div>
        )}
      </div>

      {/* Render Modal for Game Over */}
      <Modal isOpen={isGameOver} onClose={resetGame}>
        <h2>Game Over!</h2>
        <p>Your score: {enemies.length}</p>
        <button onClick={resetGame}>Restart</button>
      </Modal>
    </div>
  );
};

export default App;
