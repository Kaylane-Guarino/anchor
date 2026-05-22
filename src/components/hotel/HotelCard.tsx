"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

import { Hotel } from "@/types/hotel";
import { formatBRL } from "@/utils/formatters.utils";
import { getAmenityLabel, getHotelDistances } from "@/utils/hotel.utils";

type HotelCardProps = {
  hotel: Hotel;
};

export function HotelCard({ hotel }: HotelCardProps) {
  const router = useRouter();

  const { centerDistance, beachDistance } = getHotelDistances(
    hotel.destination,
  );

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md" >
      <div className="md:flex">
        <div className="relative h-[250px] md:h-auto md:w-[320px]">
          <Image
            src={hotel.thumbnail}
            alt={hotel.name}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {hotel.name}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                  <span>{hotel.destination}</span>

                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {centerDistance}
                  </span>

                  {beachDistance && (
                    <>
                      <span>•</span>
                      <span>{beachDistance}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-primary px-3 py-2 text-center text-white">
                <span className="block text-lg font-bold">{hotel.rating}</span>

                <span className="text-xs">Excelente</span>
              </div>
            </div>

            <p className="line-clamp-3 text-gray-600">{hotel.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 5).map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  {getAmenityLabel(amenity)}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-sm text-gray-500">A partir de</p>

              <p className="text-3xl font-bold text-primary">
                {formatBRL(hotel.pricePerNight)}
              </p>

              <p className="text-sm text-gray-500">por noite</p>
            </div>

            <Link
              href={`/hotel/${hotel.id}`}
              onMouseEnter={() => router.prefetch(`/hotel/${hotel.id}`)}
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
