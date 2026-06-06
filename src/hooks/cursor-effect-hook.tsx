import { useState, useEffect } from "react";

export const useCursorEffect = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorTransition, setCursorTransition] = useState("");
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let mouseTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const tags = [
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "P",
        "A",
        "BUTTON",
        "SPAN",
        "SVG",
        "TIME",
        "LI",
        "LABEL",
      ];
      if (tags.includes((e.target as HTMLElement).tagName)) {
        setIsHovering(true);
        setCursorTransition(
          "transform 0.2s ease-in-out, width 0.2s ease-in-out, height 0.2s ease-in-out"
        );
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const tags = [
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "P",
        "A",
        "BUTTON",
        "SPAN",
        "SVG",
        "TIME",
        "LI",
        "LABEL",
      ];
      if (tags.includes((e.target as HTMLElement).tagName)) {
        setIsHovering(false);
        setCursorTransition(
          "transform 0.4s ease-in-out, width 0.4s ease-in-out, height 0.4s ease-in-out"
        );
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return { cursorPosition, isHovering, cursorTransition, isMoving };
};

export default useCursorEffect;
