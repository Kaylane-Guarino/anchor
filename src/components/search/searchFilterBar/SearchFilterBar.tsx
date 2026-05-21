"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PricePopover } from "./PricePopover";
import { SortPopover } from "./SortPopover";
import { FiltersPopover } from "./FiltersPopover";
import { updateSearchParams } from "@/utils/search-url.utils";

const quickAmenities = [
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

type FilterValues = {
  maxPrice?: string;
  minPrice?: string;
  sort?: string;
  order?: "asc" | "desc";
  amenity?: string[];
  propertyType?: string;
};

function getSortOrder(value: string | null): "asc" | "desc" | undefined {
  if (value === "asc" || value === "desc") {
    return value;
  }

  return undefined;
}

export function SearchFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const selectedAmenities = searchParams.getAll("amenity");
  const activeFiltersCount = selectedAmenities.length;

  function applyFilters(values: FilterValues) {
    const params = updateSearchParams(searchParams, values);

    router.push(`/search?${params.toString()}`);
  }

  function toggleAmenity(amenity: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll("amenity");

    params.delete("amenity");

    const next = current.includes(amenity)
      ? current.filter((item) => item !== amenity)
      : [...current, amenity];

    next.forEach((item) => params.append("amenity", item));

    router.push(`/search?${params.toString()}`);
  }

  function handleScrollState() {
    const element = scrollRef.current;

    if (!element) return;

    setShowLeftArrow(element.scrollLeft > 0);

    setShowRightArrow(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    );
  }

  function scrollAmenities(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });

    setTimeout(handleScrollState, 300);
  }

  useEffect(() => {
    handleScrollState();

    const element = scrollRef.current;

    if (!element) return;

    element.addEventListener("scroll", handleScrollState);
    window.addEventListener("resize", handleScrollState);

    return () => {
      element.removeEventListener("scroll", handleScrollState);
      window.removeEventListener("resize", handleScrollState);
    };
  }, []);

  return (
    <div>
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-4">
        <div className="flex shrink-0 items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-900 px-4 py-2 font-semibold text-foreground">
                <SlidersHorizontal size={16} />
                Filtros

                {activeFiltersCount > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-auto border-none p-0 shadow-none">
              <FiltersPopover
                initialAmenities={selectedAmenities}
                initialPropertyType={searchParams.get("propertyType") ?? ""}
                onApply={(values) =>
                  applyFilters({
                    amenity: values.amenity,
                    propertyType: values.propertyType,
                  })
                }
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-semibold text-foreground data-[state=open]:border-primary">
                Ordenar por
                <ChevronDown size={18} />
              </button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-auto border-none p-0 shadow-none">
              <SortPopover
                initialSort={searchParams.get("sort") ?? ""}
                initialOrder={getSortOrder(searchParams.get("order"))}
                onApply={(sort, order) =>
                  applyFilters({
                    sort,
                    order,
                  })
                }
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-semibold text-foreground data-[state=open]:border-primary">
                Preço
                <ChevronDown size={18} />
              </button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-auto border-none p-0 shadow-none">
              <PricePopover
                initialMinPrice={searchParams.get("minPrice") ?? ""}
                initialMaxPrice={searchParams.get("maxPrice") ?? ""}
                onApply={(prices) =>
                  applyFilters({
                    minPrice: prices.minPrice,
                    maxPrice: prices.maxPrice,
                  })
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          {showLeftArrow && (
            <>
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />

              <button
                type="button"
                onClick={() => scrollAmenities("left")}
                className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-white shadow"
              >
                <ChevronLeft size={20} className="text-secondary-text" />
              </button>
            </>
          )}

          <div ref={scrollRef} className="flex gap-2 overflow-hidden scroll-smooth">
            {quickAmenities.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity.value);

              return (
                <button
                  key={amenity.value}
                  type="button"
                  onClick={() => toggleAmenity(amenity.value)}
                  className={
                    isSelected
                      ? "flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-primary bg-sky-200 px-4 py-2 font-semibold text-foreground"
                      : "flex shrink-0 cursor-pointer items-center rounded-full border bg-white px-4 py-2 font-semibold text-foreground"
                  }
                >
                  {amenity.label}
                  {isSelected && <X size={16} />}
                </button>
              );
            })}
          </div>

          {showRightArrow && (
            <>
              <button
                type="button"
                onClick={() => scrollAmenities("right")}
                className="absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-white shadow"
              >
                <ChevronRight size={20} className="text-secondary-text" />
              </button>

              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}