import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Hotel, Room } from "@/types/hotel";

type BookingState = {
  selectedHotel: Hotel | null;
  selectedRoom: Room | null;
  setSelectedHotel: (hotel: Hotel) => void;
  setSelectedRoom: (room: Room) => void;
  clearBooking: () => void;
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      selectedHotel: null,
      selectedRoom: null,

      setSelectedHotel: (hotel) =>
        set({
          selectedHotel: hotel,
        }),

      setSelectedRoom: (room) =>
        set({
          selectedRoom: room,
        }),

      clearBooking: () =>
        set({
          selectedHotel: null,
          selectedRoom: null,
        }),
    }),
    {
      name: "anchor-booking",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);