export type Master = {
  name: string;
  role: string;
  avatarUrl?: string;
  workingHours?: { start: string; end: string };
  workingDays?: number[];
  holidays?: (string | { from: string; to: string })[];
  disabledSlots?: { [date: string]: string[] };
};

export const masters: Master[] = [
  {
    name: "Almaz",
    role: "Relax & Spa",
    avatarUrl: "https://avatars.githubusercontent.com/u/79905215?v=4&size=64",
    workingHours: { start: "09:00", end: "18:00" },
    workingDays: [1, 2, 3, 4, 5],
    holidays: [{ from: "2025-09-10", to: "2025-09-11" }],
    disabledSlots: {
      "2025-09-03": ["10:00", "11:00"],
      "2025-09-04": ["12:00"],
      "2025-09-05": ["09:00", "10:00"],
    },
  },
  {
    name: "Anna",
    role: "Sport Massage",
    avatarUrl: "https://avatars.githubusercontent.com/u/79905215?v=4&size=64",
    workingHours: { start: "11:00", end: "21:00" },
    workingDays: [3, 4, 5, 6, 0],
    holidays: [{ from: "2025-09-15", to: "2025-09-26" }],
    disabledSlots: {
      "2025-09-03": ["15:00", "16:00"],
      "2025-09-04": ["17:00"],
      "2025-09-05": ["11:00", "12:00"],
    },
  },
  {
    name: "Marko",
    role: "Deep Tissue",
    avatarUrl: "https://avatars.githubusercontent.com/u/79905215?v=4&size=64",
    workingHours: { start: "10:00", end: "19:00" },
    workingDays: [2, 3, 4, 5, 6],
    holidays: [{ from: "2025-09-17", to: "2025-09-18" }],
    disabledSlots: {
      "2025-09-03": ["12:00", "14:00"],
      "2025-09-04": ["11:00"],
      "2025-09-05": ["15:00", "16:00"],
    },
  },
];
