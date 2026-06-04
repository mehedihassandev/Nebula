import PropTypes from "prop-types";

interface CursorEffectProps {
  cursorPosition: { x: number; y: number };
  width: string;
  height: string;
  zIndex: number;
  transition: string;
  transform: string;
  opacity: number;
  backgroundColor: string;
}

export const CursorEffect = ({
  cursorPosition,
  width,
  height,
  zIndex,
  transition,
  transform,
  opacity,
  backgroundColor,
}: CursorEffectProps) => {
  const { x, y } = cursorPosition;

  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y}px`,
        position: "fixed",
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: zIndex,
        transition: transition,
        transform: transform,
        opacity: opacity,
        mixBlendMode: "difference",
      }}
    />
  );
};

CursorEffect.propTypes = {
  cursorPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired,
  transition: PropTypes.string.isRequired,
  transform: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default CursorEffect;
