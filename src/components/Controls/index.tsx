import "./Controls.css";

type ControlsProps = {
  moveUp: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  pauseGame: () => void;
};

export const Controls = ({
  moveUp,
  moveLeft,
  moveRight,
  moveDown,
  pauseGame,
}: ControlsProps) => {
  return (
    <div className="controls">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => moveUp()}>Up</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <button onClick={() => moveLeft()}>Left</button>
        <button onClick={() => moveRight()}>Right</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => moveDown()}>Down</button>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <button style={{ width: "100%" }} onClick={() => pauseGame()}>
          Pause (spacebar)
        </button>
      </div>
    </div>
  );
};
