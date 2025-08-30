import React from "react";
import { Avatar } from "@telegram-apps/telegram-ui";
import { Master } from "./Master";

export const MasterCard: React.FC<{
  master: Master;
  onViewSlots?: (m: Master) => void;
}> = ({ master, onViewSlots }) => (
  <div className="rounded-xl text-white p-4 shadow-md flex flex-col items-center bg-[#86aec0]">
    <Avatar
      size={48}
      src={master.avatarUrl}
      className="border-2 border-white text-white"
      alt={master.name}
      acronym={master.name[0]}
    />
    <p className="mt-2 font-semibold">{master.name}</p>
    <p className="text-xs">{master.role}</p>
    <button
      className="mt-3 bg-white text-[#3b82f6] px-2.5 py-1.5 rounded-lg text-xs font-medium"
      onClick={() => onViewSlots?.(master)}
    >
      View Slots
    </button>
  </div>
);
