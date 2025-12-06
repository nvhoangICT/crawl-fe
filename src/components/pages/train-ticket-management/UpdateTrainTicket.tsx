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
import { calculateTotalTime } from "@/lib/utils";
import { trainTicketSchema } from "@/schemas/trainTicketSchema"; // Update to your service
import { trainTicketService } from "@/services/trainTicketService";
import useCommon from "@/store/useCommon";
import { TrainTicket } from "@/types/train-ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

type TrainTicketFormData = z.infer<typeof trainTicketSchema>;

interface UpdateTrainTicketProps {
  open: boolean;
  dataUpdate: TrainTicket | null;
  onClose?: () => void;
}

const UpdateTrainTicket = ({
  open,
  dataUpdate,
  onClose,
}: UpdateTrainTicketProps) => {
  const { isRefresh, setIsRefresh } = useCommon();
  const form = useForm<TrainTicketFormData>({
    resolver: zodResolver(trainTicketSchema),
    defaultValues: {
      url: "",
      route: "",
      averagePrice: 0,
      distance: 0,
      frequency: 0,
      score: 0,
      count: 0,
      legend: "",
      schedule: [],
      prices: [],
      contact: [],
      rating: { count: "", score: "", legend: "" },
    },
  });

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  const {
    fields: priceFields,
    append: appendPrice,
    remove: removePrice,
  } = useFieldArray({
    control: form.control,
    name: "prices",
  });

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control: form.control,
    name: "contact",
  });

  useEffect(() => {
    if (dataUpdate && open) {
      form.reset(dataUpdate);
    }
  }, [dataUpdate, open, form]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onClose?.();
  };

  const onSubmit = async (data: TrainTicketFormData) => {
    try {
      if (dataUpdate) {
        await trainTicketService.update(dataUpdate.id, data);
        toast.success("Cập nhật vé tàu thành công!");
      } else {
        await trainTicketService.create(data);
        toast.success("Thêm vé tàu mới thành công!");
      }
      form.reset();
      onClose?.();
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Đã có lỗi xảy ra khi lưu thông tin vé tàu!");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-w-[90vw] lg:max-w-[80vw] h-[90vh] rounded-sm"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {dataUpdate
                ? "Chỉnh sửa thông tin vé tàu"
                : "Tạo thông tin vé tàu"}
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
                      label="URL"
                      name="url"
                      placeholder="Nhập URL vé tàu"
                      register={form.register("url")}
                      errorMessage={form.formState.errors.url?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Tuyến đường"
                      name="route"
                      placeholder="Nhập tuyến đường (e.g., Yên Viên - Vĩnh Yên)"
                      register={form.register("route")}
                      errorMessage={form.formState.errors.route?.message}
                    />
                  </div>

                  {/* Row 2 - Price and Distance */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Giá trung bình"
                      name="averagePrice"
                      type="number"
                      placeholder="Nhập giá trung bình"
                      register={form.register("averagePrice", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.averagePrice?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Khoảng cách (km)"
                      name="distance"
                      type="number"
                      placeholder="Nhập khoảng cách"
                      register={form.register("distance", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.distance?.message}
                    />
                  </div>

                  {/* Row 3 - Frequency and Score */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Tần suất (số chuyến/ngày)"
                      name="frequency"
                      type="number"
                      placeholder="Nhập tần suất"
                      register={form.register("frequency", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.frequency?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Điểm số"
                      name="score"
                      type="text"
                      placeholder="Nhập điểm số (0-5)"
                      register={form.register("score", { valueAsNumber: true })}
                      errorMessage={form.formState.errors.score?.message}
                    />
                  </div>

                  {/* Row 4 - Count and Legend */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Số lượt đánh giá"
                      name="count"
                      type="number"
                      placeholder="Nhập số lượt đánh giá"
                      register={form.register("count", { valueAsNumber: true })}
                      errorMessage={form.formState.errors.count?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Chú thích đánh giá"
                      name="legend"
                      placeholder="Nhập chú thích (e.g., 4.5/5 - (86) lượt đánh giá)"
                      register={form.register("legend")}
                      errorMessage={form.formState.errors.legend?.message}
                    />
                  </div>

                  {/* Row 5 - Rating Details */}
                  <div className="col-span-12">
                    <Label className="text-sm font-medium">
                      Chi tiết đánh giá
                    </Label>
                    <div className="grid grid-cols-12 gap-4 mt-2 p-4 border rounded-lg">
                      <div className="col-span-4">
                        <InputCustom
                          label="Số lượt đánh giá"
                          name="rating.count"
                          placeholder="Nhập số lượt đánh giá"
                          register={form.register("rating.count")}
                          errorMessage={
                            form.formState.errors.rating?.count?.message
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <InputCustom
                          label="Điểm số"
                          name="rating.score"
                          placeholder="Nhập điểm số"
                          register={form.register("rating.score")}
                          errorMessage={
                            form.formState.errors.rating?.score?.message
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        <InputCustom
                          label="Chú thích"
                          name="rating.legend"
                          placeholder="Nhập chú thích đánh giá"
                          register={form.register("rating.legend")}
                          errorMessage={
                            form.formState.errors.rating?.legend?.message
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schedule Section */}
                  <div className="col-span-12">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <Label>Lịch trình</Label>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() =>
                            appendSchedule({
                              trainUrl: "",
                              totalTime: "",
                              arrivalTime: "",
                              trainNumber: "",
                              departureTime: "",
                            })
                          }
                        >
                          <Plus className="w-4 h-4" />
                          Thêm lịch trình
                        </Button>
                      </div>
                      {scheduleFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="border rounded-lg p-4 space-y-4"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold">
                              Lịch trình {index + 1}
                            </h4>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeSchedule(index)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12">
                              <InputCustom
                                label="URL tàu"
                                name={`schedule.${index}.trainUrl`}
                                placeholder="Nhập URL tàu"
                                register={form.register(
                                  `schedule.${index}.trainUrl`
                                )}
                                errorMessage={
                                  form.formState.errors.schedule?.[index]
                                    ?.trainUrl?.message
                                }
                              />
                            </div>

                            <div className="col-span-6">
                              <InputCustom
                                label="Giờ khởi hành"
                                name={`schedule.${index}.departureTime`}
                                type="time" // Use time input
                                placeholder="Chọn giờ khởi hành"
                                register={form.register(
                                  `schedule.${index}.departureTime`
                                )}
                                onChange={(e: any) => {
                                  const newDepartureTime = e.target.value;
                                  form.setValue(
                                    `schedule.${index}.departureTime`,
                                    newDepartureTime
                                  );
                                  const arrivalTime = form.getValues(
                                    `schedule.${index}.arrivalTime`
                                  );
                                  const totalTime = calculateTotalTime(
                                    newDepartureTime,
                                    arrivalTime
                                  );
                                  form.setValue(
                                    `schedule.${index}.totalTime`,
                                    totalTime,
                                    { shouldValidate: true }
                                  );
                                }}
                                errorMessage={
                                  form.formState.errors.schedule?.[index]
                                    ?.departureTime?.message
                                }
                              />
                            </div>
                            <div className="col-span-6">
                              <InputCustom
                                label="Giờ đến"
                                name={`schedule.${index}.arrivalTime`}
                                type="time" // Use time input
                                placeholder="Chọn giờ đến"
                                register={form.register(
                                  `schedule.${index}.arrivalTime`
                                )}
                                onChange={(e: any) => {
                                  const newArrivalTime = e.target.value;
                                  form.setValue(
                                    `schedule.${index}.arrivalTime`,
                                    newArrivalTime
                                  );
                                  const departureTime = form.getValues(
                                    `schedule.${index}.departureTime`
                                  );
                                  const totalTime = calculateTotalTime(
                                    departureTime,
                                    newArrivalTime
                                  );
                                  form.setValue(
                                    `schedule.${index}.totalTime`,
                                    totalTime,
                                    { shouldValidate: true }
                                  );
                                }}
                                errorMessage={
                                  form.formState.errors.schedule?.[index]
                                    ?.arrivalTime?.message
                                }
                              />
                            </div>
                            <div className="col-span-6">
                              <InputCustom
                                label="Tổng thời gian"
                                name={`schedule.${index}.totalTime`}
                                placeholder="Nhập tổng thời gian"
                                register={form.register(
                                  `schedule.${index}.totalTime`
                                )}
                                errorMessage={
                                  form.formState.errors.schedule?.[index]
                                    ?.totalTime?.message
                                }
                              />
                            </div>
                            <div className="col-span-6">
                              <InputCustom
                                label="Số hiệu tàu"
                                name={`schedule.${index}.trainNumber`}
                                placeholder="Nhập số hiệu tàu"
                                register={form.register(
                                  `schedule.${index}.trainNumber`
                                )}
                                errorMessage={
                                  form.formState.errors.schedule?.[index]
                                    ?.trainNumber?.message
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prices Section */}
                  <div className="col-span-12">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <Label>Bảng giá</Label>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() =>
                            appendPrice({
                              trainName: "",
                              prices: [{ code: "", price: 0, seatType: "" }],
                            })
                          }
                        >
                          <Plus className="w-4 h-4" />
                          Thêm bảng giá
                        </Button>
                      </div>
                      {priceFields.map((field, index) => {
                        const priceItems =
                          form.watch(`prices.${index}.prices`) || [];
                        const appendPriceItem = () => {
                          const currentPrices =
                            form.getValues(`prices.${index}.prices`) || [];
                          form.setValue(`prices.${index}.prices`, [
                            ...currentPrices,
                            { code: "", price: 0, seatType: "" },
                          ]);
                        };
                        const removePriceItem = (itemIndex: number) => {
                          const currentPrices =
                            form.getValues(`prices.${index}.prices`) || [];
                          form.setValue(
                            `prices.${index}.prices`,
                            currentPrices.filter((_, i) => i !== itemIndex)
                          );
                        };
                        return (
                          <div
                            key={field.id}
                            className="border rounded-lg p-4 space-y-4"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold">
                                Bảng giá {index + 1}
                              </h4>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removePrice(index)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                            </div>
                            <InputCustom
                              label="Tên tàu"
                              name={`prices.${index}.trainName`}
                              placeholder="Nhập tên tàu"
                              register={form.register(
                                `prices.${index}.trainName`
                              )}
                              errorMessage={
                                form.formState.errors.prices?.[index]?.trainName
                                  ?.message
                              }
                            />
                            <div className="flex flex-col gap-4">
                              <div className="flex justify-between items-center">
                                <Label>Giá vé</Label>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={appendPriceItem}
                                >
                                  <Plus className="w-4 h-4" />
                                  Thêm giá vé
                                </Button>
                              </div>
                              {priceItems.map((_, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="border rounded-lg p-4 space-y-2"
                                >
                                  <div className="flex justify-between items-center">
                                    <Label>Giá vé {itemIndex + 1}</Label>
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => removePriceItem(itemIndex)}
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-4">
                                      <InputCustom
                                        label="Mã giá"
                                        name={`prices.${index}.prices.${itemIndex}.code`}
                                        placeholder="Nhập mã giá"
                                        register={form.register(
                                          `prices.${index}.prices.${itemIndex}.code`
                                        )}
                                        errorMessage={
                                          form.formState.errors.prices?.[index]
                                            ?.prices?.[itemIndex]?.code?.message
                                        }
                                      />
                                    </div>
                                    <div className="col-span-4">
                                      <InputCustom
                                        label="Giá"
                                        name={`prices.${index}.prices.${itemIndex}.price`}
                                        type="number"
                                        placeholder="Nhập giá"
                                        register={form.register(
                                          `prices.${index}.prices.${itemIndex}.price`,
                                          { valueAsNumber: true }
                                        )}
                                        errorMessage={
                                          form.formState.errors.prices?.[index]
                                            ?.prices?.[itemIndex]?.price
                                            ?.message
                                        }
                                      />
                                    </div>
                                    <div className="col-span-4">
                                      <InputCustom
                                        label="Loại ghế"
                                        name={`prices.${index}.prices.${itemIndex}.seatType`}
                                        placeholder="Nhập loại ghế"
                                        register={form.register(
                                          `prices.${index}.prices.${itemIndex}.seatType`
                                        )}
                                        errorMessage={
                                          form.formState.errors.prices?.[index]
                                            ?.prices?.[itemIndex]?.seatType
                                            ?.message
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="col-span-12">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <Label>Thông tin liên hệ</Label>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() =>
                            appendContact({
                              type: "",
                              value: "",
                              description: "",
                            })
                          }
                        >
                          <Plus className="w-4 h-4" />
                          Thêm liên hệ
                        </Button>
                      </div>
                      {contactFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="border rounded-lg p-4 space-y-4"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold">
                              Liên hệ {index + 1}
                            </h4>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeContact(index)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                              <InputCustom
                                label="Loại liên hệ"
                                name={`contact.${index}.type`}
                                placeholder="Nhập loại liên hệ (e.g., phone, address)"
                                register={form.register(
                                  `contact.${index}.type`
                                )}
                                errorMessage={
                                  form.formState.errors.contact?.[index]?.type
                                    ?.message
                                }
                              />
                            </div>
                            <div className="col-span-6">
                              <InputCustom
                                label="Giá trị"
                                name={`contact.${index}.value`}
                                placeholder="Nhập giá trị liên hệ"
                                register={form.register(
                                  `contact.${index}.value`
                                )}
                                errorMessage={
                                  form.formState.errors.contact?.[index]?.value
                                    ?.message
                                }
                              />
                            </div>
                          <div className="col-span-12">
                              <div className="flex flex-col gap-1">
                                <Label htmlFor={`contact.${index}.description`} className="text-sm font-medium">
                                  Mô tả liên hệ
                                </Label>
                                <Textarea
                                  id={`contact.${index}.description`}
                                  placeholder="Nhập mô tả liên hệ"
                                  {...form.register(`contact.${index}.description`)}
                                  className="resize-y"
                                />
                                {form.formState.errors.contact?.[index]?.description?.message && (
                                  <p className="text-xs text-red-500">
                                    {form.formState.errors.contact[index].description?.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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

export default UpdateTrainTicket;
