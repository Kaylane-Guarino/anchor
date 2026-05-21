"use client";

import { Hotel } from "lucide-react";
import { useState } from "react";
import { Suggestion } from "@/types/hotel";
import { useSuggestions } from "@/hooks/useSuggestions";

type DestinationFieldProps = {
  value: string;
  onChange: (value: string) => void;
  variant?: "hero" | "header";
};

export function DestinationField({
  value,
  onChange,
  variant = "hero",
}: DestinationFieldProps) {
  const isHeader = variant === "header";
  const [isOpen, setIsOpen] = useState(false);

  const { data: suggestions, isLoading, isError } = useSuggestions(value);

  function handleSelectSuggestion(suggestion: Suggestion) {
    onChange(suggestion.name);
    setIsOpen(false);
  }

  return (
    <div
      className={
        isHeader
          ? "relative flex min-w-0 items-center gap-2 rounded-l-full bg-white px-4 py-2"
          : "relative flex min-w-0 items-center gap-4 px-5 py-4"
      }
    >
      <Hotel className="shrink-0 text-gray-500" size={isHeader ? 18 : 24} />

      <input
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Para onde você vai?"
        className={
          isHeader
            ? "w-full min-w-0 bg-transparent text-sm font-semibold text-secondary-text outline-none"
            : "w-full min-w-0 bg-transparent font-semibold text-secondary-text outline-none"
        }
      />

      {isOpen && value.trim().length >= 2 && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl bg-white shadow-xl">
          {isLoading && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Buscando destinos...
            </div>
          )}

          {isError && (
            <div className="px-4 py-3 text-sm text-red-600">
              Erro ao buscar sugestões.
            </div>
          )}

          {!isLoading && suggestions?.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Nenhum destino encontrado.
            </div>
          )}

          {suggestions?.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              <span className="font-semibold text-foreground">
                {suggestion.name}
              </span>

              <span className="text-sm text-gray-500">
                {suggestion.type} • {suggestion.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
