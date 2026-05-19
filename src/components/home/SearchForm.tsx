"use client";

import "react-day-picker/dist/style.css";

import { CalendarDays, Hotel, Minus, Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function SearchForm() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  function formatDate(date?: Date) {
    if (!date) return "";
    return format(date, "yyyy-MM-dd");
  }

  function formatDisplayDate(date?: Date) {
    if (!date) return "";

    return format(date, "dd MMM", {
      locale: ptBR,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (destination) params.set("destination", destination);
    if (dateRange?.from) params.set("checkIn", formatDate(dateRange.from));
    if (dateRange?.to) params.set("checkOut", formatDate(dateRange.to));

    params.set("adults", String(adults));
    params.set("children", String(children));
    params.set("rooms", String(rooms));

    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="grid rounded-lg border-4 shadow-lg md:grid-cols-[1.3fr_1fr_1fr_160px] text-primary-text"
      >
        <div className="flex items-center gap-4 px-5 py-4 bg-background">
          <Hotel className="text-gray-500" size={24} />

          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Para onde você vai?"
            className="w-full font-semibold outline-none text-secondary-text"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setIsCalendarOpen((state) => !state);
            setIsGuestsOpen(false);
          }}
          className="flex items-center gap-4 bg-white px-5 py-4 text-left font-semibold text-gray-500"
        >
          <CalendarDays className="text-gray-500" size={24} />

          <span className="block w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
            {dateRange?.from && dateRange?.to
              ? `${formatDisplayDate(dateRange.from)} - ${formatDisplayDate(dateRange.to)}`
              : "Selecione as datas"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setIsGuestsOpen((state) => !state);
            setIsCalendarOpen(false);
          }}
          className="flex items-center gap-4 bg-white px-5 py-4 text-left font-semibold"
        >
          <User className="text-gray-500" size={24} />

          <span className="text-gray-500">
            {adults} adultos · {children} criança · {rooms} quarto
          </span>
        </button>

        <button
          type="submit"
          className="bg-primary px-6 py-4 text-xl font-bold text-white hover:bg-primary-dark"
        >
          Pesquisar
        </button>
      </form>

      {isCalendarOpen && (
        <div className="absolute left-1/2 z-50 mt-2 -translate-x-1/2 rounded-xl bg-white p-4 shadow-xl">
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            locale={ptBR}
            disabled={{ before: new Date() }}
            className="text-sm"
            classNames={{
              months: "flex gap-8",
              month: "w-[250px]",
              month_caption:
                "mb-3 flex items-center justify-center font-bold text-foreground",

              nav: "absolute right-0 flex gap-2",
              button_previous:
                "flex h-8 w-8 items-center justify-center rounded-md text-primary",
              button_next:
                "flex h-8 w-8 items-center justify-center rounded-md text-primary",

              weekdays: "mb-2 flex",
              weekday: "w-9 text-center text-xs font-medium text-gray-400",
              week: "flex",

              day: "h-9 w-9 p-0 text-center text-sm text-foreground",
              day_button: "h-9 w-9 rounded-none",

              selected: "bg-primary text-white rounded-full",

              range_start:
                "bg-transparent text-white [&>button]:bg-primary [&>button]:text-white [&>button]:rounded-full",

              range_end:
                "bg-transparent text-white [&>button]:bg-primary [&>button]:text-white [&>button]:rounded-full",

              range_middle:
                "bg-gray-100 text-foreground [&>button]:bg-gray-100 [&>button]:text-foreground [&>button]:rounded-none",

              today: "font-bold text-primary",
              outside: "text-gray-300",
              disabled: "text-gray-300",
            }}
          />

          <div className="mt-1 flex justify-end border-t">
            <button
              type="button"
              onClick={() => setIsCalendarOpen(false)}
              className="rounded-lg border border-primary px-5 py-2 font-semibold text-primary hover:bg-blue-50"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {isGuestsOpen && (
        <div className="absolute right-32 z-50 mt-2 w-[430px] rounded-xl bg-white p-8 shadow-xl">
          <Counter
            label="Adultos"
            value={adults}
            min={1}
            onDecrease={() => setAdults((value) => Math.max(1, value - 1))}
            onIncrease={() => setAdults((value) => value + 1)}
          />

          <Counter
            label="Crianças"
            value={children}
            min={0}
            onDecrease={() => setChildren((value) => Math.max(0, value - 1))}
            onIncrease={() => setChildren((value) => value + 1)}
          />

          <Counter
            label="Quartos"
            value={rooms}
            min={1}
            onDecrease={() => setRooms((value) => Math.max(1, value - 1))}
            onIncrease={() => setRooms((value) => value + 1)}
          />

          <div className="mt-6 border-t pt-6">
            <button
              type="button"
              onClick={() => setIsGuestsOpen(false)}
              className="w-full rounded-lg border border-primary px-6 py-3 font-semibold text-primary hover:bg-blue-50"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type CounterProps = {
  label: string;
  value: number;
  min: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

function Counter({ label, value, min, onDecrease, onIncrease }: CounterProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="font-semibold text-secondary-text">{label}</span>

      <div className="grid w-40 grid-cols-3 items-center rounded-lg border">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          className="flex h-12 items-center justify-center text-gray-300 disabled:cursor-not-allowed"
        >
          <Minus size={18} />
        </button>

        <span className="text-center font-semibold text-secondary-text">{value}</span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-12 items-center justify-center text-primary"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
