import React from "react";
import { Multiselect } from "@telegram-apps/telegram-ui";
import { Master } from "./Master";

export type MultiselectOptionType = {
  value: string;
  label: string;
};

export const MultiselectOption: React.FC<MultiselectOptionType> = ({
  value,
  label,
}) => <option value={value}>{label}</option>;

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
  const handleChange = (selected: MultiselectOptionType[]) => {
    const selectedMasters = masters.filter((m) =>
      selected.some((s) => s.value === m.name)
    );
    onChange(selectedMasters);
  };

  return (
    <div
      className="mb-6"
      style={{
        background: "#fff",
      }}
    >
      {/* <label className="block text-gray-700 font-semibold mb-2 text-sm bg-white">
        Select Master
      </label> */}
      {/* <p className="text-xs text-gray-400 mt-1">You can choose multiple</p> */}
      <Multiselect
        header="Select masters"
        placeholder="All masters"
        emptyText="No masters"
        closeDropdownAfterSelect={true}
        options={masters.map((m) => ({ value: m.name, label: m.name }))}
        value={selectedMasters.map((m) => ({ value: m.name, label: m.name }))}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#86aec0] focus:outline-none bg-white"
      >
        {masters.map((master, idx) => (
          <MultiselectOption
            key={idx}
            value={master.name}
            label={master.name}
          />
        ))}
      </Multiselect>
    </div>
  );
};
