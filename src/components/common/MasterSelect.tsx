import React from "react";
import { Multiselect } from "@telegram-apps/telegram-ui";
import { Master } from "./Master";

// Local option type compatible with telegram-ui Multiselect
// (value can be string | number; label can be ReactNode)
type TAUOption = { value: string | number; label: React.ReactNode };

export type MasterSelectProps = {
  masters: Master[];
  onChange: (value: Master[]) => void;
  selectedMasters: Master[];
};

export const MasterSelect: React.FC<MasterSelectProps> = ({
  masters,
  onChange,
  selectedMasters,
}) => {
  const handleChange = (selected: TAUOption[]) => {
    const next = masters.filter((m) =>
      selected.some((s) => String(s.value) === m.name)
    );
    onChange(next);
  };

  return (
    <div
      className="mb-6"
      style={{
        background: "#fff",
      }}
    >
      <Multiselect
        header="Select masters"
        placeholder="All masters"
        emptyText="No masters"
        closeDropdownAfterSelect={true}
        options={masters.map((m) => ({ value: m.name, label: m.name }))}
        value={selectedMasters.map((m) => ({ value: m.name, label: m.name }))}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#86aec0] focus:outline-none bg-white"
      />
    </div>
  );
};
