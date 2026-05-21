"use client";

import { useEffect, useRef, useState } from "react";

import { Slider } from "../../ui/slider";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";

import { formatBRL } from "@/utils/formatters.utils";
import { useClickOutside } from "@/hooks/useClickOutside";

type PricePopoverProps = {
  initialMinPrice: string;
  initialMaxPrice: string;
  onApply: (prices: {
    minPrice: string;
    maxPrice: string;
  }) => void;
};

export function PricePopover({
  initialMinPrice,
  initialMaxPrice,
  onApply,
}: PricePopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<[number, number]>([
    Number(initialMinPrice || 100),
    Number(initialMaxPrice || 3000),
  ]);

  useEffect(() => {
    setValue([
      Number(initialMinPrice || 100),
      Number(initialMaxPrice || 3000),
    ]);
  }, [initialMinPrice, initialMaxPrice]);

  function handleApply() {
    onApply({
      minPrice: String(value[0]),
      maxPrice: String(value[1]),
    });

  }

  function handleReset() {
    const resetValue: [number, number] = [100, 3000];

    setValue(resetValue);

    onApply({
      minPrice: "",
      maxPrice: "",
    });

  }

  useClickOutside(ref, handleApply);

  return (
    <div
      ref={ref}
      className="absolute left-0 z-50 w-[370px] rounded-2xl bg-white shadow-2xl"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground">
          Defina o intervalo de preços
        </h3>

        <div className="mt-4 flex justify-between text-secondary-text">
          <p>{formatBRL(value[0])}</p>
          <p>{formatBRL(value[1])}</p>
        </div>

        <Slider
          value={value}
          min={100}
          max={3000}
          step={10}
          minStepsBetweenThumbs={1}
          onValueChange={(newValue) =>
            setValue(newValue as [number, number])
          }
          className="mt-6"
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between p-2">
        <Button
          type="button"
          variant="ghost"
          onClick={handleReset}
          className="font-semibold text-gray-400"
        >
          Redefinir
        </Button>

        <Button
          type="button"
          onClick={handleApply}
          className="rounded-xl bg-primary px-8 py-6 text-base font-bold text-white hover:bg-primary"
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
}