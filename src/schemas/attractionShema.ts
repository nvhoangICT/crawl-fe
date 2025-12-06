import * as z from "zod";

export const attractionSchema = z.object({
  name: z.string().min(1, "Tên điểm tham quan là bắt buộc"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  province: z.string().min(1, "Tỉnh/Thành phố là bắt buộc"),
  phone: z.string().nullable().optional(),
  mobilePhone: z.string().nullable().optional(),
  email: z
    .string()
    .email("Email không hợp lệ")
    .nullable()
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Website không hợp lệ")
    .nullable()
    .optional()
    .or(z.literal("")),
  imageUrl: z
    .string()
    .url("URL ảnh không hợp lệ")
    .nullable()
    .optional()
    .or(z.literal("")),
  detailLink: z
    .string()
    .url("Link chi tiết không hợp lệ")
    .nullable()
    .optional()
    .or(z.literal("")),
  price: z
    .number()
    .min(0, "Giá phải lớn hơn hoặc bằng 0")
    .nullable()
    .optional(),
  discount: z
    .number()
    .min(0, "Giảm giá phải lớn hơn hoặc bằng 0")
    .max(100, "Giảm giá không được vượt quá 100%")
    .nullable()
    .optional(),
  packageName: z.string().nullable().optional(),
  description: z.string().min(1, "Mô tả là bắt buộc").nullable().optional(),
  info: z.string().nullable().optional(),
  images: z.string(),
  score: z
    .number()
    .min(0, "Điểm phải lớn hơn hoặc bằng 0")
    .max(10, "Điểm không được vượt quá 10")
    .nullable()
    .optional(),
  review: z.string().nullable().optional(),
});
