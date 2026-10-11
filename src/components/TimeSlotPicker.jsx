export default function TimeSlotPicker({ id, value, slots, onChange, invalid, describedBy }) {
  return (
    <div
      id={id}
      tabIndex={-1}
      role="group"
      aria-label="Pilih jam pengambilan"
      aria-describedby={describedBy}
      className={`grid grid-cols-3 gap-1.5 ${
        invalid ? "rounded-xl outline-2 outline-offset-4 outline-brand" : ""
      }`}
    >
      {slots.map((time) => {
        const selected = value === time;
        return (
          <button
            key={time}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(time)}
            className={`rounded-md border-2 border-navy px-1 py-1.5 text-sm font-bold transition duration-200 ${
              selected ? "bg-navy text-cream" : "bg-cream hover:-translate-y-0.5 hover:bg-sun"
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}