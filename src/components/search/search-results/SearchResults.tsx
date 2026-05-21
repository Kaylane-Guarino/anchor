"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { HotelCard } from "@/components/hotel/HotelCard";
import { getHotels } from "@/services/api";
import { SearchResultsSkeleton } from "./SearchResultsSkeleton";
import { SearchResultsError } from "./SearchResultsError";
import { SearchResultsEmpty } from "./SearchResultsEmpty";
import { SearchPagination } from "./SearchPagination";

export function SearchResults() {
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const adults = searchParams.get("adults") ?? "2";
  const children = searchParams.get("children") ?? "0";
  const rooms = searchParams.get("rooms") ?? "1";
  const page = searchParams.get("page") ?? "1";

  const maxPrice = searchParams.get("maxPrice") ?? "";
  const rating = searchParams.get("rating") ?? "";
  const propertyType = searchParams.get("propertyType") ?? "";
  const amenity = searchParams.getAll("amenity");

  const sort = searchParams.get("sort") ?? "";
  const order = searchParams.get("order") as "asc" | "desc" | null;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "hotels",
      {
        destination,
        checkIn,
        checkOut,
        adults,
        children,
        rooms,
        maxPrice,
        rating,
        propertyType,
        amenity,
        sort,
        page,
        order,
      },
    ],

    queryFn: () =>
      getHotels({
        destination,
        maxPrice,
        rating,
        propertyType,
        amenity,
        sort,
        page,
        order: order ?? undefined,
      }),
  });

  const hotels = data?.hotels ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 10);

  if (isLoading) {
    return <SearchResultsSkeleton />;
  }

  if (isError) {
    return <SearchResultsError onRetry={() => refetch()} />;
  }

  if (!hotels?.length) {
    return <SearchResultsEmpty />;
  }

  return (
    <section className="grid gap-5">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">
              {hotels.length} hospedagem(ns) encontrada(s)
            </p>

            <p className="text-sm text-gray-500">
              {destination || "Todos os destinos"}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            {adults} hóspedes • {rooms} quarto(s)
          </div>
        </div>
      </div>

      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}

      {totalPages > 1 && (
        <SearchPagination currentPage={Number(page)} totalPages={totalPages} />
      )}
    </section>
  );
}
