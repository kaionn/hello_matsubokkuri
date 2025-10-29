type PineconeImageProps = {
  isPressed: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onClick: () => void;
};

export const PineconeImage = ({
  isPressed,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  onClick,
}: PineconeImageProps) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

      <img
        src="/matsu.png"
        alt="松ぼっくり"
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={`
          relative cursor-pointer
          w-32 sm:w-40 md:w-48 lg:w-64
          h-auto
          object-contain
          transition-all duration-300 ease-out
          ${
            isPressed
              ? "scale-90 rotate-[-5deg]"
              : "scale-100 hover:scale-110 hover:rotate-3"
          }
          hover:drop-shadow-[0_20px_60px_rgba(255,255,255,0.5)]
          drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]
          filter hover:brightness-110
          active:brightness-95
        `}
      />
    </div>
  );
};
