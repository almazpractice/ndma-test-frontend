import React, { useMemo } from "react";

function formatMonthYear(d: Date) {
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, months: number) {
  return new Date(d.getFullYear(), d.getMonth() + months, 1);
}

function mondayIndex(jsDay: number) {
  // JS: 0..6 (Sun..Sat). We need Mon..Sun => 0..6
  return (jsDay + 6) % 7;
}

type DayCell = { date: Date; inMonth: boolean };

function buildCalendarGrid(currentMonth: Date): DayCell[] {
  const first = startOfMonth(currentMonth);
  const firstWeekday = mondayIndex(first.getDay());
  const grid: DayCell[] = [];
  const start = new Date(first);
  start.setDate(first.getDate() - firstWeekday);

  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    grid.push({ date: d, inMonth: d.getMonth() === currentMonth.getMonth() });
  }
  return grid;
}

export type MonthCalendarProps = {
  month: Date;
  setMonth: (d: (prev: Date) => Date) => void;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
};

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  month,
  setMonth,
  selectedDate,
  onSelectDate,
}) => {
  const grid = useMemo(() => buildCalendarGrid(month), [month]);
  const monthLabel = useMemo(() => formatMonthYear(month), [month]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <button
          className="text-gray-500 text-lg"
          onClick={() => setMonth((prev) => addMonths(prev, -1))}
        >
          ←
        </button>
        <h2 className="text-gray-800 font-bold text-base">{monthLabel}</h2>
        <button
          className="text-gray-500 text-lg"
          onClick={() => setMonth((prev) => addMonths(prev, 1))}
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 rounded-full">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((w) => (
          <div key={w} className="font-semibold">
            {w}
          </div>
        ))}

        {grid.map((cell) => {
          const key = cell.date.toISOString();
          const isSelected =
            selectedDate &&
            cell.date.toDateString() === selectedDate.toDateString();
          const base = "rounded-lg";
          const inMonthCls = cell.inMonth ? "" : " text-gray-300";
          const selectedCls = isSelected
            ? " bg-[#ff7e5f] text-white font-semibold rounded-full"
            : "";
          return (
            <button
              key={key}
              className={base + inMonthCls + selectedCls}
              onClick={() => cell.inMonth && onSelectDate(cell.date)}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
