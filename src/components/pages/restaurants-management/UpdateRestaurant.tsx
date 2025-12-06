import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RestaurantDataType,
  restaurantSchema,
} from "@/schemas/restaurantSchema";
import { restaurantService } from "@/services/restaurantService";
import useCommon from "@/store/useCommon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

type RestaurantFormData = z.infer<typeof restaurantSchema>;

interface Props {
  onClose?: () => void;
  open?: boolean;
  dataUpdate?: RestaurantDataType | null;
  readonly?: boolean;
}

export function UpdateRestaurant({
  open,
  onClose,
  dataUpdate,
  readonly,
}: Props) {
  const{ isRefresh,setIsRefresh } = useCommon();
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: dataUpdate?.name || "",
      address: dataUpdate?.address || "",
      province: dataUpdate?.province || "",
      phone: dataUpdate?.phone || null,
      mobilePhone: dataUpdate?.mobilePhone || null,
      email: dataUpdate?.email || null,
      website: dataUpdate?.website || null,
      imageUrl: dataUpdate?.imageUrl || null,
      detailLink: dataUpdate?.detailLink || null,
      score: dataUpdate?.score || null,
    },
    mode: "onChange",
  });

  const onFormSubmit = async (data: RestaurantFormData) => {
    try {
      if (dataUpdate) {
        // Update existing restaurant
        await restaurantService.update(dataUpdate.id, data);
        toast.success("Cập nhật nhà hàng thành công!");
      } else {
        // Create new restaurant
        await restaurantService.create(data);
        toast.success("Thêm nhà hàng mới thành công!");
      }
      form.reset();
      onClose?.();
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Đã xảy ra lỗi khi lưu dữ liệu nhà hàng!");
    }
  };

  useEffect(() => {
    if (dataUpdate) {
      form.reset(dataUpdate);
    } else {
      form.reset();
    }
  }, [dataUpdate, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[60vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {dataUpdate ? "Chỉnh sửa nhà hàng" : "Thêm nhà hàng mới"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên nhà hàng</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên nhà hàng"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập địa chỉ"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tỉnh/thành phố"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: 0261 091 344 4770"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobilePhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số di động</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: 0912345678"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: contact@nhahangabc.vn"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: https://nhahangabc.vn"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL ảnh</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: https://cdn.foody.vn/res/abc1.jpg"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detailLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link chi tiết</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: https://foody.vn/ho-chi-minh/nha-hang-abc"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xếp hạng</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="VD: 4.5"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseFloat(e.target.value) : null
                          )
                        }
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={readonly}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={readonly}>
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
