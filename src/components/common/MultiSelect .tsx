import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { TooltipCustom } from "./TooltipCustom";
import { SelectItemType } from "@/types/common";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type ClassNamesType = {
  wrapper?: string;
  trigger?: string;
  buttonTrigger?: string;
};

interface MultiSelectProps {
  options: SelectItemType[];
  onChange: (selected: SelectItemType[]) => void;
  placeholder?: string;
  value?: SelectItemType[];
  classNames?: ClassNamesType;
}

export default function MultiSelect({
  options,
  onChange,
  placeholder,
  value,
  classNames: { wrapper = "", trigger = "", buttonTrigger = "" } = {},
}: MultiSelectProps) {
  const [selected, setSelected] = useState<SelectItemType[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const allSelected = selected.length === options.length;
  const isPartiallySelected =
    selected.length > 0 && selected.length < options.length;

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const toggleSelect = (option: SelectItemType) => {
    setSelected((prev) => {
      const isSelected = prev.some((item) => item.value === option.value);
      const newSelected = isSelected
        ? prev.filter((item) => item.value !== option.value)
        : [...prev, option];

      onChange(newSelected);
      return newSelected;
    });
  };

  const toggleSelectAll = () => {
    const newSelected = allSelected ? [] : options;
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <TooltipCustom
      content={
        !isPopoverOpen && selected.length > 1 ? (
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => (
              <Badge
                variant="outline"
                key={item.value}
                className="flex items-center gap-2 px-[6px] py-1"
              >
                {item.label}
                <X
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => toggleSelect(item)}
                />
              </Badge>
            ))}
          </div>
        ) : (
          ""
        )
      }
    >
      <div className={cn("w-full", wrapper)}>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild className={trigger}>
            <Button
              variant="outline"
              className={cn(
                `w-full flex justify-between font-normal ${
                  selected.length === 0 ? "text-gray-600" : ""
                }`,
                buttonTrigger
              )}
            >
              <div className="truncate">
                {selected.length > 0
                  ? selected.map((item) => item.label).join(", ")
                  : placeholder}
              </div>
              <ChevronDown className="h-4 w-4 " />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2">
            <Command>
              <CommandGroup className="max-h-[300px] overflow-y-auto z-10">
                {/* Thêm option chọn tất cả */}
                {options.length > 0 ? (
                  <>
                    <CommandItem
                      onSelect={toggleSelectAll}
                      className="cursor-pointer flex items-center justify-between w-full font-medium"
                    >
                      Chọn tất cả
                      {allSelected ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : isPartiallySelected ? (
                        <span className="h-4 w-4 border-2 border-green-500 rounded-sm" />
                      ) : null}
                    </CommandItem>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleSelect(option)}
                        className="cursor-pointer flex items-center justify-between w-full"
                      >
                        {option.label}
                        {selected.some(
                          (item) => item.value === option.value
                        ) && <Check className="h-4 w-4 text-green-500" />}
                      </CommandItem>
                    ))}
                  </>
                ) : (
                  <>
                    <CommandItem className="cursor-pointer flex items-center justify-between w-full text-gray-500">
                      Không có dữ liệu
                    </CommandItem>
                  </>
                )}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </TooltipCustom>
  );
}
