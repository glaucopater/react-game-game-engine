import { POWERUPS_AVATARS } from "../../constants";
import { Position } from "../../custom-types";

interface PowerUpProps {
  powerupPosition: Position;
}

const PowerUp = ({ powerupPosition: medikit }: PowerUpProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${medikit.x * 20}px`,
        top: `${medikit.y * 20}px`,
        width: "20px",
        height: "20px",
      }}
    >
      <span aria-label="medikit" role="img" style={{ fontSize: 20 }}>
        {POWERUPS_AVATARS[0]}
      </span>
    </div>
  );
};

export default PowerUp;
