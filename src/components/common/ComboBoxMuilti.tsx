import { Check, ChevronsUpDown, X } from "lucide-react";
import * as React from "react";
import { useRef } from "react";

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

interface MultiSelectComboBoxProps {
  placeholder: string;
  placeholderEmpty?: string;
  options: OptionType[];
  onChange?: (data: string[]) => void;
  value: string[]; // Nhiều giá trị
  isLoading?: boolean;
  onLoadMore?: () => void;
  onFilter?: (query: string) => void;
  readOnly?: boolean;
  disable?: boolean;
}

export function MultiSelectComboBox({
  placeholder,
  options,
  onChange,
  placeholderEmpty = "Không có dữ liệu",
  value,
  isLoading = false,
  onLoadMore,
  onFilter,
  readOnly = false,
  disable = false,
}: MultiSelectComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>();
  const [query, setQuery] = React.useState("");
  const [customOptions, setCustomOptions] = React.useState<OptionType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
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
    onChange?.([]);
  };

  const isSelected = (val: string) => value.includes(val);

  const toggleValue = (val: string) => {
    if (isSelected(val)) {
      onChange?.(value.filter((v) => v !== val));
    } else {
      onChange?.([...value, val]);
    }
  };

  // Xóa từng tag riêng biệt
  const handleRemoveTag = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    onChange?.(value.filter((v) => v !== val));
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

  // Gộp options gốc và custom
  const allOptions = React.useMemo(() => {
    // Không trùng value
    const merged = [...options];
    customOptions.forEach((opt) => {
      if (!merged.some((o) => o.value === opt.value)) merged.push(opt);
    });
    return merged;
  }, [options, customOptions]);

  const filteredOptions = onFilter
    ? allOptions
    : allOptions.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      );

  // Thêm custom value khi nhấn Enter
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      const exists = allOptions.some(
        (opt) => opt.value.toLowerCase() === query.trim().toLowerCase()
      );
      if (!exists) {
        const newOpt = { value: query.trim(), label: query.trim() };
        setCustomOptions((prev) => [...prev, newOpt]);
        onChange?.([...value, query.trim()]);
      } else {
        // Nếu đã có thì chọn luôn
        const found = allOptions.find(
          (opt) => opt.value.toLowerCase() === query.trim().toLowerCase()
        );
        if (found && !isSelected(found.value)) {
          onChange?.([...value, found.value]);
        }
      }
      setQuery("");
      // focus lại input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // Kiểm tra có nên show "Thêm mới"
  const showAddNew =
    query.trim() &&
    !allOptions.some(
      (opt) => opt.value.toLowerCase() === query.trim().toLowerCase()
    );

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={triggerRef}
          role="combobox"
          aria-expanded={open}
          className={`w-full h-auto min-h-[45px] px-3 py-2 flex items-center justify-between border rounded-md text-sm font-normal flex-wrap gap-1  ${
            !disable
              ? readOnly
                ? "cursor-text"
                : "cursor-pointer"
              : "bg-[#E6E6E6] cursor-not-allowed"
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {value.length > 0 ? (
              value
                .map((val) => allOptions.find((opt) => opt.value === val)?.label || val)
                .filter(Boolean)
                .map((label, idx) => (
                  <span
                    key={value[idx]}
                    className="bg-muted px-2 py-0.5 rounded text-xs flex items-center gap-1"
                  >
                    {label}
                    {!readOnly && !disable && (
                      <X
                        className="w-3 h-3 ml-1 text-muted-foreground hover:text-destructive cursor-pointer"
                        onClick={(e) => handleRemoveTag(e, value[idx])}
                      />
                    )}
                  </span>
                ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {value.length > 0 && !readOnly && !disable && (
              <X
                onClick={handleClear}
                className="w-4 h-4 text-muted-foreground hover:text-destructive cursor-pointer"
              />
            )}
            <ChevronsUpDown className="opacity-50 w-4 h-4" />
          </div>
        </div>
      </PopoverTrigger>
      {!readOnly && !disable && (
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
                onKeyDown={handleInputKeyDown}
                ref={inputRef}
              />
            </div>
            <CommandList ref={listRef} onScroll={handleLoadMore}>
              <CommandEmpty>{placeholderEmpty}</CommandEmpty>
              <CommandGroup>
                {showAddNew && (
                  <CommandItem
                    key={"add-new"}
                    value={query}
                    onSelect={() => {
                      const newOpt = { value: query.trim(), label: query.trim() };
                      setCustomOptions((prev) => [...prev, newOpt]);
                      onChange?.([...value, query.trim()]);
                      setQuery("");
                      setTimeout(() => {
                        inputRef.current?.focus();
                      }, 0);
                    }}
                  >
                    <span className="text-primary">Thêm mới: "{query.trim()}"</span>
                  </CommandItem>
                )}
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      toggleValue(option.value);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        isSelected(option.value) ? "opacity-100" : "opacity-0"
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
