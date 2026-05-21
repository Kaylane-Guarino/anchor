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
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
  rating?: string;
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
    const isDesktop = useMediaQuery("(min-width: 768px)");

  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);

  const selectedAmenities = searchParams.getAll("amenity");
  const selectedPropertyType = searchParams.get("propertyType") ?? "";
  const selectedRating = searchParams.get("rating") ?? "";

  const activeFiltersCount =
    selectedAmenities.length +
    (selectedPropertyType ? 1 : 0) +
    (selectedRating ? 1 : 0);

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
  <div className="border-b bg-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center">
      <div className="flex w-full gap-2 overflow-x-auto pb-1 lg:w-auto lg:shrink-0 lg:overflow-visible lg:pb-0">
        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <button className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-gray-900 px-3 py-2 md:px-4 md:py-2 font-semibold text-foreground text-sm md:text-base">
              <SlidersHorizontal size={isDesktop ? 16 : 14} />
              Filtros

              {activeFiltersCount > 0 && (
                <span className="flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-[calc(100vw-32px)] max-w-[720px] border-none p-0 shadow-none"
          >
            <FiltersPopover
              initialAmenities={selectedAmenities}
              initialPropertyType={selectedPropertyType}
              initialRating={selectedRating}
              isApplying={isApplyingFilters}
              onApply={(values) => {
                setIsApplyingFilters(true);

                applyFilters({
                  amenity: values.amenity,
                  propertyType: values.propertyType,
                  rating: values.rating,
                });

                setIsApplyingFilters(false);
                setIsFiltersOpen(false);
              }}
              onReset={() => {
                setIsApplyingFilters(true);

                applyFilters({
                  amenity: [],
                  propertyType: "",
                  rating: "",
                });

                setIsApplyingFilters(false);
                setIsFiltersOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-2 md:px-4 md:py-2 font-semibold text-foreground data-[state=open]:border-primary text-sm md:text-base">
              Ordenar por
              <ChevronDown size={isDesktop ? 18 : 16} className="mt-1" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-[calc(100vw-32px)] max-w-[380px] border-none p-0 shadow-none"
          >
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
            <button className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-2 md:px-4 md:py-2 font-semibold text-foreground data-[state=open]:border-primary text-sm md:text-base">
              Preço
              <ChevronDown size={isDesktop ? 18 : 16} className="mt-1" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-[calc(100vw-32px)] max-w-[470px] border-none p-0 shadow-none"
          >
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
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent" />

            <button
              type="button"
              onClick={() => scrollAmenities("left")}
              className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-white shadow"
            >
              <ChevronLeft size={20} className="text-secondary-text" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-hidden scroll-smooth"
        >
          {quickAmenities.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity.value);

            return (
              <button
                key={amenity.value}
                type="button"
                onClick={() => toggleAmenity(amenity.value)}
                className={
                  isSelected
                    ? "flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-primary bg-sky-200 px-4 py-2 text-sm font-semibold text-foreground md:text-base"
                    : "flex shrink-0 cursor-pointer items-center rounded-full border bg-white px-4 py-2 text-sm font-semibold text-foreground md:text-base"
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

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent" />
          </>
        )}
      </div>
    </div>
  </div>
);
}
