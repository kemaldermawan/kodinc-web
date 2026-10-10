export default function QuantityStepper({ qty, label, onIncrement, onDecrement }) {
  const btn =
    "grid size-9 place-items-center text-lg font-bold transition hover:bg-butter rounded-full";

  return (
    <div className="inline-flex items-center rounded-full border-2 border-cocoa bg-white">
      <button type="button" onClick={onDecrement} aria-label={`Kurangi ${label}`} className={btn}>
        −
      </button>
      <span className="min-w-8 text-center font-bold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button type="button" onClick={onIncrement} aria-label={`Tambah ${label}`} className={btn}>
        +
      </button>
    </div>
  );
}