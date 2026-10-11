export default function Marquee({ items, className = "" }) {
  const row = Array.from({ length: 2 }).flatMap(() => items);

  return (
    <div aria-hidden="true" className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="flex w-max motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((text, i) => (
              <span
                key={i}
                className="flex items-center font-display font-extrabold uppercase tracking-wider"
              >
                <span className="px-4">{text}</span>
                <span className="px-2">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}