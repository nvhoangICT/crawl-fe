import z from "zod";

export const tourBusSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề tour"),
  routeUrl: z
    .string()
    .url("Vui lòng nhập URL tuyến đường hợp lệ")
    .min(1, "Vui lòng nhập URL tuyến đường"),
  detailLink: z
    .string()
    .url("Vui lòng nhập URL chi tiết hợp lệ")
    .min(1, "Vui lòng nhập link chi tiết"),
  image: z
    .string()
    .url("Vui lòng nhập URL ảnh hợp lệ")
    .min(1, "Vui lòng nhập ảnh"),
  imageAlt: z.string().min(1, "Vui lòng nhập mô tả ảnh"),
  vehicleType: z.string().min(1, "Vui lòng nhập loại xe"),
  serviceType: z.string().min(1, "Vui lòng nhập loại dịch vụ"),
  maxPassengers: z.string().min(1, "Vui lòng nhập số hành khách tối đa"),
  departure: z.string().min(1, "Vui lòng nhập điểm khởi hành"),
  destination: z.string().min(1, "Vui lòng nhập điểm đến"),
  price: z.string().min(1, "Vui lòng nhập giá tour"),
  vatNote: z.string().min(1, "Vui lòng nhập ghi chú VAT"),
});
export type TourBusFormData = z.infer<typeof tourBusSchema>;
