import React from "react";

export type TimeSlotsProps = {
  options: string[];
  disabledTimes?: Set<string>;
  value: string | null;
  onChange: (val: string) => void;
};

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  options,
  disabledTimes = new Set(),
  value,
  onChange,
}) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">Available Time</h3>
    <div className="grid grid-cols-3 gap-3 text-sm">
      {options.map((t) => {
        const disabled = disabledTimes.has(t);
        const isSelected = value === t;
        const base = "px-3 py-2 rounded-lg";
        const disabledCls = disabled
          ? " bg-gray-100 text-gray-400 cursor-not-allowed"
          : " bg-gray-100";
        const selectedCls =
          isSelected && !disabled
            ? " bg-[#86aec0] text-white font-semibold"
            : "";
        return (
          <button
            key={t}
            className={base + disabledCls + selectedCls}
            disabled={disabled}
            onClick={() => !disabled && onChange(t)}
          >
            {t}
          </button>
        );
      })}
    </div>
  </div>
);
