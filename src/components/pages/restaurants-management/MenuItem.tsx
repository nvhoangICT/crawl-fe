import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import Shadcn/UI Popover components

interface MenuItemProps {
  field: any;
  index: number;
  form: any;
  defaultOpen?: boolean;
  onRemove?: (index: number) => void;
}

const MenuItem = ({
  field,
  index,
  form,
  defaultOpen = false,
  onRemove,
}: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const tenMon = form.watch(`menu.${index}.ten_mon`) || field.ten_mon;

  return (
    <div key={field.id} className="relative">
      {onRemove && (
        <div
          onClick={() => onRemove(index)}
          aria-label="Xóa món"
          className="absolute right-0 top-0 bg-slate-100 translate-x-1/2 -translate-y-1/2 rounded-full p-1 cursor-pointer hover:bg-slate-200 transition duration-200"
        >
          <X className="h-4 w-4 text-red-500" />
        </div>
      )}
      <div className="border px-4 py-3 rounded-md">
        <div className="flex justify-between items-center relative">
          <h4 className="font-medium">{tenMon||"Món ăn mới"}</h4>
          <div className="flex gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-expanded={isOpen}
                  aria-controls={`menu-details-${index}`}
                >
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <FormField
                  control={form.control}
                  name={`menu.${index}.ten_mon`}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Tên món</FormLabel>
                      <FormControl>
                        <Input placeholder="VD: Phở bò đặc biệt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`menu.${index}.gia`}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Giá</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`menu.${index}.mo_ta`}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="VD: Phở bò nạm gầu với nước dùng trong"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`menu.${index}.anh`}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Link ảnh</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VD: https://cdn.foody.vn/res/pho.jpg"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`menu.${index}.loai_mon`}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Loại món</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VD: Món chính"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`menu.${index}.xep_hang`}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Xếp hạng (0-5)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`menu.${index}.gio_ban`}
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Giờ bán</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VD: 08:00 - 22:00"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;