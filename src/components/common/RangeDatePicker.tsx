import * as React from "react";
import {CalendarIcon, XIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {Calendar} from "../ui/calendar";
import {endOfDay, format, startOfDay} from "date-fns";
import {cn} from "@/lib/utils";

interface RangeDatePickerProps {
  placeholder?: string;
  onChange: (range: {from: string; to: string}) => void;
  value?: {from: string; to: string};
}

export function RangeDatePicker({
  onChange,
  placeholder = "Select date range",
  value,
}: RangeDatePickerProps) {
  const [range, setRange] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({from: undefined, to: undefined});
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (value && !value.from && !value.to) {
      setRange({from: undefined, to: undefined});
    }
  }, [value]);

  const handleClearRange = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRange({from: undefined, to: undefined});
    onChange({from: "", to: ""});
  };

  const handleRangeSelect = (
    selectedRange: {from: Date | undefined; to: Date | undefined} | any
  ) => {
    setRange(selectedRange);
    onChange({
      from: selectedRange.from
        ? format(startOfDay(selectedRange.from), "yyyy-MM-dd'T'HH:mm:ss")
        : "",
      to: selectedRange.to
        ? format(endOfDay(selectedRange.to), "yyyy-MM-dd'T'HH:mm:ss")
        : "",
    });

    if (selectedRange.from && selectedRange.to) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            readOnly
            value={
              range.from && range.to
                ? `${format(range.from, "dd/MM/yyyy")} - ${format(
                    range.to,
                    "dd/MM/yyyy"
                  )}`
                : range.from
                ? `${format(range.from, "dd/MM/yyyy")} - `
                : ""
            }
            placeholder={placeholder}
            className={cn(
              "w-full h-[45px] pr-10 font-normal cursor-pointer",
              !range.from && "text-muted-foreground"
            )}
          />
          {(range.from || range.to) && (
            <XIcon
              className="absolute right-8 top-1/2 transform -translate-y-1/2 h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={handleClearRange}
            />
          )}
          <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={{
            from: range.from,
            to: range.to,
          }}
          onSelect={handleRangeSelect}
          initialFocus
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
}
