import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

type BuildSearchParamsParams = {
  destination: string;
  dateRange?: DateRange;
  adults: number;
  children: number;
  rooms: number;
};

export function formatApiDate(date?: Date) {
  if (!date) return "";

  return format(date, "yyyy-MM-dd");
}

export function formatDisplayDate(date?: Date) {
  if (!date) return "";

  return format(date, "dd MMM", {
    locale: ptBR,
  });
}

export function buildSearchParams({
  destination,
  dateRange,
  adults,
  children,
  rooms,
}: BuildSearchParamsParams) {
  const params = new URLSearchParams();

  if (destination) params.set("destination", destination);
  if (dateRange?.from) params.set("checkIn", formatApiDate(dateRange.from));
  if (dateRange?.to) params.set("checkOut", formatApiDate(dateRange.to));

  params.set("adults", String(adults));
  params.set("children", String(children));
  params.set("rooms", String(rooms));

  return params;
}