import "react-day-picker/dist/style.css";

import { CalendarDays } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { DateRange, DayPicker } from "react-day-picker";

import { formatDisplayDate } from "@/utils/search-form.utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const numberOfMonths = isDesktop ? 2 : 1;

  const selectedDateLabel =
    dateRange?.from && dateRange?.to
      ? `${formatDisplayDate(dateRange.from)} - ${formatDisplayDate(
          dateRange.to,
        )}`
      : "Selecione as datas";

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        onClick={onToggle}
        className={
          isHeader
            ? "flex w-full min-w-0 items-center gap-2 bg-white px-3 py-2 text-left text-sm font-semibold text-gray-500"
            : "flex w-full min-w-0 items-center gap-3 border-t bg-white px-5 py-4 text-left font-semibold text-gray-500 md:border-l md:border-t-0"
        }
      >
        <CalendarDays
          className="shrink-0 text-gray-500"
          size={isHeader ? 18 : 22}
        />

        <span
          className={
            isHeader
              ? "block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
              : "block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
          }
        >
          {selectedDateLabel}
        </span>
      </button>

      {isOpen && (
        <div
          className={
            isHeader
              ? "absolute left-1/2 z-50 mt-3 w-[min(92vw,620px)] -translate-x-1/2 rounded-xl bg-white p-3 shadow-xl"
              : "absolute left-1/2 z-50 mt-3 w-[min(92vw,620px)] -translate-x-1/2 rounded-xl bg-white p-3 shadow-xl md:p-4"
          }
        >
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
            locale={ptBR}
            disabled={{ before: new Date() }}
            className="
  text-sm
  [&_.rdp-months]:flex-col
  md:[&_.rdp-months]:flex-row
"
            classNames={{
              months: `
  flex flex-col gap-4
  md:flex-row md:gap-8
`,

              month: `
  w-full
  md:w-[250px]
`,
              month_caption:
                "mb-3 flex items-center justify-center font-bold text-foreground",

              nav: "absolute right-3 top-3 flex gap-2",
              button_previous:
                "flex h-8 w-8 items-center justify-center rounded-md text-primary",
              button_next:
                "flex h-8 w-8 items-center justify-center rounded-md text-primary",

              weekdays: "mb-2 flex",
              weekday: "flex-1 text-center text-xs font-medium text-gray-400",
              week: "flex",

              day: "h-9 flex-1 p-0 text-center text-sm text-foreground",
              day_button: "mx-auto h-9 w-9 rounded-none cursor-pointer",

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

          <div className="mt-3 flex justify-end border-t pt-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-primary px-5 py-2 font-semibold text-primary hover:bg-blue-50"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
