import { Position } from "../../custom-types";

export interface WallProps {
  wallCoordinates: Position[];
}

const Wall = ({ wallCoordinates }: WallProps) => {
  return (
    <>
      {wallCoordinates.map((coordinate, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${coordinate.x * 20}px`,
            top: `${coordinate.y * 20}px`,
            width: "20px",
            height: "20px",
            backgroundColor: "gray",
          }}
        />
      ))}
    </>
  );
};

export default Wall;
