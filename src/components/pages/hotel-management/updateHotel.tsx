"use client";

import InputCustom from "@/components/common/InputCustom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { hotelSchema } from "@/schemas/hotelSchema";
import { hotelService } from "@/services/hotelService";
import useCommon from "@/store/useCommon";
import { Hotel } from "@/types/hotel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

type HotelFormData = z.infer<typeof hotelSchema>;

interface UpdateHotelProps {
  open: boolean;
  dataUpdate: Hotel | null;
  onClose?: () => void;
}

const normalizeHotelImages = (
  images: unknown
): { url: string; alt?: string | null }[] => {
  if (!Array.isArray(images)) return [];
  return images
    .map((image) => {
      if (typeof image === "string") {
        return { url: image, alt: "" };
      }
      if (image && typeof image === "object") {
        const typedImage = image as { url?: string | null; alt?: string | null };
        return { url: typedImage.url || "", alt: typedImage.alt || "" };
      }
      return { url: "", alt: "" };
    })
    .filter((image) => Boolean(image.url));
};

const serializeHotelImages = (
  images: HotelFormData["images"]
): string[] => {
  if (!Array.isArray(images)) return [];
  return images
    .map((image) => {
      if (typeof image === "string") return image;
      return image?.url?.trim() || "";
    })
    .filter((url) => url.length > 0);
};
const UpdateHotel = ({ open, dataUpdate, onClose }: UpdateHotelProps) => {
  const { isRefresh, setIsRefresh } = useCommon();
  const form = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      name: "",
      accommodationType: "",
      rating: "",
      address: "",
      province: "",
      phone: "",
      mobilePhone: "",
      fax: "",
      email: "",
      website: "",
      roomCount: 0,
      rooms: [],
      price: "",
      imageUrl: "",
      detailLink: "",
      services: "",
      images: [],
      scores: "",
      ratingLocation: 0,
      ratingValue: 0,
      ratingComfort: 0,
      ratingFacilities: 0,
      ratingStaff: 0,
      ratingCleanliness: 0,
      description: "",
      distanceToCenter: "",
    },
  });

  const {
    fields: roomFields,
    append: appendRoom,
    remove: removeRoom,
  } = useFieldArray({
    control: form.control,
    name: "rooms",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });
  const watchedImages = form.watch("images");

  // Form population logic for editing
  useEffect(() => {
    if (dataUpdate && open) {
      form.reset(
        {
          ...dataUpdate,
          images: normalizeHotelImages(dataUpdate.images),
        } as HotelFormData
      );
    }
  }, [dataUpdate, open, form]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onClose?.();
  };

  const onSubmit = async (data: HotelFormData) => {
    try {
      const payload = {
        ...data,
        images: serializeHotelImages(data.images),
      };

      if (dataUpdate) {
        // Update existing restaurant
        await hotelService.update(dataUpdate.id, payload);
        toast.success("Cập nhật nhà hàng thành công!");
      } else {
        // Create new restaurant
        await hotelService.create(payload);
        toast.success("Thêm nhà hàng mới thành công!");
      }
      form.reset();
      onClose?.();
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error("Error submitting form:", error);
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
              {dataUpdate
                ? "Chỉnh sửa thông tin khách sạn"
                : "Tạo thông tin khách sạn"}
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
                      label="Tên khách sạn"
                      name="name"
                      placeholder="Nhập tên khách sạn"
                      required
                      register={form.register("name")}
                      errorMessage={form.formState.errors.name?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Loại hình lưu trú"
                      name="accommodationType"
                      placeholder="Nhập loại hình lưu trú (e.g., Hotel, Resort)"
                      required
                      register={form.register("accommodationType")}
                      errorMessage={
                        form.formState.errors.accommodationType?.message
                      }
                    />
                  </div>

                  {/* Row 2 - Address */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Địa chỉ"
                      name="address"
                      placeholder="Nhập địa chỉ chi tiết"
                      required
                      register={form.register("address")}
                      errorMessage={form.formState.errors.address?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Tỉnh/Thành phố"
                      name="province"
                      placeholder="Nhập tỉnh/thành phố"
                      required
                      register={form.register("province")}
                      errorMessage={form.formState.errors.province?.message}
                    />
                  </div>

                  {/* Row 3 - Contact Info */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Số điện thoại"
                      name="phone"
                      placeholder="Nhập số điện thoại"
                      required
                      register={form.register("phone")}
                      errorMessage={form.formState.errors.phone?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Số di động"
                      name="mobilePhone"
                      placeholder="Nhập số di động"
                      required
                      register={form.register("mobilePhone")}
                      errorMessage={form.formState.errors.mobilePhone?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Fax"
                      name="fax"
                      placeholder="Nhập số fax (tùy chọn)"
                      register={form.register("fax")}
                      errorMessage={form.formState.errors.fax?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Email"
                      name="email"
                      placeholder="Nhập email"
                      required
                      register={form.register("email")}
                      errorMessage={form.formState.errors.email?.message}
                    />
                  </div>
                  {/* Row 5 - Images */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Ảnh đại diện"
                      name="imageUrl"
                      placeholder="Nhập URL ảnh đại diện"
                      required
                      register={form.register("imageUrl")}
                      errorMessage={form.formState.errors.imageUrl?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Website"
                      name="website"
                      placeholder="Nhập website (tùy chọn)"
                      register={form.register("website")}
                      errorMessage={form.formState.errors.website?.message}
                    />
                  </div>
                  <div className="col-span-12">
                    <InputCustom
                      label="Link chi tiết"
                      name="detailLink"
                      placeholder="Nhập link chi tiết"
                      required
                      register={form.register("detailLink")}
                      errorMessage={form.formState.errors.detailLink?.message}
                    />
                  </div>
                  {/* Row 4 - Description and Price */}
                  <div className="col-span-12">
                    <Label className="text-sm font-medium">
                      Mô tả <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      placeholder="Nhập mô tả về khách sạn"
                      className="min-h-[100px] rounded-lg"
                      {...form.register("description")}
                    />
                    {form.formState.errors.description && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 border border-black" />

                  <div className="col-span-6">
                    <InputCustom
                      label="Giá"
                      name="price"
                      placeholder="Nhập giá (e.g., 2,145,000)"
                      required
                      register={form.register("price")}
                      errorMessage={form.formState.errors.price?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Khoảng cách tới trung tâm"
                      name="distanceToCenter"
                      placeholder="Nhập khoảng cách (e.g., 0.5 km)"
                      required
                      register={form.register("distanceToCenter")}
                      errorMessage={
                        form.formState.errors.distanceToCenter?.message
                      }
                    />
                  </div>

                  {/* Row 6 - Ratings */}
                  <div className="col-span-4">
                    <InputCustom
                      label="Xếp hạng"
                      name="rating"
                      placeholder="Nhập xếp hạng (e.g., 4 sao)"
                      required
                      register={form.register("rating")}
                      errorMessage={form.formState.errors.rating?.message}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Điểm số"
                      name="scores"
                      placeholder="Nhập điểm số"
                      required
                      register={form.register("scores")}
                      errorMessage={form.formState.errors.scores?.message}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Điểm vị trí"
                      name="ratingLocation"
                      type="number"
                      placeholder="Nhập điểm (0-10)"
                      required
                      register={form.register("ratingLocation", {
                        valueAsNumber: true,
                      })}
                      errorMessage={
                        form.formState.errors.ratingLocation?.message
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Điểm giá trị"
                      name="ratingValue"
                      type="number"
                      step="any"
                      placeholder="Nhập điểm (0-10)"
                      required
                      register={form.register("ratingValue", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.ratingValue?.message}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Điểm tiện nghi"
                      name="ratingComfort"
                      type="number"
                      placeholder="Nhập điểm (0-10)"
                      required
                      register={form.register("ratingComfort", {
                        valueAsNumber: true,
                      })}
                      errorMessage={
                        form.formState.errors.ratingComfort?.message
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Điểm cơ sở vật chất"
                      name="ratingFacilities"
                      type="number"
                      placeholder="Nhập điểm (0-10)"
                      required
                      register={form.register("ratingFacilities", {
                        valueAsNumber: true,
                      })}
                      errorMessage={
                        form.formState.errors.ratingFacilities?.message
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Điểm nhân viên"
                      name="ratingStaff"
                      type="number"
                      placeholder="Nhập điểm (0-10)"
                      required
                      register={form.register("ratingStaff", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.ratingStaff?.message}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Điểm sạch sẽ"
                      name="ratingCleanliness"
                      type="number"
                      placeholder="Nhập điểm (0-10)"
                      required
                      register={form.register("ratingCleanliness", {
                        valueAsNumber: true,
                      })}
                      errorMessage={
                        form.formState.errors.ratingCleanliness?.message
                      }
                    />
                  </div>

                  {/* Row 7 - Services and Detail Link */}
                  <div className="col-span-4">
                    <InputCustom
                      label="Dịch vụ"
                      name="services"
                      placeholder="Nhập dịch vụ"
                      required
                      register={form.register("services")}
                      errorMessage={form.formState.errors.services?.message}
                    />
                  </div>

                  <div className="col-span-12 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">
                        Danh sách ảnh chi tiết
                      </Label>
                      <Button
                        type="button"
                        size={"sm"}
                        onClick={() => appendImage({ url: "", alt: "" })}
                        className=" mb-2"
                      >
                        <Plus className="w-4 h-4" />
                        Thêm ảnh
                      </Button>
                    </div>
                    <div className="flex flex-col gap-4 border rounded-lg p-4">
                      {imageFields.length > 0 ? (
                        imageFields.map((image, index) => {
                          const urlValue =
                            typeof watchedImages?.[index] === "string"
                              ? (watchedImages?.[index] as string)
                              : watchedImages?.[index]?.url || "";

                          return (
                            <div
                              key={image.id}
                              className="flex flex-col gap-3 rounded-md border border-dashed border-gray-200 p-3"
                            >
                              <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                                <div className="flex-1">
                                  <InputCustom
                                    label={`URL ảnh ${index + 1}`}
                                    name={`images.${index}.url`}
                                    placeholder="Nhập URL ảnh"
                                    required
                                    register={form.register(
                                      `images.${index}.url`
                                    )}
                                    errorMessage={
                                      form.formState.errors.images?.[index]?.url
                                        ?.message
                                    }
                                  />
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-32 h-20 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                                    {urlValue ? (
                                      <img
                                        src={urlValue}
                                        alt={`Ảnh ${index + 1}`}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <span className="text-xs text-muted-foreground text-center px-2">
                                        Chưa có ảnh
                                      </span>
                                    )}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    className="h-[45px]"
                                    onClick={() => removeImage(index)}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Chưa có ảnh nào, nhấn "Thêm ảnh" để bắt đầu.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-12 border border-black" />

                  {/* Row 8 - Room Count */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Số lượng phòng"
                      name="roomCount"
                      type="number"
                      placeholder="Nhập số lượng phòng"
                      required
                      register={form.register("roomCount", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.roomCount?.message}
                    />
                  </div>

                  {/* Room Types Section */}
                  <div className="col-span-12">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <Label>Danh sách loại phòng</Label>
                        <Button
                          type="button"
                          size={"sm"}
                          onClick={() =>
                            appendRoom({
                              name: "",
                              image: { url: "", alt: "" },
                              packages: [
                                {
                                  name: "",
                                  price: "",
                                  priceDescription: "",
                                  isBestPrice: false,
                                  benefits: [],
                                  notes: [],
                                  bookingName: "",
                                },
                              ],
                            })
                          }
                        >
                          <Plus className="w-4 h-4" />
                          Thêm loại phòng
                        </Button>
                      </div>

                      {roomFields.map((field, index) => {
                        const packages =
                          form.watch(`rooms.${index}.packages`) || [];

                        // Function to append a new package
                        const appendPackage = () => {
                          const currentPackages =
                            form.getValues(`rooms.${index}.packages`) || [];
                          form.setValue(`rooms.${index}.packages`, [
                            ...currentPackages,
                            {
                              name: "",
                              price: "",
                              priceDescription: "",
                              isBestPrice: false,
                              benefits: [],
                              notes: [],
                              bookingName: "",
                            },
                          ]);
                        };

                        // Function to remove a package
                        const removePackage = (pkgIndex: number) => {
                          const currentPackages =
                            form.getValues(`rooms.${index}.packages`) || [];
                          form.setValue(
                            `rooms.${index}.packages`,
                            currentPackages.filter((_, i) => i !== pkgIndex)
                          );
                        };
                        return (
                          <div
                            key={field.id}
                            className="border rounded-lg p-4 space-y-4"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold">
                                Phòng {index + 1}
                              </h4>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeRoom(index)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-12 gap-4">
                              <div className="col-span-6">
                                <InputCustom
                                  label="Tên phòng"
                                  name={`rooms.${index}.name`}
                                  placeholder="Nhập tên phòng"
                                  required
                                  register={form.register(
                                    `rooms.${index}.name`
                                  )}
                                  errorMessage={
                                    form.formState.errors.rooms?.[index]?.name
                                      ?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="URL ảnh phòng"
                                  name={`rooms.${index}.image.url`}
                                  placeholder="Nhập URL ảnh"
                                  required
                                  register={form.register(
                                    `rooms.${index}.image.url`
                                  )}
                                  errorMessage={
                                    form.formState.errors.rooms?.[index]?.image
                                      ?.url?.message
                                  }
                                />
                              </div>
                              <div className="col-span-6">
                                <InputCustom
                                  label="Alt text ảnh phòng"
                                  name={`rooms.${index}.image.alt`}
                                  placeholder="Nhập alt text"
                                  required
                                  register={form.register(
                                    `rooms.${index}.image.alt`
                                  )}
                                  errorMessage={
                                    form.formState.errors.rooms?.[index]?.image
                                      ?.alt?.message
                                  }
                                />
                              </div>

                              {/* Packages Section */}
                              <div className="col-span-12">
                                <div className="flex flex-col gap-4">
                                  <div className="flex justify-between items-center">
                                    <Label>Gói dịch vụ</Label>
                                    <Button
                                      type="button"
                                      size={"sm"}
                                      onClick={appendPackage}
                                    >
                                      <Plus className="w-4 h-4" />
                                      Thêm gói dịch vụ
                                    </Button>
                                  </div>
                                  {packages.map((pkg, pkgIndex) => (
                                    <div
                                      key={pkgIndex}
                                      className="border rounded-lg p-4 space-y-4"
                                    >
                                      <div className="flex justify-between items-center">
                                        <Label>Gói {pkgIndex + 1}</Label>
                                        <Button
                                          type="button"
                                          size={"sm"}
                                          onClick={() =>
                                            removePackage(pkgIndex)
                                          }
                                        >
                                          <Minus className="w-4 h-4" />
                                        </Button>
                                      </div>
                                      <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-6">
                                          <InputCustom
                                            label="Tên gói"
                                            name={`rooms.${index}.packages.${pkgIndex}.name`}
                                            placeholder="Nhập tên gói"
                                            required
                                            register={form.register(
                                              `rooms.${index}.packages.${pkgIndex}.name`
                                            )}
                                            errorMessage={
                                              form.formState.errors.rooms?.[
                                                index
                                              ]?.packages?.[pkgIndex]?.name
                                                ?.message
                                            }
                                          />
                                        </div>
                                        <div className="col-span-6">
                                          <InputCustom
                                            label="Giá"
                                            name={`rooms.${index}.packages.${pkgIndex}.price`}
                                            placeholder="Nhập giá (e.g., 2,145,000)"
                                            required
                                            register={form.register(
                                              `rooms.${index}.packages.${pkgIndex}.price`
                                            )}
                                            errorMessage={
                                              form.formState.errors.rooms?.[
                                                index
                                              ]?.packages?.[pkgIndex]?.price
                                                ?.message
                                            }
                                          />
                                        </div>
                                        <div className="col-span-6">
                                          <InputCustom
                                            label="Mô tả giá"
                                            name={`rooms.${index}.packages.${pkgIndex}.priceDescription`}
                                            placeholder="Nhập mô tả giá"
                                            required
                                            register={form.register(
                                              `rooms.${index}.packages.${pkgIndex}.priceDescription`
                                            )}
                                            errorMessage={
                                              form.formState.errors.rooms?.[
                                                index
                                              ]?.packages?.[pkgIndex]
                                                ?.priceDescription?.message
                                            }
                                          />
                                        </div>
                                        <div className="col-span-6">
                                          <InputCustom
                                            label="Tên đặt phòng"
                                            name={`rooms.${index}.packages.${pkgIndex}.bookingName`}
                                            placeholder="Nhập tên đặt phòng"
                                            required
                                            register={form.register(
                                              `rooms.${index}.packages.${pkgIndex}.bookingName`
                                            )}
                                            errorMessage={
                                              form.formState.errors.rooms?.[
                                                index
                                              ]?.packages?.[pkgIndex]
                                                ?.bookingName?.message
                                            }
                                          />
                                        </div>
                                        <div className="col-span-12">
                                          <Label className="text-sm font-medium">
                                            Lợi ích
                                          </Label>
                                          {/* <Controller
                      control={form.control}
                      name={`rooms.${index}.packages.${pkgIndex}.benefits`}
                      render={({ field }) => (
                        <Textarea
                          placeholder="Nhập danh sách lợi ích (mỗi dòng một lợi ích)"
                          className="min-h-[100px] rounded-lg"
                          value={field.value.join("\n")}
                          onChange={(e) =>
                            field.onChange(e.target.value.split("\n"))
                          }
                        />
                      )}
                    /> */}
                                          {form.formState.errors.rooms?.[index]
                                            ?.packages?.[pkgIndex]?.benefits
                                            ?.message && (
                                            <p className="text-xs text-red-500">
                                              {
                                                form.formState.errors.rooms?.[
                                                  index
                                                ]?.packages?.[pkgIndex]
                                                  ?.benefits?.message
                                              }
                                            </p>
                                          )}
                                        </div>
                                        <div className="col-span-12">
                                          <Label className="text-sm font-medium">
                                            Ghi chú
                                          </Label>
                                          {/* <Controller
                      control={form.control}
                      name={`rooms.${index}.packages.${pkgIndex}.notes`}
                      render={({ field }) => (
                        <Textarea
                          placeholder="Nhập ghi chú (mỗi dòng một ghi chú)"
                          className="min-h-[100px] rounded-lg"
                          value={field.value.join("\n")}

                          onChange={(e) =>
                            field.onChange(e.target.value.split("\n"))
                          }
                        />
                      )}
                    /> */}
                                        </div>
                                        <div className="col-span-12 flex items-center space-x-2">
                                          <Checkbox
                                            id={`isBestPrice_${index}_${pkgIndex}`}
                                            checked={form.watch(
                                              `rooms.${index}.packages.${pkgIndex}.isBestPrice`
                                            )}
                                            onCheckedChange={(checked) =>
                                              form.setValue(
                                                `rooms.${index}.packages.${pkgIndex}.isBestPrice`,
                                                checked as boolean
                                              )
                                            }
                                          />
                                          <Label
                                            htmlFor={`isBestPrice_${index}_${pkgIndex}`}
                                          >
                                            Giá tốt nhất
                                          </Label>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
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
                {dataUpdate && (
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

export default UpdateHotel;
