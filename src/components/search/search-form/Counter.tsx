import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

type CounterProps = {
  label: string;
  value: number;
  min: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function Counter({
  label,
  value,
  min,
  onDecrease,
  onIncrease,
}: CounterProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="font-semibold text-secondary-text">{label}</span>

      <div className="grid w-40 grid-cols-3 items-center rounded-lg border">
        <button
          type="button"
          disabled={value <= min}
          onClick={onDecrease}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-xl transition",
            value <= min
              ? "cursor-not-allowed border-gray-300 text-gray-300"
              : "text-primary cursor-pointer"
          )}
        >
          <Minus size={18} />
        </button>

        <span className="text-center font-semibold text-secondary-text">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-12 items-center justify-center text-primary cursor-pointer"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
