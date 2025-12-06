"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import InputCustom from "./InputCustom";

type OptionType = {
  value: string;
  label: string;
};

interface ComboBoxProps {
  placeholder: string;
  placeholderEmpty?: string;
  options: OptionType[];
  onChange?: (data: string) => void;
  value: string | null;
  isLoading?: boolean;
  onLoadMore?: () => void;
  onFilter?: (query: string) => void;
  disable?: boolean;
  readOnly?: boolean;
}

export function Combobox({
  placeholder,
  options,
  onChange,
  placeholderEmpty = "Không có dữ liệu",
  value,
  isLoading = false,
  onLoadMore,
  onFilter,
  disable = false,
  readOnly = false,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>();

  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
    return () => {
      setQuery("");
    };
  }, [open]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.("");
  };

  const handleLoadMore = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (
      target.scrollHeight - target.scrollTop <= target.clientHeight + 50 &&
      !isLoading
    ) {
      onLoadMore?.();
    }
  };

  // Client-side search fallback
  const filteredOptions = onFilter
    ? options
    : options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={triggerRef}
          role="combobox"
          aria-expanded={open}
          className={`w-full h-[45px] px-3 flex items-center justify-between border rounded-md text-sm font-normal ${
            !disable
              ? readOnly
                ? "cursor-text"
                : "cursor-pointer"
              : "bg-[#E6E6E6] cursor-not-allowed"
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex-1 truncate text-left">
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {value && !readOnly && !disable && (
              <X
                onClick={handleClear}
                className="w-4 h-4 text-muted-foreground hover:text-destructive cursor-pointer"
              />
            )}
            <ChevronsUpDown className="opacity-50 w-4 h-4" />
          </div>
        </div>
      </PopoverTrigger>
      {!disable && !readOnly && (
        <PopoverContent className="p-0" style={{ width: triggerWidth }}>
          <Command>
            <div className="p-2">
              <InputCustom
                name="search"
                value={query}
                placeholder={placeholder}
                className="!outline-none !border-none !focus-visible:ring-0 !focus-visible:border-none h-[35px] !rounded-md"
                onChange={(e: any) => {
                  const val = e.target.value;
                  setQuery(val);
                  onFilter?.(val);
                }}
              />
            </div>
            <CommandList ref={listRef} onScroll={handleLoadMore}>
              <CommandEmpty>{placeholderEmpty}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      const newValue =
                        option.value === value ? "" : option.value;
                      onChange?.(newValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto w-4 h-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
                {isLoading && (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                    Đang tải...
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
