export type Suggestion = {
  id: number;
  name: string;
  type: string;
  country: string;
};

export type Hotel = {
  id: number;
  name: string;
  slug: string;
  destination: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  thumbnail: string;
  images: string[];
  amenities: string[];
  propertyType: "hotel" | "pousada" | "resort";
  availableRooms: number;
  address: string;
  latitude: number;
  longitude: number;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  featured?: boolean;
};

export type Room = {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  size: number;
  maxGuests: number;
  beds: {
    type: string;
    quantity: number;
  }[];
  pricePerNight: number;
  amenities: string[];
  images: string[];
  available: number;
};

export type Review = {
  id: number;
  hotelId: number;
  guestName: string;
  guestAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
};