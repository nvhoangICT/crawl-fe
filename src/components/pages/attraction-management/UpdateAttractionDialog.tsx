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
import { attractionSchema } from "@/schemas/attractionShema";
import { attractionService } from "@/services/attractionService";
import useCommon from "@/store/useCommon";
import { AttractionType } from "@/types/attractionType";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type * as z from "zod";

type AttractionFormData = z.infer<typeof attractionSchema>;

interface UpdateAttractionProps {
  open: boolean;
  attractionDetail: AttractionType | null;
  onClose?: () => void;
}

const UpdateAttraction = ({
  open,
  attractionDetail,
  onClose,
}: UpdateAttractionProps) => {
  const { setIsRefresh, isRefresh } = useCommon();

  const form = useForm<AttractionFormData>({
    resolver: zodResolver(attractionSchema),
    defaultValues: {
      name: "",
      address: "",
      province: "",
      phone: "",
      mobilePhone: "",
      email: "",
      website: "",
      imageUrl: "",
      detailLink: "",
      price: 0,
      discount: 0,
      packageName: "",
      description: "",
      info: "",
      images: "",
      score: 0,
      review: "",
    },
  });

  // Form population logic for editing
  useEffect(() => {
    if (attractionDetail && open) {
      form.reset({
        name: attractionDetail.name || "",
        address: attractionDetail.address || "",
        province: attractionDetail.province || "",
        phone: attractionDetail.phone || "",
        mobilePhone: attractionDetail.mobilePhone || "",
        email: attractionDetail.email || "",
        website: attractionDetail.website || "",
        imageUrl: attractionDetail.imageUrl || "",
        detailLink: attractionDetail.detailLink || "",
        price: attractionDetail.price || 0,
        discount: attractionDetail.discount || 0,
        packageName: attractionDetail.packageName || "",
        description: attractionDetail.description || "",
        info: attractionDetail.info || "",
        images: attractionDetail?.images ? attractionDetail.images : "",
        score: attractionDetail.score || 0,
        review: attractionDetail.review || "",
      });
    }
  }, [attractionDetail, open, form]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onClose?.();
  };

  const onSubmit = async (data: AttractionFormData) => {
    if (attractionDetail) {
      try {
        await attractionService.update(attractionDetail.id, data);
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
        await attractionService.create(data);
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
              {attractionDetail
                ? "Chỉnh sửa thông tin điểm tham quan"
                : "Tạo thông tin điểm tham quan"}
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
                      label="Tên điểm tham quan"
                      name="name"
                      placeholder="Nhập tên điểm tham quan"
                      required
                      register={form.register("name")}
                      errorMessage={form.formState.errors.name?.message}
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

                  {/* Row 2 - Address */}
                  <div className="col-span-12">
                    <InputCustom
                      label="Địa chỉ"
                      name="address"
                      placeholder="Nhập địa chỉ chi tiết"
                      required
                      register={form.register("address")}
                      errorMessage={form.formState.errors.address?.message}
                    />
                  </div>

                  {/* Row 3 - Contact Info */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Số điện thoại"
                      name="phone"
                      placeholder="Nhập số điện thoại (tùy chọn)"
                      register={form.register("phone")}
                      errorMessage={form.formState.errors.phone?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Số di động"
                      name="mobilePhone"
                      placeholder="Nhập số di động (tùy chọn)"
                      register={form.register("mobilePhone")}
                      errorMessage={form.formState.errors.mobilePhone?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Email"
                      name="email"
                      placeholder="Nhập email (tùy chọn)"
                      register={form.register("email")}
                      errorMessage={form.formState.errors.email?.message}
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

                  {/* Row 4 - Description and Info */}
                  <div className="col-span-6">
                    <Label className="text-sm font-medium">
                      Mô tả <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      placeholder="Nhập mô tả về điểm tham quan"
                      className="min-h-[100px] rounded-lg"
                      {...form.register("description")}
                    />
                    {form.formState.errors.description && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-6">
                    <Label className="text-sm font-medium">
                      Thông tin chi tiết
                    </Label>
                    <Textarea
                      placeholder="Nhập thông tin chi tiết (tùy chọn)"
                      className="min-h-[100px] rounded-lg"
                      {...form.register("info")}
                    />
                    {form.formState.errors.info && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.info.message}
                      </p>
                    )}
                  </div>

                  {/* Row 5 - Pricing */}
                  <div className="col-span-4">
                    <InputCustom
                      label="Giá vé"
                      name="price"
                      type="number"
                      placeholder="Nhập giá vé (VND)"
                      register={form.register("price", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.price?.message}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Giảm giá (%)"
                      name="discount"
                      type="number"
                      placeholder="Nhập % giảm giá"
                      register={form.register("discount", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.discount?.message}
                    />
                  </div>
                  <div className="col-span-4">
                    <InputCustom
                      label="Tên gói"
                      name="packageName"
                      placeholder="Nhập tên gói (tùy chọn)"
                      register={form.register("packageName")}
                      errorMessage={form.formState.errors.packageName?.message}
                    />
                  </div>

                  {/* Row 6 - Images */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Ảnh đại diện"
                      name="imageUrl"
                      placeholder="Nhập URL ảnh đại diện (tùy chọn)"
                      register={form.register("imageUrl")}
                      errorMessage={form.formState.errors.imageUrl?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Link chi tiết"
                      name="detailLink"
                      placeholder="Nhập link chi tiết (tùy chọn)"
                      register={form.register("detailLink")}
                      errorMessage={form.formState.errors.detailLink?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputCustom
                      label="Link chi tiết"
                      name="images"
                      placeholder="Nhập link chi tiết (tùy chọn)"
                      register={form.register("images")}
                      errorMessage={form.formState.errors.detailLink?.message}
                    />
                  </div>

                  {/* Row 8 - Rating and Review */}
                  <div className="col-span-6">
                    <InputCustom
                      label="Điểm đánh giá"
                      name="score"
                      type="number"
                      step="0.1"
                      placeholder="Nhập điểm (0-10)"
                      register={form.register("score", {
                        valueAsNumber: true,
                      })}
                      errorMessage={form.formState.errors.score?.message}
                    />
                  </div>
                  <div className="col-span-6">
                    <Label className="text-sm font-medium">Đánh giá</Label>
                    <Textarea
                      placeholder="Nhập đánh giá (tùy chọn)"
                      className="min-h-[100px] rounded-lg"
                      {...form.register("review")}
                    />
                    {form.formState.errors.review && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.review.message}
                      </p>
                    )}
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
                {attractionDetail && (
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

export default UpdateAttraction;
