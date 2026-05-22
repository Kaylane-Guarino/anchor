import { useQuery } from "@tanstack/react-query";

import { getHotels } from "@/services/api";
import { useHotelSearchFilters } from "./useHotelSearchFilters";


export function useHotels() {
  const filters = useHotelSearchFilters();

  const query = useQuery({
    queryKey: ["hotels", filters],
    queryFn: () =>
      getHotels({
        destination: filters.destination,
        pricePerNight_lte: filters.pricePerNight_lte,
        pricePerNight_gte: filters.pricePerNight_gte,
        rating: filters.rating,
        propertyType: filters.propertyType,
        amenity: filters.amenity,
        sort: filters.sort,
        order: filters.order,
      }),
  });

  return {
    ...query,
    filters,
  };
}