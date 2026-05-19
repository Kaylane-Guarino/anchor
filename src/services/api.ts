import axios from "axios";
import { Suggestion, Hotel, Room, Review } from "@/types/hotel";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

export type HotelFilters = {
  destination?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  propertyType?: string;
  sort?: string;
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
};

//Suggestions
export async function getSuggestions(query: string): Promise<Suggestion[]> {
  const { data } = await api.get<Suggestion[]>("/suggestions", {
    params: {
      q: query,
    },
  });

  return data;
}

// Hotels
export async function getHotels(filters?: HotelFilters): Promise<Hotel[]> {
  const { data } = await api.get<Hotel[]>("/hotels", {
    params: {
      destination: filters?.destination,
      pricePerNight_gte: filters?.minPrice,
      pricePerNight_lte: filters?.maxPrice,
      rating_gte: filters?.rating,
      propertyType: filters?.propertyType,
      _sort: filters?.sort,
      _order: filters?.order,
      _page: filters?.page ?? "1",
      _limit: filters?.limit ?? "10",
    },
  });

  return data;
}

export async function getHotelById(hotelId: string): Promise<Hotel> {
  const { data } = await api.get<Hotel>(`/hotels/${hotelId}`);

  return data;
}

// Rooms
export async function getRoomsByHotelId(hotelId: string): Promise<Room[]> {
  const { data } = await api.get<Room[]>("/rooms", {
    params: {
      hotelId,
    },
  });

  return data;
}

// Reviews
export async function getReviewsByHotelId(hotelId: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>("/reviews", {
    params: {
      hotelId,
      _sort: "date",
      _order: "desc",
    },
  });

  return data;
}