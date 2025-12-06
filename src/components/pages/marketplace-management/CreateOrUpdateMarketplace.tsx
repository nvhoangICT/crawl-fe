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
import { marketplaceSchema } from "@/schemas/marketplaceSchema";
import { marketplaceService } from "@/services/marketplaceService";
import useCommon from "@/store/useCommon";
import { Marketplace } from "@/types/marketplace";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

type MarketplaceFormData = z.infer<typeof marketplaceSchema>;

interface Props {
  onClose?: () => void;
  open?: boolean;
  dataUpdate?: Marketplace | null;
  readonly?: boolean;
}

const CreateOrUpdateMarketplace = ({
  open,
  onClose,
  dataUpdate,
  readonly,
}: Props)=> {
  const { isRefresh, setIsRefresh } = useCommon();
  const form = useForm<MarketplaceFormData>({
    resolver: zodResolver(marketplaceSchema),
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
    },
    mode: "onChange",
  });

  const onFormSubmit = async (data: MarketplaceFormData) => {
    try {
      if (dataUpdate) {
        // Update existing restaurant
        await marketplaceService.update(dataUpdate.id, data);
        toast.success("Cập nhật cửa hàng thành công!");
      } else {
        // Create new restaurant
        await marketplaceService.create(data);
        toast.success("Thêm cửa hàng mới thành công!");
      }
      form.reset();
      onClose?.();
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Đã xảy ra lỗi khi lưu dữ liệu cửa hàng!");
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
            {dataUpdate ? "Chỉnh sửa cửa hàng" : "Thêm cửa hàng mới"}
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
                    <FormLabel>Tên cửa hàng</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên cửa hàng"
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
                        placeholder="VD: contact@cuahangabc.vn"
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
                        placeholder="VD: https://cuahangabc.vn"
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
export default CreateOrUpdateMarketplace;