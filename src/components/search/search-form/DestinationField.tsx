"use client";

import { Hotel, MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Suggestion } from "@/types/hotel";
import { useSuggestions } from "@/hooks/useSuggestions";
import { getSuggestionTypeLabel } from "@/utils/hotel.utils";
import { cn } from "@/lib/utils";

type DestinationFieldProps = {
  value: string;
  onChange: (value: string) => void;
  variant?: "hero" | "header";
};

const RECENT_DESTINATIONS_KEY = "stayflow:recent-destinations";

function getRecentDestinations() {
  if (typeof window === "undefined") return [];

  const storedDestinations = localStorage.getItem(RECENT_DESTINATIONS_KEY);

  if (!storedDestinations) return [];

  try {
    return JSON.parse(storedDestinations) as string[];
  } catch {
    return [];
  }
}

function saveRecentDestination(destination: string) {
  if (typeof window === "undefined") return;

  const normalizedDestination = destination.trim();

  if (!normalizedDestination) return;

  const currentDestinations = getRecentDestinations();

  const nextDestinations = [
    normalizedDestination,
    ...currentDestinations.filter((item) => item !== normalizedDestination),
  ].slice(0, 5);

  localStorage.setItem(
    RECENT_DESTINATIONS_KEY,
    JSON.stringify(nextDestinations),
  );
}

export function DestinationField({
  value,
  onChange,
  variant = "hero",
}: DestinationFieldProps) {
  const isHeader = variant === "header";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentDestinations, setRecentDestinations] = useState<string[]>([]);

  const shouldShowSuggestions = value.trim().length >= 2;

  const { data: suggestions, isLoading, isError } = useSuggestions(value);

  const visibleItems = useMemo(() => {
    if (shouldShowSuggestions) {
      return suggestions ?? [];
    }

    return recentDestinations;
  }, [shouldShowSuggestions, suggestions, recentDestinations]);

  useEffect(() => {
    setRecentDestinations(getRecentDestinations());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (!wrapperRef.current?.contains(target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleSelectSuggestion(suggestion: Suggestion) {
    onChange(suggestion.name);
    saveRecentDestination(suggestion.name);
    setRecentDestinations(getRecentDestinations());

    setSelectedIndex(-1);
    setIsOpen(false);
  }

  function handleSelectRecentDestination(destination: string) {
    onChange(destination);
    saveRecentDestination(destination);
    setRecentDestinations(getRecentDestinations());

    setSelectedIndex(-1);
    setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!visibleItems.length) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsOpen(true);

        setSelectedIndex((current) =>
          current < visibleItems.length - 1 ? current + 1 : 0,
        );

        break;

      case "ArrowUp":
        event.preventDefault();

        setSelectedIndex((current) =>
          current > 0 ? current - 1 : visibleItems.length - 1,
        );

        break;

      case "Enter":
        event.preventDefault();

        if (selectedIndex < 0) return;

        if (shouldShowSuggestions) {
          handleSelectSuggestion(visibleItems[selectedIndex] as Suggestion);
          return;
        }

        handleSelectRecentDestination(visibleItems[selectedIndex] as string);

        break;

      case "Escape":
        setSelectedIndex(-1);
        setIsOpen(false);

        break;
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative flex min-w-0 items-center gap-2 rounded-l-full",
        isHeader ? "bg-white px-4 py-2" : "bg-background px-5 py-4",
      )}
    >
      <Hotel className="shrink-0 text-gray-500" size={isHeader ? 18 : 24} />

      <input
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setSelectedIndex(-1);
          setIsOpen(true);
        }}
        onFocus={() => {
          setRecentDestinations(getRecentDestinations());
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Para onde você vai?"
        className={cn(
          "w-full min-w-0 bg-transparent font-semibold text-secondary-text outline-none",
          isHeader && "text-sm outline-none",
        )}
      />

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-xl bg-white text-secondary-text shadow-xl">
          {!shouldShowSuggestions && recentDestinations.length > 0 && (
            <div className="border-b p-4 text-xs font-bold uppercase text-gray-400">
              Pesquisados recentemente
            </div>
          )}

          {!shouldShowSuggestions && recentDestinations.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Nenhum destino recente ainda.
            </div>
          )}

          {!shouldShowSuggestions &&
            recentDestinations.map((destination, index) => (
              <button
                key={destination}
                type="button"
                onClick={() => handleSelectRecentDestination(destination)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition",
                  selectedIndex === index ? "bg-gray-100" : "hover:bg-gray-100",
                )}
              >
                <MapPin size={16} className="text-primary" />

                <span className="font-semibold">{destination}</span>
              </button>
            ))}

          {shouldShowSuggestions && isLoading && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Buscando destinos...
            </div>
          )}

          {shouldShowSuggestions && isError && (
            <div className="px-4 py-3 text-sm text-red-600">
              Erro ao buscar sugestões.
            </div>
          )}

          {shouldShowSuggestions && !isLoading && suggestions?.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Nenhum destino encontrado.
            </div>
          )}

          {shouldShowSuggestions &&
            suggestions?.map((suggestion, index) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className={cn(
                  "flex w-full cursor-pointer flex-col rounded-xl px-4 py-3 text-left transition",
                  selectedIndex === index ? "bg-gray-100" : "hover:bg-gray-100"
                )}
              >
                <span className="font-semibold">{suggestion.name}</span>

                <span className="text-sm">
                  {getSuggestionTypeLabel(suggestion.type)} •{" "}
                  {suggestion.country}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
