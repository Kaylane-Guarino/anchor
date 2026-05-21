"use client";

import { useSearchParams } from "next/navigation";

type SortOrder = "asc" | "desc";

export type HotelSearchFilters = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  rooms: string;
  maxPrice: string;
  rating: string;
  propertyType: string;
  amenity: string[];
  sort: string;
  page: string;
  order?: SortOrder;
};

function parseSortOrder(value: string | null): SortOrder | undefined {
  if (value === "asc" || value === "desc") {
    return value;
  }

  return undefined;
}

export function useHotelSearchFilters(): HotelSearchFilters {
  const searchParams = useSearchParams();

  return {
    destination: searchParams.get("destination") ?? "",
    checkIn: searchParams.get("checkIn") ?? "",
    checkOut: searchParams.get("checkOut") ?? "",
    adults: searchParams.get("adults") ?? "2",
    children: searchParams.get("children") ?? "0",
    rooms: searchParams.get("rooms") ?? "1",
    maxPrice: searchParams.get("maxPrice") ?? "",
    rating: searchParams.get("rating") ?? "",
    propertyType: searchParams.get("propertyType") ?? "",
    amenity: searchParams.getAll("amenity"),
    sort: searchParams.get("sort") ?? "",
    page: searchParams.get("page") ?? "1",
    order: parseSortOrder(searchParams.get("order")),
  };
}