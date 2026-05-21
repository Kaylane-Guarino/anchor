"use client";

import { MapPin, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  getHotelById,
  getReviewsByHotelId,
  getRoomsByHotelId,
} from "@/services/api";
import { HotelGallery } from "@/components/hotel/HotelGallery";
import { getAmenityLabel } from "@/utils/hotel.utils";
import { RoomCard } from "@/components/hotel/RoomCard";
import { formatBRL } from "@/utils/formatters.utils";
import Image from "next/image";

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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          {hotel.name}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 underline hover:text-primary"
          >
            <MapPin size={16} />
            {hotel.destination} • {hotel.address}
          </a>

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

            <p className="leading-relaxed text-gray-600">{hotel.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  {getAmenityLabel(amenity)}
                </span>
              ))}
            </div>

            <div className="lg:hidden">
              <HotelPriceSummary
                variant="mobile"
                pricePerNight={hotel.pricePerNight}
                checkInTime={hotel.checkInTime}
                checkOutTime={hotel.checkOutTime}
                availableRooms={hotel.availableRooms}
              />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Quartos disponíveis
            </h2>

            {isLoadingRooms && (
              <p className="text-gray-500">Carregando quartos...</p>
            )}

            {isRoomsError && (
              <p className="text-red-600">
                Não foi possível carregar os quartos.
              </p>
            )}

            <div className="grid gap-4">
              {rooms?.map((room) => (
                <RoomCard key={room.id} hotel={hotel} room={room} />
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Avaliações dos hóspedes
            </h2>

            <div className="grid gap-4">
              {reviews?.slice(0, 3).map((review) => (
                <article
                  key={review.id}
                  className="border-b pb-4 last:border-b-0 flex items-start gap-4"
                >
                  <Image
                    src={review.guestAvatar}
                    alt={review.guestName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-foreground">
                        {review.guestName}
                      </strong>

                      <span className="text-sm font-bold text-secondary-text flex flex-col items-center">
                        {review.rating}
                        <div className="flex">
                          {Array(review.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                size={10}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            ))}
                        </div>
                      </span>
                    </div>

                    <h3 className="mt-2 font-semibold text-foreground">
                      {review.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                </article>
              ))}

              {!reviews?.length && (
                <p className="text-gray-500">Nenhuma avaliação disponível.</p>
              )}
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <HotelPriceSummary
            pricePerNight={hotel.pricePerNight}
            checkInTime={hotel.checkInTime}
            checkOutTime={hotel.checkOutTime}
            availableRooms={hotel.availableRooms}
          />
        </aside>
      </div>
    </section>
  );
}

type HotelPriceSummaryProps = {
  pricePerNight: number;
  checkInTime: string;
  checkOutTime: string;
  availableRooms: number;
  variant?: "mobile" | "desktop";
};

function HotelPriceSummary({
  pricePerNight,
  checkInTime,
  checkOutTime,
  availableRooms,
  variant = "desktop",
}: HotelPriceSummaryProps) {
  return (
    <div
      className={
        variant === "mobile"
          ? "mt-6"
          : "h-fit rounded-2xl bg-white p-6 shadow-sm"
      }
    >
      <p className="hidden text-sm text-gray-500 md:flex">A partir de</p>

      <p className="hidden text-3xl font-bold text-primary md:flex">
        {formatBRL(pricePerNight)}
      </p>

      <p className="hidden text-sm text-gray-500 md:flex">por noite</p>

      <p className="flex text-lg font-semibold text-foreground mb-4 md:hidden">
        Informações de checkin
      </p>

      <div className="md:mt-5 md:border-t md:pt-5 text-sm text-gray-600">
        <p>
          <strong>Check-in:</strong> A partir de {checkInTime}
        </p>

        <p className="mt-2">
          <strong>Check-out:</strong> Até {checkOutTime}
        </p>

        <p className="mt-2">
          <strong>Disponíveis:</strong> {availableRooms} quartos
        </p>
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
