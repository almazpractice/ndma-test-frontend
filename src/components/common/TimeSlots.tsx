import React from "react";
import { Master } from "./Master";

export type TimeSlotsProps = {
  options: string[];
  masters: Master[];
  date: Date | null;
  disabledTimes?: Set<string>;
  value: string | null;
  onChange: (val: string) => void;
};

function toLocalYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  options,
  masters,
  date,
  value,
  onChange,
}) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">Available Time</h3>
    <div className="grid grid-cols-3 gap-3 text-sm">
      {options.map((t) => {
        const isSelected = value === t;
        const isWorkingDay = masters.some((m) =>
          m.workingDays?.includes(date ? date.getDay() : -1)
        );
        const isWorkingHours = masters.some((m) => {
          if (!m.workingHours) return false;
          const hour = t.split(":").map(Number)[0];
          const startHour = m.workingHours.start.split(":").map(Number)[0];
          const endHour = m.workingHours.end.split(":").map(Number)[0];
          return hour >= startHour && hour < endHour;
        });
        const isAvailable = masters.some((m) => {
          if (!m.disabledSlots || !date) return true;
          const dateStr = toLocalYMD(date);
          return !(m.disabledSlots[dateStr] || []).includes(t);
        });
        // console.log({ t, isWorkingDay, isWorkingHours, isDisabled });

        const base = "px-3 py-2 rounded-lg";
        let currentCls = "";
        if (!isAvailable || !isWorkingDay || !isWorkingHours) {
          currentCls = " bg-gray-100 text-gray-400 cursor-not-allowed";
        } else if (isSelected) {
          currentCls = " bg-[#ff7e5f] text-white font-semibold";
        } else {
          currentCls = " text-gray-700 hover:bg-gray-200";
        }
        return (
          <button
            key={t}
            className={base + currentCls}
            disabled={!isAvailable || !isWorkingDay || !isWorkingHours}
            onClick={() =>
              isAvailable && isWorkingDay && isWorkingHours && onChange(t)
            }
          >
            {t}
          </button>
        );
      })}
    </div>
  </div>
);
