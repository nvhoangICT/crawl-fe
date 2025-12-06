"use client";

import InputCustom from "@/components/common/InputCustom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type TourBusFormData, tourBusSchema } from "@/schemas/tourBusSchema";
import { tourBusService } from "@/services/tourBusService";
import useCommon from "@/store/useCommon";
import { TourBusType } from "@/types/tour-bus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UpdateTourBusProps {
  open: boolean;
  data: TourBusType | null;
  onClose?: () => void;
}

const UpdateTourBus = ({ open, data, onClose }: UpdateTourBusProps) => {
  const { setIsRefresh, isRefresh } = useCommon();

  const form = useForm<TourBusFormData>({
    resolver: zodResolver(tourBusSchema),
    defaultValues: {
      title: "",
      routeUrl: "",
      detailLink: "",
      image: "",
      imageAlt: "",
      vehicleType: "",
      serviceType: "",
      maxPassengers: "",
      departure: "",
      destination: "",
      price: "",
      vatNote: "",
    },
  });

  // Form population logic for editing
  useEffect(() => {
    if (data && open) {
      form.reset(data);
    }
  }, [data, open, form]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onClose?.();
  };

  const onSubmit = async (dataEdit: TourBusFormData) => {
    if (data) {
      try {
        await tourBusService.update(data.id, dataEdit);
        toast.success("Cập nhật thông tin thuê xe du lịch thành công");
        setIsRefresh(!isRefresh);
        form.reset({});
        onClose?.();
      } catch (error) {
        console.error("Failed to update rental data:", error);
        toast.error("Cập nhật thông tin thuê xe thất bại");
      }
    } else {
      try {
        await tourBusService.create(data);
        toast.success("Tạo thông tin thuê xe du lịch thành công");
        onClose?.();
        setIsRefresh(!isRefresh);
        form.reset({});
      } catch (error) {
        console.error("Failed to create rental data:", error);
        toast.error("Tạo thông tin thuê xe thất bại");
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-w-[90vw] lg:max-w-[80vw] h-[90vh] rounded-sm"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {data
                ? "Chỉnh sửa thông tin tour xe buýt"
                : "Tạo thông tin tour xe buýt"}
            </DialogTitle>
          </DialogHeader>
          <div className="h-full overflow-y-auto no-scrollbar px-1">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full flex flex-col gap-6"
            >
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 grid grid-cols-12 gap-6">
                  {/* Row 1 - Title and Route */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Tiêu đề tour"
                      name="title"
                      placeholder="Nhập tiêu đề tour"
                      required
                      register={form.register("title")}
                      errorMessage={form.formState.errors.title?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="URL tuyến đường"
                      name="routeUrl"
                      placeholder="Nhập URL tuyến đường"
                      required
                      register={form.register("routeUrl")}
                      errorMessage={form.formState.errors.routeUrl?.message}
                    />
                  </div>

                  {/* Row 2 - Links and Images */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Link chi tiết"
                      name="detailLink"
                      placeholder="Nhập link chi tiết"
                      required
                      register={form.register("detailLink")}
                      errorMessage={form.formState.errors.detailLink?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Ảnh tour"
                      name="image"
                      placeholder="Nhập URL ảnh tour"
                      required
                      register={form.register("image")}
                      errorMessage={form.formState.errors.image?.message}
                    />
                  </div>

                  {/* Row 3 - Image Alt and Vehicle Type */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Mô tả ảnh"
                      name="imageAlt"
                      placeholder="Nhập mô tả ảnh"
                      required
                      register={form.register("imageAlt")}
                      errorMessage={form.formState.errors.imageAlt?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Loại xe"
                      name="vehicleType"
                      placeholder="Nhập loại xe"
                      required
                      register={form.register("vehicleType")}
                      errorMessage={form.formState.errors.vehicleType?.message}
                    />
                  </div>

                  {/* Row 4 - Service Type and Max Passengers */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Loại dịch vụ"
                      name="serviceType"
                      placeholder="Nhập loại dịch vụ"
                      required
                      register={form.register("serviceType")}
                      errorMessage={form.formState.errors.serviceType?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Số hành khách tối đa"
                      name="maxPassengers"
                      placeholder="Ví dụ: Chở tối đa 4 khách"
                      required
                      register={form.register("maxPassengers")}
                      errorMessage={
                        form.formState.errors.maxPassengers?.message
                      }
                    />
                  </div>

                  {/* Row 5 - Departure and Destination */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Điểm khởi hành"
                      name="departure"
                      placeholder="Nhập điểm khởi hành"
                      required
                      register={form.register("departure")}
                      errorMessage={form.formState.errors.departure?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Điểm đến"
                      name="destination"
                      placeholder="Nhập điểm đến"
                      required
                      register={form.register("destination")}
                      errorMessage={form.formState.errors.destination?.message}
                    />
                  </div>

                  {/* Row 6 - Price and VAT Note */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Giá tour"
                      name="price"
                      placeholder="Ví dụ: 1.300.000đ"
                      required
                      register={form.register("price")}
                      errorMessage={form.formState.errors.price?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Ghi chú VAT"
                      name="vatNote"
                      placeholder="Ví dụ: (Chưa bao gồm VAT)"
                      required
                      register={form.register("vatNote")}
                      errorMessage={form.formState.errors.vatNote?.message}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onClose?.()}
                >
                  Hủy
                </Button>
                {data && (
                  <Button
                    type="button"
                    variant="outline"
                    disabled={false}
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                )}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Đang lưu..." : "Lưu"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateTourBus;
