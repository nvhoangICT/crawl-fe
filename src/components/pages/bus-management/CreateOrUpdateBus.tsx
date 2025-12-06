"use client"

import InputCustom from "@/components/common/InputCustom"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { busSchema } from "@/schemas/busSchema"
import { busService } from "@/services/busService"
import useCommon from "@/store/useCommon"
import type { Bus } from "@/types/bus"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import type * as z from "zod"

type BusFormData = z.infer<typeof busSchema>

interface UpdateBusProps {
  open: boolean
  dataUpdate: Bus | null
  onClose?: () => void
}

const CreateOrUpdateBus = ({ open, dataUpdate, onClose }: UpdateBusProps) => {
  const { isRefresh, setIsRefresh } = useCommon()
  const form = useForm<BusFormData>({
    resolver: zodResolver(busSchema),
    defaultValues: {
      sourceUrl: "",
      providerName: "",
      providerUrl: "",
      startTime: "",
      endTime: "",
      departure: "",
      destination: "",
      price: "",
    },
  })

  const startTimeValue = form.watch("startTime")

  useEffect(() => {
    if (startTimeValue && startTimeValue.trim() !== "") {
      const currentEndTime = form.getValues("endTime")
      if (currentEndTime) {
        form.setValue("endTime", "")
      }
    }
  }, [startTimeValue, form])

  // Form population logic for editing
  useEffect(() => {
    if (dataUpdate && open) {
      if (dataUpdate.timeRange) {
        // Parse existing timeRange format "07:00 - 12:00" into separate times
        const timeRangeParts = dataUpdate.timeRange.split(" - ")
        const updatedData = {
          ...dataUpdate,
          startTime: timeRangeParts[0] || "",
          endTime: timeRangeParts[1] || "",
        }
        form.reset(updatedData)
      } else {
        form.reset(dataUpdate)
      }
    }
  }, [dataUpdate, open, form])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
    }
    onClose?.()
  }

  const onSubmit = async (data: BusFormData) => {
    const {startTime, endTime, ...rest} = data
    try {
      const submitData = {
        ...rest,
        timeRange: `${startTime} - ${endTime}`,
      }

      if (dataUpdate) {
        await busService.update(dataUpdate.id, submitData)
        toast.success("Cập nhật thông tin xe buýt thành công!")
      } else {
        await busService.create(submitData)
        toast.success("Thêm xe buýt mới thành công!")
      }
      form.reset()
      onClose?.()
      setIsRefresh(!isRefresh)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Đã có lỗi xảy ra khi lưu thông tin!")
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-w-[90vw] lg:max-w-[60vw]  rounded-sm"
          onPointerDownOutside={(e) => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {dataUpdate ? "Chỉnh sửa thông tin xe buýt" : "Tạo thông tin xe buýt"}
            </DialogTitle>
          </DialogHeader>
          <div className="h-full overflow-y-auto no-scrollbar px-1">
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col gap-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 grid grid-cols-12 gap-6">
                  {/* Row 1 - Source URL and Provider Name */}
                  <div className="col-span-12">
                    <InputCustom
                      label="URL Nguồn"
                      name="sourceUrl"
                      placeholder="Nhập URL nguồn"
                      required
                      register={form.register("sourceUrl")}
                      errorMessage={form.formState.errors.sourceUrl?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Tên Nhà Cung Cấp"
                      name="providerName"
                      placeholder="Nhập tên nhà cung cấp"
                      required
                      register={form.register("providerName")}
                      errorMessage={form.formState.errors.providerName?.message}
                    />
                  </div>

                  {/* Row 2 - Provider URL and Time Range */}
                  <div className="col-span-6">
                    <InputCustom
                      label="URL Nhà Cung Cấp"
                      name="providerUrl"
                      placeholder="Nhập URL nhà cung cấp"
                      required
                      register={form.register("providerUrl")}
                      errorMessage={form.formState.errors.providerUrl?.message}
                    />
                  </div>

                  {/* Row 3 - Departure and Destination */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Điểm Khởi Hành"
                      name="departure"
                      placeholder="Nhập điểm khởi hành"
                      required
                      register={form.register("departure")}
                      errorMessage={form.formState.errors.departure?.message}
                    />
                  </div>
                  <div className="col-span-3">
                    <InputCustom
                      label="Giờ Khởi Hành"
                      name="startTime"
                      type="time"
                      placeholder="07:00"
                      required
                      register={form.register("startTime")}
                      errorMessage={form.formState.errors.startTime?.message}
                    />
                  </div>
                  <div className="col-span-3">
                    <InputCustom
                      label="Giờ Kết Thúc"
                      name="endTime"
                      type="time"
                      placeholder="12:00"
                      required
                      register={form.register("endTime")}
                      errorMessage={form.formState.errors.endTime?.message}
                      disabled={!startTimeValue || startTimeValue.trim() === ""}
                    />
                  </div>

                  <div className="col-span-6">
                    <InputCustom
                      label="Điểm Đến"
                      name="destination"
                      placeholder="Nhập điểm đến"
                      required
                      register={form.register("destination")}
                      errorMessage={form.formState.errors.destination?.message}
                    />
                  </div>

                  {/* Row 4 - Price */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Giá"
                      name="price"
                      placeholder="Nhập giá (e.g., 500,000)"
                      required
                      register={form.register("price")}
                      errorMessage={form.formState.errors.price?.message}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button type="button" variant="destructive" onClick={() => onClose?.()}>
                  Hủy
                </Button>
                {dataUpdate && (
                  <Button type="button" variant="outline" disabled={false} onClick={() => form.reset()}>
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
  )
}

export default CreateOrUpdateBus
