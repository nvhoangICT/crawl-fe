import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface Props {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputSearch = ({
  placeholder,
  className,
  onChange,
  value,
}: Props) => {
  return (
    <>
      <div className="relative w-full">
        <Input
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={`${className} pr-10`} // thêm padding để tránh icon đè lên text
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search size={18} />
        </div>
      </div>
    </>
  );
};
