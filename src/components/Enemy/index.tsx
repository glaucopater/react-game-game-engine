import { ENEMY_AVATARS } from "../../constants";
import "./Enemy.css";
import { Position } from "../../custom-types";

export const Enemy = ({
  enemy,
  id,
  isPaused,
}: {
  enemy: Position;
  id: string;
  isPaused: boolean;
}) => {
  return (
    <div
      className={"enemy " + (isPaused ? "" : "pulse")}
      id={`enemy-${id}`}
      data-testid={`enemy-${id}`}
      style={{
        top: `${enemy.y * 20}px`,
        left: `${enemy.x * 20}px`,
      }}
    >
      <span aria-label="enemy" role="img" style={{ fontSize: 20 }}>
        {ENEMY_AVATARS[0]}
      </span>
    </div>
  );
};
