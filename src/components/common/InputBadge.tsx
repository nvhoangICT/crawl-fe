import {Badge} from "@/components/ui/badge";
import {X} from "lucide-react";
import React, {useState} from "react";

interface InputBadgeProps {
  onChange: (badges: string[]) => void;
  onChangeError?: (message?: string) => void;
  value?: string[];
  duplicateWarning?: string;
  maxCard?: number;
}

const InputBadge = ({
  onChange,
  onChangeError,
  value = [],
  maxCard,
}: InputBadgeProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      const newBadge = inputValue.trim();

      if (value.includes(newBadge)) {
        onChangeError?.("ERRORDUPLICATE");
        return;
      }
      if (maxCard && newBadge.length > maxCard) {
        onChangeError?.("ERRORMAXCARD");
        return;
      }
      onChangeError?.("NOERROR");
      const updatedBadges = [...value, newBadge];
      onChange(updatedBadges); // Cập nhật danh sách badges
      setInputValue("");
    }
  };

  const handleRemoveBadge = (index: number) => {
    const updatedBadges = value.filter((_, i) => i !== index);
    onChange(updatedBadges);
  };

  return (
    <div className="flex items-center gap-2 border border-input rounded-lg p-2">
      <div className="flex flex-wrap gap-2">
        {value.map((badge, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {badge}
            <button type="button" onClick={() => handleRemoveBadge(index)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          type="text"
          placeholder="Nhập và nhấn Enter..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="outline-none flex-1 min-w-[150px] w-full"
        />
      </div>
    </div>
  );
};

export default InputBadge;
