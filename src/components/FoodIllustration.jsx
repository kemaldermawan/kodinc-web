import { useId } from "react";

const INK = "#012F49";
const LINE = { stroke: INK, strokeWidth: 4, strokeLinejoin: "round", strokeLinecap: "round" };

function Drizzle({ d, color }) {
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth="13" />
      <path d={d} fill="none" stroke={color} strokeWidth="6" />
    </>
  );
}

function Dimsum({ dough = "#FFF8EA", sauce, cheese, fried }) {
  return (
    <g {...LINE}>
      {fried ? (
        <ellipse cx="100" cy="160" rx="72" ry="14" fill="#FFF8EA" />
      ) : (
        <>
          <path d="M34 124 H166 V158 Q166 170 154 170 H46 Q34 170 34 158 Z" fill="#E7B66B" />
          <path d="M68 124 V170 M100 124 V170 M132 124 V170" fill="none" strokeWidth="3" />
          <path
            d="M84 52 Q78 42 84 32 M100 48 Q94 38 100 28 M116 52 Q110 42 116 32"
            fill="none"
            strokeWidth="3"
          />
        </>
      )}
      <g transform={fried ? "translate(0 18)" : undefined}>
        <path d="M52 128 C52 88 72 62 100 62 C128 62 148 88 148 128 Z" fill={dough} />
        <path
          d="M78 74 Q84 100 80 128 M100 62 V128 M122 74 Q116 100 120 128"
          fill="none"
          strokeWidth="3"
        />
        {sauce && <Drizzle d="M62 98 Q76 88 88 100 T114 98 T138 102" color={sauce} />}
        {cheese && <Drizzle d="M66 112 Q80 104 92 114 T118 112 T136 116" color="#FBC02D" />}
      </g>
    </g>
  );
}

function Donut({ dough = "#E3A860", icing = "#6B3A24", sprinkles = [] }) {
  const ring = (cx, cy, rx, ry) =>
    `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${rx * 2} 0 a${rx} ${ry} 0 1 0 ${-rx * 2} 0 Z`;
  const hole = ring(100, 103, 22, 16);
  const spots = [
    [140, 100], [131, 121], [107, 132], [80, 128], [62, 111],
    [62, 89], [80, 72], [107, 68], [131, 79],
  ];

  return (
    <g {...LINE}>
      <path d={`${ring(100, 106, 70, 56)} ${hole}`} fill={dough} fillRule="evenodd" />
      <path d={`${ring(100, 100, 62, 50)} ${hole}`} fill={icing} fillRule="evenodd" />
      {sprinkles.length > 0 &&
        spots.map(([x, y], i) => (
          <rect
            key={i}
            x="-6"
            y="-2"
            width="12"
            height="4"
            rx="2"
            transform={`translate(${x} ${y}) rotate(${i * 40})`}
            fill={sprinkles[i % sprinkles.length]}
            stroke="none"
          />
        ))}
      <path d="M52 86 Q58 66 80 58" fill="none" stroke="#FFFFFF" strokeOpacity=".6" strokeWidth="5" />
    </g>
  );
}

function Cookie({ dough = "#D9A15B", chip = "#5B3220" }) {
  const chips = [
    [78, 80, 10], [118, 74, -20], [94, 106, 25], [132, 108, -5],
    [70, 126, 15], [108, 136, 30], [142, 86, 0],
  ];

  return (
    <g {...LINE}>
      <circle cx="100" cy="104" r="66" fill={dough} />
      {chips.map(([x, y, r], i) => (
        <rect
          key={i}
          x="-9"
          y="-6"
          width="18"
          height="12"
          rx="4"
          strokeWidth="3"
          transform={`translate(${x} ${y}) rotate(${r})`}
          fill={chip}
        />
      ))}
      <path d="M56 90 Q62 70 82 62" fill="none" stroke="#FFFFFF" strokeOpacity=".55" strokeWidth="5" />
    </g>
  );
}

function Drink({ layers = ["#8A4B2E", "#5B3220"], whip }) {
  const id = useId().replace(/:/g, "");
  const cup = "M58 66 H142 L130 168 Q129 178 119 178 H81 Q71 178 70 168 Z";

  return (
    <g {...LINE}>
      <defs>
        <clipPath id={`cup-${id}`}>
          <path d={cup} />
        </clipPath>
      </defs>

      <path d={cup} fill="#FFFDF6" fillOpacity=".55" stroke="none" />
      <g clipPath={`url(#cup-${id})`} stroke="none">
        <rect x="50" y="88" width="100" height="44" fill={layers[0]} />
        <rect x="50" y="132" width="100" height="50" fill={layers[1]} />
        <rect
          x="76" y="96" width="20" height="20" rx="4"
          fill="#FFFFFF" fillOpacity=".5" stroke={INK} strokeWidth="2.5"
          transform="rotate(-12 86 106)"
        />
        <rect
          x="108" y="102" width="20" height="20" rx="4"
          fill="#FFFFFF" fillOpacity=".5" stroke={INK} strokeWidth="2.5"
          transform="rotate(10 118 112)"
        />
      </g>

      <path d="M106 122 L122 22" fill="none" stroke={INK} strokeWidth="12" />
      <path d="M106 122 L122 22" fill="none" stroke="#C21121" strokeWidth="5" />

      {whip && (
        <>
          <path
            d="M60 68 C56 52 74 44 86 50 C92 38 112 38 118 50 C130 46 146 56 140 68 Z"
            fill="#FFF8EA"
          />
          <path d="M74 60 Q88 54 100 60 T126 60" fill="none" stroke={layers[1]} strokeWidth="5" />
        </>
      )}

      <path d={cup} fill="none" />
      <path d="M54 66 H146" fill="none" strokeWidth="5" />
    </g>
  );
}

const KINDS = { dimsum: Dimsum, donut: Donut, cookie: Cookie, drink: Drink };

export default function FoodIllustration({ art, bg = "#F6DCAB", label, className = "" }) {
  const Art = KINDS[art?.type] ?? Cookie;

  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={`grid place-items-center ${className}`}
      style={{
        backgroundColor: bg,
        backgroundImage: "radial-gradient(rgb(1 47 73 / 0.12) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <svg viewBox="0 0 200 200" className="size-full max-h-full p-2" aria-hidden="true">
        <Art {...art} />
      </svg>
    </div>
  );
}