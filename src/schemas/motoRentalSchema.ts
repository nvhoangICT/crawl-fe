import { z } from "zod";

export const vehicleSchema = z.object({
  image: z.string().optional(), // URL ảnh xe
  imageAlt: z.string().optional(), // Mô tả ảnh xe
  price: z.string().optional(), // Giá thuê
  pricePerDay: z.string().optional(), // Giá theo ngày
  holidayPrice: z.string().optional(), // Giá ngày lễ
  rating: z.string().optional(), // Đánh giá
  delivery: z.string().optional(), // Giao xe tận nơi
  location: z.string().optional(), // Địa điểm
  provider: z.string().optional(), // Nhà cung cấp
  detailLink: z.string().optional(), // Link chi tiết
  vehicleType: z.string().optional(), // Loại xe
  availability: z.string().optional(), // Tình trạng xe
  holidayNote: z.string().optional(), // Ghi chú ngày lễ
  vehicleModels: z.array(z.string()).optional(), // Danh sách mẫu xe
});

// Schema cho RentalListing
export const motoRentalSchema = z.object({
  location: z.string().min(1, "Vui lòng nhập địa điểm"),
  detailLink: z
    .string()
    .url("Vui lòng nhập URL hợp lệ")
    .min(1, "Vui lòng nhập link chi tiết"),
  image: z
    .string()
    .url("Vui lòng nhập URL ảnh hợp lệ")
    .min(1, "Vui lòng nhập ảnh đại diện"),
  imageAlt: z.string().min(1, "Vui lòng nhập mô tả ảnh đại diện"),
  delivery: z.string().nullable().optional(),
  vehicleType: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  rating: z.number().nullable().optional(),
  vehicleModels: z.array(z.string()).min(1, "Vui lòng nhập ít nhất một mẫu xe"),
  availability: z.string().nullable().optional(),
  pricePerDay: z.string().nullable().optional(),
  price: z.string().min(1, "Vui lòng nhập giá thuê"),
  holidayPrice: z.string().nullable().optional(),
  holidayNote: z.string().nullable().optional(),
  vehicles: z.array(vehicleSchema).optional(),
});

export type MotoRentalFormData = z.infer<typeof motoRentalSchema>;
export type VehicleFormData = z.infer<typeof vehicleSchema>;
