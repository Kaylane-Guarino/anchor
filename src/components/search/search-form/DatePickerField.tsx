import "react-day-picker/dist/style.css";

import { CalendarDays } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { DateRange, DayPicker } from "react-day-picker";
import { formatDisplayDate } from "@/utils/search-form.utils";

type DatePickerFieldProps = {
  dateRange?: DateRange;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onChange: (dateRange?: DateRange) => void;
  variant?: "hero" | "header";
};

export function DatePickerField({
  dateRange,
  isOpen,
  onToggle,
  onClose,
  onChange,
  variant = "hero",
}: DatePickerFieldProps) {
  const isHeader = variant === "header";
  const selectedDateLabel =
    dateRange?.from && dateRange?.to
      ? `${formatDisplayDate(dateRange.from)} - ${formatDisplayDate(
          dateRange.to,
        )}`
      : "Selecione as datas";

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className={
          isHeader
            ? "flex min-w-0 items-center gap-2 bg-white px-3 py-2 text-left text-sm font-semibold text-gray-500"
            : "flex min-w-0 items-center gap-4 bg-white px-5 py-4 text-left font-semibold text-gray-500"
        }
      >
        <CalendarDays
          className="shrink-0 text-gray-500"
          size={isHeader ? 18 : 24}
        />

        <span
          className={
            isHeader
              ? "block w-[130px] overflow-hidden text-ellipsis whitespace-nowrap"
              : "block w-[180px] overflow-hidden text-ellipsis whitespace-nowrap"
          }
        >
          {selectedDateLabel}
        </span>
      </button>

      {isOpen && (
        <div className={isHeader ? "absolute left-1/2 z-50 mt-10 -translate-x-1/2 rounded-xl bg-white p-4 shadow-xl" : "absolute left-1/2 z-50 mt-17 -translate-x-1/2 rounded-xl bg-white p-4 shadow-xl"}>
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={onChange}
            numberOfMonths={2}
            locale={ptBR}
            disabled={{ before: new Date() }}
            className="text-sm"
            classNames={{
              months: "flex gap-8",
              month: "w-[250px]",
              month_caption:
                "mb-3 flex items-center justify-center font-bold text-foreground",

              nav: "absolute right-0 flex gap-2",
              button_previous:
                "flex h-8 w-8 items-center justify-center rounded-md text-primary",
              button_next:
                "flex h-8 w-8 items-center justify-center rounded-md text-primary",

              weekdays: "mb-2 flex",
              weekday: "w-9 text-center text-xs font-medium text-gray-400",
              week: "flex",

              day: "h-9 w-9 p-0 text-center text-sm text-foreground cursor-pointer",
              day_button: "h-9 w-9 rounded-none cursor-pointer",

              selected: "",

              range_start:
                "bg-transparent text-white [&>button]:bg-primary [&>button]:text-white [&>button]:rounded-full",

              range_end:
                "bg-transparent text-white [&>button]:bg-primary [&>button]:text-white [&>button]:rounded-full",

              range_middle:
                "bg-gray-100 text-foreground [&>button]:bg-gray-100 [&>button]:text-foreground [&>button]:rounded-none",

              today: "font-bold text-primary",
              outside: "text-gray-300",
              disabled: "text-gray-300",
            }}
          />

          <div className="mt-1 flex justify-end border-t">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-primary px-5 py-2 font-semibold text-primary hover:bg-blue-50 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
