"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, differenceInCalendarDays } from "date-fns";

import { DatePickerField } from "./DatePickerField";
import { DestinationField } from "./DestinationField";
import { GuestsField } from "./GuestsField";
import { buildSearchParams } from "@/utils/search-form.utils";
import { useBookingStore } from "@/stores/booking.store";

type SearchFormProps = {
  variant?: "hero" | "header";
};

function parseDate(date?: string | null) {
  if (!date) return undefined;

  return new Date(`${date}T00:00:00`);
}

export function SearchForm({ variant = "hero" }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") ?? "",
  );

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!checkIn && !checkOut) return undefined;

    return {
      from: parseDate(checkIn),
      to: parseDate(checkOut),
    };
  });

  const [adults, setAdults] = useState(Number(searchParams.get("adults") ?? 2));
  const [children, setChildren] = useState(
    Number(searchParams.get("children") ?? 0),
  );
  const [rooms, setRooms] = useState(Number(searchParams.get("rooms") ?? 1));

  const [openedDropdown, setOpenedDropdown] = useState<
    "calendar" | "guests" | null
  >(null);

  const isHeader = variant === "header";

  const setBookingDates = useBookingStore((state) => state.setBookingDates);

  function handleDateRangeChange(range?: DateRange) {
    if (!range?.from) {
      setDateRange(undefined);
      return;
    }

    if (!range.to) {
      setDateRange(range);
      return;
    }

    const nights = differenceInCalendarDays(range.to, range.from);

    if (nights <= 0) {
      setDateRange({
        from: range.from,
        to: addDays(range.from, 1),
      });

      return;
    }

    if (nights > 30) {
      setDateRange({
        from: range.from,
        to: addDays(range.from, 30),
      });

      return;
    }

    setDateRange(range);
  }

  const maxCheckoutDate = dateRange?.from
    ? addDays(dateRange.from, 30)
    : undefined;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = buildSearchParams({
      destination,
      dateRange,
      adults,
      children,
      rooms,
    });

    const checkIn = params.get("checkIn") ?? "";
    const checkOut = params.get("checkOut") ?? "";

    setBookingDates({
      checkIn,
      checkOut,
    });

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div
      className={
        isHeader
          ? "relative w-full max-w-3xl"
          : "relative mx-auto w-full max-w-5xl"
      }
    >
      <form
        onSubmit={handleSubmit}
        className={
          isHeader
            ? "hidden w-full rounded-full border-2  text-primary-text shadow-md lg:grid lg:grid-cols-[minmax(0,1fr)_190px_220px_120px]"
            : "grid w-full grid-cols-1 overflow-visible rounded-2xl border-4 bg-white text-primary-text shadow-lg md:grid-cols-[minmax(0,1.3fr)_260px_280px_160px]"
        }
      >
        <DestinationField
          value={destination}
          onChange={setDestination}
          variant={variant}
        />

        <DatePickerField
          variant={variant}
          dateRange={dateRange}
          isOpen={openedDropdown === "calendar"}
          maxCheckoutDate={maxCheckoutDate}
          onToggle={() =>
            setOpenedDropdown(openedDropdown === "calendar" ? null : "calendar")
          }
          onClose={() => setOpenedDropdown(null)}
          onChange={handleDateRangeChange}
        />

        <GuestsField
          variant={variant}
          adults={adults}
          kids={children}
          rooms={rooms}
          isOpen={openedDropdown === "guests"}
          onToggle={() =>
            setOpenedDropdown(openedDropdown === "guests" ? null : "guests")
          }
          onClose={() => setOpenedDropdown(null)}
          onAdultsChange={(value) => setAdults(value)}
          onChildrenChange={(value) => setChildren(value)}
          onRoomsChange={(value) => setRooms(value)}
        />

        <button
          type="submit"
          className={
            isHeader
              ? "rounded-full bg-primary px-4 py-2 text-sm font-bold text-white cursor-pointer"
              : "w-full cursor-pointer rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white md:rounded-lg md:text-xl"
          }
        >
          {isHeader ? "Buscar" : "Pesquisar"}
        </button>
      </form>
    </div>
  );
}
