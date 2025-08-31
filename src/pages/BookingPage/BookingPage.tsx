import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "@/components/Page.tsx";
import { PageHeader } from "@/components/common/PageHeader.tsx";
import { MasterSelect } from "@/components/common/MasterSelect";
import { MonthCalendar } from "@/components/common/MonthCalendar";
import { TimeSlots } from "@/components/common/TimeSlots";

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

import { masters } from "@/components/common/Master";
import { Master } from "@/components/common/Master";

const timeOptions = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMasters, setSelectedMasters] = useState<Master[]>([
    masters[0],
  ]);
  const [month, setMonth] = useState<Date>(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const book = () => {
    // Placeholder action
    // eslint-disable-next-line no-console
    console.log({ selectedMasters, date: selectedDate, time: selectedTime });
    navigate(-1);
  };

  return (
    <Page>
      <div className="bg-white flex flex-col font-sans px-4 py-6 pagesHeightFix">
        {/* Header */}
        <PageHeader
          title="Book a Session"
          right={
            <button
              aria-label="Close"
              className="text-gray-500 text-2xl"
              onClick={() => navigate(-1)}
            >
              ✖
            </button>
          }
        />

        {/* Master Select */}
        <MasterSelect
          masters={masters}
          onChange={setSelectedMasters}
          selectedMasters={selectedMasters}
        />

        {/* Calendar */}
        <MonthCalendar
          month={month}
          masters={selectedMasters}
          setMonth={setMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          setSelectedTime={setSelectedTime}
        />

        {/* Time Slots */}
        <TimeSlots
          options={timeOptions}
          masters={selectedMasters}
          date={selectedDate}
          value={selectedTime}
          onChange={setSelectedTime}
        />

        {/* Book Button */}
        <div className="mt-auto">
          <button
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-[#ff7e5f] to-[#ef6c4d] text-white font-bold text-lg shadow-md ${
              !selectedTime ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!selectedTime}
            onClick={() => selectedTime && book()}
          >
            Book Session
          </button>
        </div>
      </div>
    </Page>
  );
};
