import { create } from "zustand";
import { Hotel, Room } from "@/types/hotel";

type BookingState = {
  selectedHotel: Hotel | null;
  selectedRoom: Room | null;
  setSelectedHotel: (hotel: Hotel) => void;
  setSelectedRoom: (room: Room) => void;
  clearBooking: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  selectedHotel: null,
  selectedRoom: null,

  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
  setSelectedRoom: (room) => set({ selectedRoom: room }),

  clearBooking: () =>
    set({
      selectedHotel: null,
      selectedRoom: null,
    }),
}));