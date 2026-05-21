import { User } from "lucide-react";
import { useEffect, useRef } from "react";

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
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (!wrapperRef.current?.contains(target)) {
        onClose();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={wrapperRef}
      className="relative min-w-0"
    >
      <button
        type="button"
        onClick={onToggle}
        className={
          isHeader
            ? "flex w-full min-w-0 items-center gap-2 bg-white px-3 py-2 text-left text-sm font-semibold cursor-pointer"
            : "flex w-full min-w-0 items-center gap-3 border-t bg-white px-5 py-4 text-left font-semibold md:border-l md:border-t-0 cursor-pointer"
        }
      >
        <User
          className="shrink-0 text-gray-500"
          size={isHeader ? 18 : 22}
        />

        <span className="block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">
          {adults} adultos · {children} criança · {rooms} quarto
        </span>
      </button>

      {isOpen && (
        <div
          className={
            isHeader
              ? "absolute right-0 z-50 mt-3 w-[min(92vw,360px)] rounded-xl bg-white p-5 shadow-xl"
              : "absolute left-1/2 z-50 mt-0 w-[min(92vw,430px)] -translate-x-1/2 rounded-xl bg-white p-5 shadow-xl md:left-auto md:right-0 md:mt-3 md:translate-x-0 md:p-8"
          }
        >
          <Counter
            label="Adultos"
            value={adults}
            min={1}
            onDecrease={() =>
              onAdultsChange(
                Math.max(1, adults - 1),
              )
            }
            onIncrease={() =>
              onAdultsChange(adults + 1)
            }
          />

          <Counter
            label="Crianças"
            value={children}
            min={0}
            onDecrease={() =>
              onChildrenChange(
                Math.max(
                  0,
                  children - 1,
                ),
              )
            }
            onIncrease={() =>
              onChildrenChange(
                children + 1,
              )
            }
          />

          <Counter
            label="Quartos"
            value={rooms}
            min={1}
            onDecrease={() =>
              onRoomsChange(
                Math.max(1, rooms - 1),
              )
            }
            onIncrease={() =>
              onRoomsChange(rooms + 1)
            }
          />

          <div className="mt-6 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer rounded-lg border border-primary px-6 py-3 font-semibold text-primary hover:bg-blue-50"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}