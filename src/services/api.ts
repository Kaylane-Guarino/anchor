import axios from "axios";

import {
  Suggestion,
  Hotel,
  Room,
  Review,
} from "@/types/hotel";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

export type HotelFilters = {
  destination?: string;
  pricePerNight_gte?: string;
  pricePerNight_lte?: string;
  rating?: string;
  propertyType?: string;
  amenity?: string[];
  sort?: string;
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
};

export type PaginatedHotelsResponse = {
  hotels: Hotel[];
  total: number;
};

function handleApiError(
  error: unknown,
  context: string,
) {
  if (axios.isAxiosError(error)) {
    console.error(`[${context}]`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return;
  }

  console.error(`[${context}]`, error);
}

// Suggestions

export async function getSuggestions(
  query: string,
): Promise<Suggestion[]> {
  try {
    const { data } = await api.get<Suggestion[]>(
      "/suggestions",
      {
        params: {
          q: query,
        },
      },
    );

    return data;
  } catch (error) {
    handleApiError(
      error,
      "GET_SUGGESTIONS_ERROR",
    );

    return [];
  }
}

// Hotels

export async function getHotels(
  filters?: HotelFilters,
): Promise<PaginatedHotelsResponse> {
  const params: Record<
    string,
    string | number
  > = {
    _page: filters?.page ?? "1",
    _limit: filters?.limit ?? "10",
  };

  if (filters?.destination) {
    params.destination =
      filters.destination;
  }

  if (filters?.pricePerNight_lte) {
    params.pricePerNight_lte =
      filters.pricePerNight_lte;
  }
  if (filters?.pricePerNight_gte) {
    params.pricePerNight_gte =
      filters.pricePerNight_gte;
  }

  if (filters?.rating) {
    params.rating_gte =
      filters.rating;
  }

  if (filters?.propertyType) {
    params.propertyType =
      filters.propertyType;
  }

  if (
    filters?.amenity &&
    filters.amenity.length > 0
  ) {
    params.amenities_like =
      filters.amenity.join(",");
  }

  if (filters?.sort) {
    params._sort =
      filters.sort;
  }

  if (filters?.order) {
    params._order =
      filters.order;
  }

  try {
    const response =
      await api.get<Hotel[]>(
        "/hotels",
        {
          params,
        },
      );

    return {
      hotels:
        response.data,
      total: Number(
        response.headers[
          "x-total-count"
        ] ??
          response.data.length,
      ),
    };
  } catch (error) {
    handleApiError(
      error,
      "GET_HOTELS_ERROR",
    );

    return {
      hotels: [],
      total: 0,
    };
  }
}

export async function getHotelById(
  hotelId: string,
): Promise<Hotel | null> {
  try {
    const { data } =
      await api.get<Hotel>(
        `/hotels/${hotelId}`,
      );

    return data;
  } catch (error) {
    handleApiError(
      error,
      "GET_HOTEL_BY_ID_ERROR",
    );

    return null;
  }
}

// Rooms

export async function getRoomsByHotelId(
  hotelId: string,
): Promise<Room[]> {
  try {
    const { data } =
      await api.get<Room[]>(
        "/rooms",
        {
          params: {
            hotelId,
          },
        },
      );

    return data;
  } catch (error) {
    handleApiError(
      error,
      "GET_ROOMS_ERROR",
    );

    return [];
  }
}

// Reviews

export async function getReviewsByHotelId(
  hotelId: string,
): Promise<Review[]> {
  try {
    const { data } =
      await api.get<Review[]>(
        "/reviews",
        {
          params: {
            hotelId,
            _sort: "date",
            _order: "desc",
          },
        },
      );

    return data;
  } catch (error) {
    handleApiError(
      error,
      "GET_REVIEWS_ERROR",
    );

    return [];
  }
}