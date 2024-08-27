import { AMMO_AVATAR } from "../../constants";
import { Position } from "../../custom-types";

interface AmmoProps {
  ammunition: Position;
}

const Ammo = ({ ammunition }: AmmoProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${ammunition.x * 20}px`,
        top: `${ammunition.y * 20}px`,
        width: "20px",
        height: "20px",
      }}
    >
      <span aria-label="ammo" role="img" style={{ fontSize: 20 }}>
        {AMMO_AVATAR}
      </span>
    </div>
  );
};

export default Ammo;
