import React from "react";
import { MasterCard } from "./MasterCard";
import { Master } from "./Master";

export const MastersGrid: React.FC<{
  masters: Master[];
  onViewSlots?: (m: Master) => void;
}> = ({ masters, onViewSlots }) => (
  <div className="px-4 py-6">
    <h3 className="text-lg font-bold text-gray-900 mb-3">Our Masters</h3>
    <div className="grid grid-cols-3 gap-4">
      {masters.map((m, i) => (
        <MasterCard
          key={`${m.name}-${i}`}
          master={m}
          onViewSlots={onViewSlots}
        />
      ))}
    </div>
  </div>
);
