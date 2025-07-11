import { Shift } from "../types/shift";

export const MOCK_SHIFTS: Shift[] = [
  {
    id: "shift-1",
    status: "closed",
    openedAt: "2025-07-10T08:00:00",
    closedAt: "2025-07-10T17:00:00",
    userId: "u1",
    userName: "Pedro Toribio",
    openingCash: 1000,
    closingCash: 3790,
    expectedCash: 3790,
    notes: "Matched perfectly.",
    movements: [
      {
        id: "m1",
        type: "income",
        amount: 2000,
        date: "2025-07-10T10:00:00",
        description: "Cash sale",
        account: "cash",
      },
    ],
  },
  // More...
];
