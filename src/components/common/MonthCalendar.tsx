import React, { useMemo } from "react";
import { Master } from "./Master";

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

function toLocalYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

type DayCell = { date: Date; inMonth: boolean; notPast: boolean };

function buildCalendarGrid(currentMonth: Date): DayCell[] {
  const first = startOfMonth(currentMonth);
  const firstWeekday = mondayIndex(first.getDay());
  const grid: DayCell[] = [];
  const start = new Date(first);
  start.setDate(first.getDate() - firstWeekday);

  const today = new Date();
  const todayKey = toLocalYMD(today);

  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = toLocalYMD(d);
    grid.push({
      date: d,
      inMonth: d.getMonth() === currentMonth.getMonth(),
      notPast: key >= todayKey,
    });
  }
  return grid;
}

export type MonthCalendarProps = {
  month: Date;
  masters: Master[];
  setMonth: (d: (prev: Date) => Date) => void;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  setSelectedTime: (t: string | null) => void;
};

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  month,
  masters,
  setMonth,
  selectedDate,
  onSelectDate,
  setSelectedTime,
}) => {
  const grid = useMemo(() => buildCalendarGrid(month), [month]);
  const monthLabel = useMemo(() => formatMonthYear(month), [month]);

  const handleSelectDate = (date: Date) => {
    onSelectDate(date);
    setSelectedTime(null);
  };

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

      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600">
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
          const isToday =
            new Date().toDateString() === cell.date.toDateString();
          const isNotWorkingDay = !masters.some((m) =>
            m.workingDays?.includes(cell.date.getDay())
          );

          const dayKey = toLocalYMD(cell.date);
          const isHoliday = masters.some((m) =>
            m.holidays?.some((h) => {
              if (typeof h === "string") {
                // Expecting YYYY-MM-DD
                return h === dayKey;
              }
              // Compare as strings YYYY-MM-DD to avoid TZ issues
              return dayKey >= h.from && dayKey <= h.to;
            })
          );

          const base = "rounded-lg";
          let clsName = "";
          if (!cell.notPast && cell.inMonth) {
            clsName += " text-gray-500 cursor-not-allowed";
          } else if (!cell.inMonth) {
            clsName += " text-gray-200";
          } else if (isNotWorkingDay || isHoliday) {
            if (!isToday) {
              clsName += " text-gray-300";
            }
            clsName += " cursor-not-allowed";
          } else if (isToday && !isSelected) {
            clsName += " bg-gray-200 font-semibold";
          } else if (isSelected) {
            clsName += " bg-[#ff7e5f] text-white font-semibold";
          }
          return (
            <button
              key={key}
              className={base + clsName}
              onClick={() =>
                cell.inMonth && cell.notPast && handleSelectDate(cell.date)
              }
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
