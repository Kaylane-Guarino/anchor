"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHotelById, getReviewsByHotelId, getRoomsByHotelId } from "@/services/api";

// import { RoomCard } from "@/components/hotel/RoomCard";

type HotelDetailsProps = {
  hotelId: string;
};

export function HotelDetails({ hotelId }: HotelDetailsProps) {
  const {
    data: hotel,
    isLoading: isLoadingHotel,
    isError: isHotelError,
  } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => getHotelById(hotelId),
  });

  const {
    data: rooms,
    isLoading: isLoadingRooms,
    isError: isRoomsError,
  } = useQuery({
    queryKey: ["rooms", hotelId],
    queryFn: () => getRoomsByHotelId(hotelId),
    enabled: Boolean(hotelId),
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", hotelId],
    queryFn: () => getReviewsByHotelId(hotelId),
    enabled: Boolean(hotelId),
  });

  if (isLoadingHotel) {
    return <HotelDetailsSkeleton />;
  }

  if (isHotelError || !hotel) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground">
            Hotel não encontrado
          </h1>

          <p className="mt-2 text-gray-500">
            Não foi possível carregar os detalhes desse hotel.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          {hotel.name}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            {hotel.destination} • {hotel.address}
          </span>

          <span className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            {hotel.rating} • {hotel.reviewCount} avaliações
          </span>
        </div>
      </div>

      <HotelGallery
        images={hotel.images.length > 0 ? hotel.images : [hotel.thumbnail]}
        hotelName={hotel.name}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              Sobre este hotel
            </h2>

            <p className="leading-relaxed text-gray-600">
              {hotel.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Quartos disponíveis
            </h2>

            {isLoadingRooms && <p className="text-gray-500">Carregando quartos...</p>}

            {isRoomsError && (
              <p className="text-red-600">
                Não foi possível carregar os quartos.
              </p>
            )}

            {/* <div className="grid gap-4">
              {rooms?.map((room) => (
                <RoomCard key={room.id} hotel={hotel} room={room} />
              ))}
            </div> */}
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Avaliações dos hóspedes
            </h2>

            <div className="grid gap-4">
              {reviews?.slice(0, 3).map((review) => (
                <article key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <strong className="text-foreground">{review.guestName}</strong>

                    <span className="rounded-lg bg-primary px-2 py-1 text-sm font-bold text-white">
                      {review.rating}
                    </span>
                  </div>

                  <h3 className="mt-2 font-semibold text-foreground">
                    {review.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {review.comment}
                  </p>
                </article>
              ))}

              {!reviews?.length && (
                <p className="text-gray-500">Nenhuma avaliação disponível.</p>
              )}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">A partir de</p>

          <p className="text-3xl font-bold text-primary">
            R$ {hotel.pricePerNight}
          </p>

          <p className="text-sm text-gray-500">por noite</p>

          <div className="mt-5 border-t pt-5 text-sm text-gray-600">
            <p>
              <strong>Check-in:</strong> {hotel.checkInTime}
            </p>

            <p className="mt-2">
              <strong>Check-out:</strong> {hotel.checkOutTime}
            </p>

            <p className="mt-2">
              <strong>Disponíveis:</strong> {hotel.availableRooms} quartos
            </p>
          </div>

          <p className="mt-5 rounded-xl bg-orange-50 p-3 text-sm text-orange-700">
            {hotel.cancellationPolicy}
          </p>
        </aside>
      </div>
    </section>
  );
}

type HotelGalleryProps = {
  images: string[];
  hotelName: string;
};

function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  const mainImage = images[0];
  const secondaryImages = images.slice(1, 5);

  return (
    <div className="grid gap-2 overflow-hidden rounded-2xl md:grid-cols-[2fr_1fr]">
      <div className="relative h-[360px] bg-gray-200">
        <Image
          src={mainImage}
          alt={hotelName}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {secondaryImages.map((image, index) => (
          <div key={image} className="relative h-[176px] bg-gray-200">
            <Image
              src={image}
              alt={`${hotelName} imagem ${index + 2}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelDetailsSkeleton() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 h-10 w-2/3 animate-pulse rounded bg-gray-200" />

      <div className="h-[360px] animate-pulse rounded-2xl bg-gray-200" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="h-48 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-72 animate-pulse rounded-2xl bg-gray-200" />
        </div>

        <div className="h-72 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    </section>
  );
}