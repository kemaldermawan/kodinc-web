const POINTS = Array.from({ length: 24 }, (_, i) => {
  const angle = (Math.PI * i) / 12;
  const radius = i % 2 ? 37 : 47;
  return `${(50 + radius * Math.cos(angle)).toFixed(1)},${(50 + radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

export default function Starburst({
  children,
  fill = "#C21121",
  textClass = "text-cream",
  className = "",
}) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 size-full drop-shadow-[3px_3px_0_#012F49]"
      >
        <polygon
          points={POINTS}
          fill={fill}
          stroke="#012F49"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <div className={`relative text-center font-display font-extrabold leading-none ${textClass}`}>
        {children}
      </div>
    </div>
  );
}