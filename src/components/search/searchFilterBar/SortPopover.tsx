"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

const sortOptions = [
  { label: "Estadias em destaque", sort: "featured", order: "desc" },
  { label: "Avaliação e sugestões", sort: "rating", order: "desc" },
  { label: "Melhores avaliações de hóspedes", sort: "reviewCount", order: "desc" },
  { label: "Preço em ordem crescente", sort: "pricePerNight", order: "asc" },
  { label: "Preço em ordem decrescente", sort: "pricePerNight", order: "desc" },
  { label: "Distância do centro", sort: "distance", order: "asc" },
] as const;

type SortPopoverProps = {
  initialSort: string;
  initialOrder?: "asc" | "desc";
  onApply: (sort: string, order: "asc" | "desc") => void;
};

export function SortPopover({
  initialSort,
  initialOrder,
  onApply,
}: SortPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(
    `${initialSort}:${initialOrder ?? ""}`
  );

  const selectedOption =
    sortOptions.find((option) => `${option.sort}:${option.order}` === selected) ??
    sortOptions[0];

  function applyAndClose() {
    onApply(selectedOption.sort, selectedOption.order);
  }

  useClickOutside(ref, applyAndClose);

  return (
    <div
      ref={ref}
      className="absolute left-0 z-50 w-[280px] rounded-xl bg-white shadow-2xl"
    >
      <div className="space-y-4 p-6">
        {sortOptions.map((option) => {
          const value = `${option.sort}:${option.order}`;

          return (
            <label
              key={`${option.sort}-${option.order}-${option.label}`}
              className="flex cursor-pointer items-center gap-4 text-foreground"
            >
              <input
                type="radio"
                checked={selected === value}
                onChange={() => setSelected(value)}
                className="h-6 w-6 accent-primary"
              />

              {option.label}
            </label>
          );
        })}
      </div>

      <div className="flex justify-end border-t p-2">
        <button
          type="button"
          onClick={applyAndClose}
          className="rounded-xl bg-primary px-8 py-3 font-bold text-white"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}