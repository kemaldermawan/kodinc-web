import { useMemo, useState } from "react";
import { formatLongDate, parseISODate, toISODate } from "../utils/format";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MAX_MONTHS_AHEAD = 2;
const monthLabel = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" });

const monthStart = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);

const NAV_BTN =
  "grid size-7 place-items-center rounded-md border-2 border-navy bg-cream transition hover:bg-sun disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-cream";

export default function DatePicker({ id, value, min, openDays, onChange, invalid, describedBy }) {
  const minDate = useMemo(() => parseISODate(min), [min]);
  const firstMonth = monthStart(minDate);
  const lastMonth = addMonths(firstMonth, MAX_MONTHS_AHEAD);
  const [view, setView] = useState(() => monthStart(value ? parseISODate(value) : minDate));

  const cells = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const lead = (new Date(year, month, 1).getDay() + 6) % 7; // minggu dimulai Senin
    const total = new Date(year, month + 1, 0).getDate();
    const days = [
      ...Array(lead).fill(null),
      ...Array.from({ length: total }, (_, i) => new Date(year, month, i + 1)),
    ];
    while (days.length % 7) days.push(null);
    return days;
  }, [view]);

  return (
    <div
      id={id}
      tabIndex={-1}
      aria-describedby={describedBy}
      className={`w-full max-w-[19rem] rounded-xl border-2 bg-cream p-2.5 ${
        invalid ? "border-brand" : "border-navy"
      }`}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(addMonths(view, -1))}
          disabled={view <= firstMonth}
          aria-label="Bulan sebelumnya"
          className={NAV_BTN}
        >
          <ChevronLeftIcon className="size-3.5" />
        </button>
        <p className="font-display text-base font-bold capitalize" aria-live="polite">
          {monthLabel.format(view)}
        </p>
        <button
          type="button"
          onClick={() => setView(addMonths(view, 1))}
          disabled={view >= lastMonth}
          aria-label="Bulan berikutnya"
          className={NAV_BTN}
        >
          <ChevronRightIcon className="size-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-0.5 text-[11px] font-bold text-navy/60">
            {d}
          </span>
        ))}

        {cells.map((date, i) => {
          if (!date) return <span key={`blank-${i}`} />;

          const iso = toISODate(date);
          const disabled = date < minDate || !openDays.includes(date.getDay());
          const selected = iso === value;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              aria-label={formatLongDate(iso)}
              onClick={() => onChange(iso)}
              className={`h-8 rounded-md border-2 text-sm font-bold transition ${
                selected
                  ? "border-navy bg-brand text-cream"
                  : disabled
                    ? "cursor-not-allowed border-transparent text-navy/25"
                    : "border-transparent hover:border-navy hover:bg-sun"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {value && (
        <p className="mt-2 border-t-2 border-dashed border-navy/30 pt-1.5 text-xs font-semibold">
          Dipilih: {formatLongDate(value)}
        </p>
      )}
    </div>
  );
}