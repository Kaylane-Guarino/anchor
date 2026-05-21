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
        maxPrice: filters.maxPrice,
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