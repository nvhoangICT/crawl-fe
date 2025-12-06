"use client";

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
import { AirportFormData, airportSchema } from "@/schemas/airportSchema";
import { airportTransferService } from "@/services/airportTransferService";

import useCommon from "@/store/useCommon";
import { AirportType } from "@/types/airportType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  dataDetail?: AirportType | null;
  onClose?: () => void;
}

const UpdateAirport = ({ open, dataDetail, onClose }: Props) => {
  const { isRefresh, setIsRefresh } = useCommon();
  const form = useForm<AirportFormData>({
    resolver: zodResolver(airportSchema),
    defaultValues: {
      fromLocation: "",
      toLocation: "",
      vehicleType: "",
      routeType: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (dataDetail && open) {
      form.reset(dataDetail);
    }
  }, [dataDetail, open, form]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onClose?.();
  };

  const onSubmit = async (data: AirportFormData) => {
    try {
      if (dataDetail) {
        await airportTransferService.update(dataDetail.id, data);
        toast.success("Cập nhật thông tin thuê xe thành công");
      } else {
        await airportTransferService.create(data);
        toast.success("Tạo thông tin thuê xe thành công");
      }
      setIsRefresh(!isRefresh);
      form.reset({});
      onClose?.();
    } catch (error) {
      console.error("Failed to save rental data:", error);
      toast.error("Lưu thông tin thuê xe thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-[90vw] lg:max-w-3xl max-h-screen overflow-y-auto rounded-md p-6"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {dataDetail
              ? "Chỉnh sửa thông tin thuê xe"
              : "Tạo thông tin thuê xe"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* fromLocation */}
              <FormField
                control={form.control}
                name="fromLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Điểm khởi hành *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: Sân bay Nội Bài" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* toLocation */}
              <FormField
                control={form.control}
                name="toLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Điểm đến *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: Trung tâm Hà Nội" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* vehicleType */}
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại xe *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ví dụ: Sedan, SUV, Van..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* routeType */}
              <FormField
                control={form.control}
                name="routeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại tuyến đường *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ví dụ: Một chiều, Khứ hồi..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ví dụ: 500000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer Action */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose?.()}
              >
                Hủy
              </Button>
              {dataDetail && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => form.reset(dataDetail)}
                >
                  Reset
                </Button>
              )}
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAirport;
