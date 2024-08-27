import { useState, useEffect } from "react";
import { Position } from "../custom-types";

const useLineToMouse = () => {
  const [mousePosition, setMousePosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // clearInterval(intervalId);
    };
  }, []);

  return { mousePosition };
};

export default useLineToMouse;
