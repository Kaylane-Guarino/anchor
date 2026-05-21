"use client";

import { useState } from "react";

type FiltersPopoverProps = {
  initialAmenities: string[];
  initialPropertyType: string;
  initialRating?: string;
  isApplying: boolean;
  onApply: (values: {
    amenity: string[];
    propertyType: string;
    rating: string;
  }) => void;
  onReset: () => void;
};

const ratingOptions = [
  { label: "5 estrelas", value: "5" },
  { label: "4+ estrelas", value: "4" },
  { label: "3+ estrelas", value: "3" },
  { label: "2+ estrelas", value: "2" },
  { label: "0 a 1 estrelas", value: "1" },
];

const amenitiesOptions = [
  { label: "Centro da cidade", value: "city_center" },
  { label: "Café da manhã incluído", value: "breakfast" },
  { label: "Piscina", value: "pool" },
  { label: "Praia", value: "beach_access" },
  { label: "Ar-condicionado", value: "aircon" },
  { label: "Wi-Fi", value: "wifi" },
  { label: "Estacionamento", value: "parking" },
  { label: "Academia", value: "gym" },
  { label: "Spa", value: "spa" },
];

const propertyTypes = [
  { label: "Hotel", value: "hotel" },
  { label: "Pousada", value: "pousada" },
  { label: "Resort", value: "resort" },
];

export function FiltersPopover({
  initialAmenities,
  initialPropertyType,
  initialRating = "",
  isApplying,
  onApply,
  onReset,
}: FiltersPopoverProps) {
  const [rating, setRating] = useState(initialRating);
  const [propertyType, setPropertyType] = useState(initialPropertyType);
  const [amenities, setAmenities] = useState(initialAmenities);

  function toggleAmenity(value: string) {
    setAmenities((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  function toggleRating(value: string) {
    setRating((current) => (current === value ? "" : value));
  }

  function togglePropertyType(value: string) {
    setPropertyType((current) => (current === value ? "" : value));
  }

  function handleApply() {
    onApply({
      amenity: amenities,
      propertyType,
      rating,
    });
  }

  function handleReset() {
    setAmenities([]);
    setPropertyType("");
    setRating("");
    onReset();
  }

  return (
    <div className="w-[720px] rounded-xl bg-white shadow-2xl">
      <div className="space-y-8 p-6">
        <div className="border-b pb-6">
          <h2 className="mb-5 text-xl font-bold text-foreground">
            Avaliação do hotel
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {ratingOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-4 rounded-xl p-2 text-foreground hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={rating === option.value}
                  onChange={() => toggleRating(option.value)}
                  className="h-4 w-4 accent-primary"
                />

                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="border-b pb-6">
          <h2 className="mb-5 text-xl font-bold text-foreground">
            Tipo de propriedade
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {propertyTypes.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-xl p-2 text-foreground hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={propertyType === option.value}
                  onChange={() => togglePropertyType(option.value)}
                  className="h-4 w-4 accent-primary"
                />

                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-5 text-xl font-bold text-foreground">
            Comodidades
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {amenitiesOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-xl p-2 text-foreground hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={amenities.includes(option.value)}
                  onChange={() => toggleAmenity(option.value)}
                  className="h-4 w-4 accent-primary"
                />

                {option.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t bg-gray-50 p-5">
        <button
          type="button"
          onClick={handleReset}
          className="font-semibold text-gray-400 hover:text-gray-600"
        >
          Redefinir
        </button>

        <button
          type="button"
          onClick={handleApply}
          disabled={isApplying}
          className="rounded-xl bg-primary px-8 py-3 font-bold text-white disabled:cursor-wait disabled:opacity-80"
        >
          {isApplying ? "Mostrar resultados ••" : "Mostrar resultados"}
        </button>
      </div>
    </div>
  );
}
