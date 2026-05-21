"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

const FiltersOptions = [
  { label: "Tipo de propriedade", sort: "propertyType", order: "desc" },
  { label: "Avaliação minima", sort: "rating", order: "desc" },
  { label: "Comodidades", sort: "amenities", order: "desc" },
] as const;

type FiltersPopoverProps = {
  initialAmenities: string[];
  initialPropertyType: string;
  onApply: (values: {
    amenity: string[];
    propertyType: string;
  }) => void;
};

export function FiltersPopover({
  initialAmenities,
  initialPropertyType,
  onApply,
}: FiltersPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState(
    `${initialAmenities}:${initialPropertyType ?? ""}`
  );

  const selectedOption =
    FiltersOptions.find((option) => `${option.sort}:${option.order}` === selected) ??
    FiltersOptions[0];

  function applyAndClose() {
    onApply({
      amenity: selectedOption.sort === "amenities" ? [selectedOption.order] : [],
      propertyType: selectedOption.sort === "propertyType" ? selectedOption.order : "",
    });
  }

  useClickOutside(ref, applyAndClose);

  return (
    <div
      ref={ref}
      className="absolute left-0 z-50 w-[380px] rounded-xl bg-white shadow-2xl"
    >
      <div className="space-y-4 p-6">
        {FiltersOptions.map((option) => {
          const value = `${option.sort}:${option.order}`;

          return (
            <label
              key={`${option.sort}-${option.order}-${option.label}`}
              className="flex cursor-pointer items-center gap-4 text-foreground"
            >
              <input
                type="checkbox"
                checked={selected === value}
                onChange={() => setSelected(value)}
                className="h-4 w-4 accent-primary"
              />

              {option.label}
            </label>
          );
        })}
      </div>

      <div className="flex justify-end border-t bg-gray-50 p-5">
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