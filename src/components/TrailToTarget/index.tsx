import { Position } from "../../custom-types";

export const TrailToTarget = ({
  rect,
  mousePosition,
}: {
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  mousePosition: Position;
}) => {
  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    >
      <line
        x1={rect.x + rect.width / 2}
        y1={rect.y + rect.height / 2}
        x2={mousePosition.x}
        y2={mousePosition.y}
        stroke="white"
        strokeWidth="2"
        strokeDasharray="5"
        opacity={0.5}
      />
    </svg>
  );
};
