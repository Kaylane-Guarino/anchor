import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Hotel, Room } from "@/types/hotel";

type BookingState = {
  selectedHotel: Hotel | null;
  selectedRoom: Room | null;
  checkIn: string;
  checkOut: string;

  setSelectedHotel: (hotel: Hotel) => void;
  setSelectedRoom: (room: Room) => void;
  setBookingDates: (dates: {
    checkIn: string;
    checkOut: string;
  }) => void;
  clearBooking: () => void;
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      selectedHotel: null,
      selectedRoom: null,
      checkIn: "",
      checkOut: "",

      setSelectedHotel: (hotel) =>
        set({
          selectedHotel: hotel,
        }),

      setSelectedRoom: (room) =>
        set({
          selectedRoom: room,
        }),

      setBookingDates: ({ checkIn, checkOut }) =>
        set({
          checkIn,
          checkOut,
        }),

      clearBooking: () =>
        set({
          selectedHotel: null,
          selectedRoom: null,
          checkIn: "",
          checkOut: "",
        }),
    }),
    {
      name: "anchor-booking",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);