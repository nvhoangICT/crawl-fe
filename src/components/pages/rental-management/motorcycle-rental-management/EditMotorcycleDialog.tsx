"use client";

import InputCustom from "@/components/common/InputCustom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MotoRentalFormData,
  motoRentalSchema,
} from "@/schemas/motoRentalSchema";
import { motobikeRentalService } from "@/services/motobikeRentalService";
import useCommon from "@/store/useCommon";
import { MotobikeRental } from "@/types/motobikeRental";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface EditMotorcycleDialogProps {
  open: boolean;
  rentalDetail?: MotobikeRental | null;
  onClose?: () => void;
}

const EditMotorcycleDialog = ({
  open,
  rentalDetail,
  onClose,
}: EditMotorcycleDialogProps) => {
  const { isRefresh, setIsRefresh } = useCommon();
  const form = useForm<MotoRentalFormData>({
    resolver: zodResolver(motoRentalSchema),
    defaultValues: {
      location: "",
      detailLink: "",
      image: "",
      imageAlt: "",
      delivery: "",
      vehicleType: "",
      provider: "",
      rating: 0,
      vehicleModels: [],
      availability: "",
      pricePerDay: "",
      price: "",
      holidayPrice: "",
      holidayNote: "",
      vehicles: [],
    },
  });

  const {
    fields: vehicleFields,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    control: form.control,
    name: "vehicles",
  });

  // Form population logic for editing
  useEffect(() => {
    if (rentalDetail && open) {
      form.reset(rentalDetail);
    }
  }, [rentalDetail, open, form]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onClose?.();
  };

  const onSubmit = async (data: MotoRentalFormData) => {
    if (rentalDetail) {
      try {
        await motobikeRentalService.update(rentalDetail.id, data);
        toast.success("Cập nhật thông tin thuê xe thành công");
        setIsRefresh(!isRefresh);
        form.reset({});
        onClose?.();
      } catch (error) {
        console.error("Failed to update rental data:", error);
        toast.error("Cập nhật thông tin thuê xe thất bại");
      }
    } else {
      try {
        await motobikeRentalService.create(data);
        toast.success("Tạo thông tin thuê xe thành công");
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
              {rentalDetail
                ? "Chỉnh sửa thông tin thuê xe"
                : "Tạo thông tin thuê xe"}
            </DialogTitle>
          </DialogHeader>
          <div className="h-full overflow-y-auto no-scrollbar px-1">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full flex flex-col gap-6"
            >
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 grid grid-cols-12 gap-6">
                  {/* Row 1 - Basic Info */}

                  <div className="col-span-6">
                    <InputCustom
                      label="Khu vực/Địa điểm"
                      name="location"
                      placeholder="Nhập địa điểm"
                      required
                      register={form.register("location")}
                      errorMessage={form.formState.errors.location?.message}
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
                      label="Ảnh đại diện"
                      name="image"
                      placeholder="Nhập URL ảnh đại diện"
                      required
                      register={form.register("image")}
                      errorMessage={form.formState.errors.image?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Mô tả ảnh đại diện"
                      name="imageAlt"
                      placeholder="Nhập mô tả ảnh"
                      required
                      register={form.register("imageAlt")}
                      errorMessage={form.formState.errors.imageAlt?.message}
                    />
                  </div>

                  {/* Row 3 - Service Info */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Giao xe tận nơi"
                      name="delivery"
                      placeholder="Nhập thông tin giao xe"
                      register={form.register("delivery")}
                      errorMessage={form.formState.errors.delivery?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Loại xe"
                      name="vehicleType"
                      placeholder="Nhập loại xe"
                      register={form.register("vehicleType")}
                      errorMessage={form.formState.errors.vehicleType?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Nhà cung cấp"
                      name="provider"
                      placeholder="Nhập nhà cung cấp"
                      register={form.register("provider")}
                      errorMessage={form.formState.errors.provider?.message}
                    />
                  </div>

                  {/* Row 4 - Rating and Availability */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Đánh giá"
                      type="number"
                      name="rating"
                      placeholder="Nhập đánh giá"
                      register={form.register("rating")}
                      errorMessage={form.formState.errors.rating?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Tình trạng xe"
                      name="availability"
                      placeholder="Nhập tình trạng xe"
                      register={form.register("availability")}
                      errorMessage={form.formState.errors.availability?.message}
                    />
                  </div>

                  {/* Row 5 - Vehicle Models */}
                  <div className="col-span-12">
                    <Label className="text-sm font-medium">
                      Mẫu xe <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      control={form.control}
                      name="vehicleModels"
                      render={({ field }) => (
                        <Textarea
                          placeholder="Nhập danh sách mẫu xe (mỗi dòng một mẫu xe)"
                          className="min-h-[100px] rounded-lg"
                          value={field.value.join("\n")}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                .split("\n")
                                .filter((model) => model.trim() !== "")
                            )
                          }
                        />
                      )}
                    />
                    {form.formState.errors.vehicleModels && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.vehicleModels.message}
                      </p>
                    )}
                  </div>

                  {/* Row 6 - Pricing */}
                  <div className="col-span-4">
                    <InputCustom
                      label="Giá thuê theo ngày"
                      name="pricePerDay"
                      placeholder="Nhập giá theo ngày"
                      register={form.register("pricePerDay")}
                      errorMessage={form.formState.errors.pricePerDay?.message}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Giá thuê"
                      name="price"
                      placeholder="Nhập giá thuê"
                      required
                      register={form.register("price")}
                      errorMessage={form.formState.errors.price?.message}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Giá ngày lễ"
                      name="holidayPrice"
                      placeholder="Nhập giá ngày lễ"
                      register={form.register("holidayPrice")}
                      errorMessage={form.formState.errors.holidayPrice?.message}
                    />
                  </div>

                  {/* Row 7 - Holiday Note */}
                  <div className="col-span-12">
                    <Label className="text-sm font-medium">
                      Ghi chú ngày lễ
                    </Label>
                    <Textarea
                      placeholder="Nhập ghi chú về giá ngày lễ"
                      className="min-h-[80px] rounded-lg"
                      {...form.register("holidayNote")}
                    />
                    {form.formState.errors.holidayNote && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.holidayNote.message}
                      </p>
                    )}
                  </div>

                  {/* Row 8 - Timestamps */}

                  {/* Vehicles Section */}
                  <div className="col-span-12">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-lg font-semibold">
                          Danh sách xe chi tiết
                        </Label>
                        <Button
                          type="button"
                          onClick={() =>
                            appendVehicle({
                              image: "",
                              price: "",
                              rating: "",
                              delivery: "",
                              imageAlt: "",
                              location: "",
                              provider: "",
                              detailLink: "",
                              holidayNote: "",
                              pricePerDay: "",
                              vehicleType: "",
                              availability: "",
                              holidayPrice: "",
                              vehicleModels: [],
                            })
                          }
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm xe
                        </Button>
                      </div>

                      {vehicleFields.map((field, index) => {
                        return (
                          <div
                            key={field.id}
                            className="border rounded-lg p-4 space-y-4"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold">Xe {index + 1}</h4>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeVehicle(index)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-12 gap-4">
                              <div className="col-span-6">
                                <InputCustom
                                  label="Ảnh xe"
                                  name={`vehicles.${index}.image`}
                                  placeholder="Nhập URL ảnh xe"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.image`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.image?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Mô tả ảnh xe"
                                  name={`vehicles.${index}.imageAlt`}
                                  placeholder="Nhập mô tả ảnh"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.imageAlt`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.imageAlt?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Giá thuê"
                                  name={`vehicles.${index}.price`}
                                  placeholder="Nhập giá thuê"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.price`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.price?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Giá theo ngày"
                                  name={`vehicles.${index}.pricePerDay`}
                                  placeholder="Nhập giá theo ngày"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.pricePerDay`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.pricePerDay?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Giá ngày lễ"
                                  name={`vehicles.${index}.holidayPrice`}
                                  placeholder="Nhập giá ngày lễ"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.holidayPrice`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.holidayPrice?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Đánh giá"
                                  name={`vehicles.${index}.rating`}
                                  placeholder="Nhập đánh giá"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.rating`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.rating?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Giao xe tận nơi"
                                  name={`vehicles.${index}.delivery`}
                                  placeholder="Nhập thông tin giao xe"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.delivery`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.delivery?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Địa điểm"
                                  name={`vehicles.${index}.location`}
                                  placeholder="Nhập địa điểm"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.location`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.location?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Nhà cung cấp"
                                  name={`vehicles.${index}.provider`}
                                  placeholder="Nhập nhà cung cấp"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.provider`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.provider?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Link chi tiết"
                                  name={`vehicles.${index}.detailLink`}
                                  placeholder="Nhập link chi tiết"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.detailLink`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.detailLink?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Loại xe"
                                  name={`vehicles.${index}.vehicleType`}
                                  placeholder="Nhập loại xe"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.vehicleType`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.vehicleType?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Tình trạng xe"
                                  name={`vehicles.${index}.availability`}
                                  placeholder="Nhập tình trạng xe"
                                  required
                                  register={form.register(
                                    `vehicles.${index}.availability`
                                  )}
                                  errorMessage={
                                    form.formState.errors.vehicles?.[index]
                                      ?.availability?.message
                                  }
                                />
                              </div>
                              <div className="col-span-12">
                                <Label className="text-sm font-medium">
                                  Ghi chú ngày lễ
                                </Label>
                                <Textarea
                                  placeholder="Nhập ghi chú ngày lễ"
                                  className="min-h-[80px] rounded-lg"
                                  {...form.register(
                                    `vehicles.${index}.holidayNote`
                                  )}
                                />
                                {form.formState.errors.vehicles?.[index]
                                  ?.holidayNote && (
                                  <p className="text-xs text-red-500">
                                    {
                                      form.formState.errors.vehicles?.[index]
                                        ?.holidayNote?.message
                                    }
                                  </p>
                                )}
                              </div>
                              <div className="col-span-12">
                                <Label className="text-sm font-medium">
                                  Mẫu xe
                                </Label>
                                <Controller
                                  control={form.control}
                                  name={`vehicles.${index}.vehicleModels`}
                                  render={({ field }) => (
                                    <Textarea
                                      placeholder="Nhập danh sách mẫu xe (mỗi dòng một mẫu xe)"
                                      className="min-h-[80px] rounded-lg"
                                      value={
                                        field.value
                                          ? field.value.join("\n")
                                          : ""
                                      }
                                      onChange={(e) =>
                                        field.onChange(
                                          e.target.value
                                            .split("\n")
                                            .filter(
                                              (model) => model.trim() !== ""
                                            )
                                        )
                                      }
                                    />
                                  )}
                                />
                                {form.formState.errors.vehicles?.[index]
                                  ?.vehicleModels && (
                                  <p className="text-xs text-red-500">
                                    {
                                      form.formState.errors.vehicles?.[index]
                                        ?.vehicleModels?.message
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
                {rentalDetail && (
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

export default EditMotorcycleDialog;
