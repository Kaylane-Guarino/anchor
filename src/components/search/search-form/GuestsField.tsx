import { User } from "lucide-react";
import { Counter } from "./Counter";

type GuestsFieldProps = {
  adults: number;
  children: number;
  rooms: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onRoomsChange: (value: number) => void;
  variant?: "hero" | "header";
};

export function GuestsField({
  adults,
  children,
  rooms,
  isOpen,
  onToggle,
  onClose,
  onAdultsChange,
  onChildrenChange,
  onRoomsChange,
  variant = "hero",
}: GuestsFieldProps) {
  const isHeader = variant === "header";

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className={
          isHeader
            ? "flex min-w-0 items-center gap-2 bg-white px-3 py-2 text-left text-sm font-semibold"
            : "flex min-w-0 items-center gap-4 bg-white px-5 py-4 text-left font-semibold"
        }
      >
        <User className="shrink-0 text-gray-500" size={isHeader ? 18 : 24} />

        <span
          className={
            isHeader
              ? "block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-gray-500"
              : "block w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-gray-500"
          }
        >
          {adults} adultos · {children} criança · {rooms} quarto
        </span>
      </button>

      {isOpen && (
        <div
          className={
            isHeader
              ? "absolute right-0 z-50 mt-10 w-[360px] rounded-xl bg-white p-6 shadow-xl"
              : "absolute right-32 z-50 mt-17 w-[430px] rounded-xl bg-white p-8 shadow-xl"
          }
        >
          <Counter
            label="Adultos"
            value={adults}
            min={1}
            onDecrease={() => onAdultsChange(Math.max(1, adults - 1))}
            onIncrease={() => onAdultsChange(adults + 1)}
          />

          <Counter
            label="Crianças"
            value={children}
            min={0}
            onDecrease={() => onChildrenChange(Math.max(0, children - 1))}
            onIncrease={() => onChildrenChange(children + 1)}
          />

          <Counter
            label="Quartos"
            value={rooms}
            min={1}
            onDecrease={() => onRoomsChange(Math.max(1, rooms - 1))}
            onIncrease={() => onRoomsChange(rooms + 1)}
          />

          <div className="mt-6 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-primary px-6 py-3 font-semibold text-primary hover:bg-blue-50"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
