import {format, getMonth, getYear, parse, setMonth, setYear} from "date-fns";
import {Calendar as CalendarIcon, XIcon} from "lucide-react";
import * as React from "react";
import {vi} from "date-fns/locale";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Input} from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DatePickerProps {
  value?: string;
  onChange: (date: string | undefined) => void;
  startYear?: number;
  endYear?: number;
  formatTemplate?: string;
  placeholder?: string;
  [key: string]: any;
}

export function DatePicker({
  onChange,
  placeholder = "dd/mm/yyyy",
  formatTemplate = "dd/MM/yyyy",
  value = undefined,
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  ...props
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [tempDate, setTempDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };
  function parseStringToDate(dateString: string): Date {
    return parse(dateString, formatTemplate, new Date());
  }

  React.useEffect(() => {
    if (value) {
      const parsedDate = parse(value, formatTemplate, new Date());
      setDate(parsedDate);
      setTempDate(parsedDate);
    }
  }, [value]);

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const years = Array.from(
    {length: endYear - startYear + 1},
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    if (tempDate) {
      setTempDate(setMonth(tempDate, months.indexOf(month)));
    }
  };

  const handleYearChange = (year: string) => {
    if (tempDate) {
      setTempDate(setYear(tempDate, parseInt(year)));
    }
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setTempDate(selectedDate);
      onChange(format(selectedDate, formatTemplate));
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
              value ? format(parseStringToDate(value), formatTemplate) : ""
            }
            placeholder={placeholder}
            className={cn(
              "w-full h-[45px] pr-10 font-normal cursor-pointer",
              !value && "text-muted-foreground"
            )}
          />
          {value ? (
            <XIcon
              className="absolute right-10 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={handleClearDate}
            />
          ) : null}
          <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2 gap-2">
          <Select
            onValueChange={handleMonthChange}
            value={tempDate ? months[getMonth(tempDate)] : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={tempDate ? getYear(tempDate).toString() : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          locale={vi}
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          month={tempDate}
          onMonthChange={setTempDate}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
