"use client";

import { useRouter } from "next/navigation";
import { BedDouble, Users } from "lucide-react";

import { Hotel, Room } from "@/types/hotel";
import { useBookingStore } from "@/stores/booking.store";
import { getAmenityLabel } from "@/utils/hotel.utils";
import { formatBRL } from "@/utils/formatters.utils";

type RoomCardProps = {
  hotel: Hotel;
  room: Room;
};

export function RoomCard({ hotel, room }: RoomCardProps) {
  const router = useRouter();
  
  const setSelectedHotel = useBookingStore((state) => state.setSelectedHotel);
  const setSelectedRoom = useBookingStore((state) => state.setSelectedRoom);

  function handleSelectRoom() {
    setSelectedHotel(hotel);
    setSelectedRoom(room);

    router.push("/checkout");
  }

  return (
    <article className="rounded-2xl border bg-white p-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">{room.name}</h3>

          <p className="mt-2 text-gray-600">{room.description}</p>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={16} />
              Até {room.maxGuests} hóspedes
            </span>

            <span className="flex items-center gap-1">
              <BedDouble size={16} />
              {room.size}m²
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {room.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
              >
                {getAmenityLabel(amenity)}
              </span>
            ))}
          </div>

          <p className="mt-4 text-sm font-medium text-orange-600">
            Apenas {room.available} quarto(s) disponível(is)!
          </p>
        </div>

        <div className="min-w-[180px] text-left md:text-right">
          <p className="text-sm text-gray-500">Diária</p>

          <p className="text-3xl font-bold text-primary">
            {formatBRL(room.pricePerNight)}
          </p>

          <button
            type="button"
            onClick={handleSelectRoom}
            className="mt-4 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dark cursor-pointer transition-colors"
          >
            Selecionar
          </button>
        </div>
      </div>
    </article>
  );
}
