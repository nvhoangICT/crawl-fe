import z from "zod";

export const airportSchema = z.object({
  fromLocation: z.string().min(1, "Vui lòng nhập điểm khởi hành"),
  toLocation: z.string().min(1, "Vui lòng nhập điểm đến"),
  vehicleType: z.string().min(1, "Vui lòng nhập loại xe"),
  routeType: z.string().min(1, "Vui lòng nhập loại tuyến đường"),
  price: z.number().min(1, "Giá phải lớn hơn 0"),
});

export type AirportFormData = z.infer<typeof airportSchema>;
