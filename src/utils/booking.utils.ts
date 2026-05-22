export const BOOKING_TAXES = 89;
export const BOOKING_FEES = 56;

export function calculateNights(checkIn?: string, checkOut?: string) {
  if (!checkIn || !checkOut) return 1;

  const startDate = new Date(`${checkIn}T00:00:00`);
  const endDate = new Date(`${checkOut}T00:00:00`);

  const diffInMs = endDate.getTime() - startDate.getTime();
  const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return Math.max(1, nights);
}

export function calculateBookingTotal({
  pricePerNight,
  nights,
}: {
  pricePerNight: number;
  nights: number;
}) {
  const roomsTotal = pricePerNight * nights;
  const total = roomsTotal + BOOKING_TAXES + BOOKING_FEES;

  return {
    roomsTotal,
    total,
    taxes: BOOKING_TAXES,
    fees: BOOKING_FEES,
  };
}

export function generateBookingId() {
  return crypto.randomUUID().slice(0, 8).toUpperCase();
}

export function maskCardNumber(value?: string) {
  const numbers = value?.replace(/\D/g, "") ?? "";
  const lastFour = numbers.slice(-4);

  if (!lastFour) return "**** **** **** ----";

  return `**** **** **** ${lastFour}`;
}