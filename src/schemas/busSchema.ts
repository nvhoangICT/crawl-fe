import * as z from "zod";

export const busSchema = z.object({
  sourceUrl: z
    .string()
    .url({ message: "Vui lòng nhập URL hợp lệ" })
    .nonempty({ message: "URL nguồn không được để trống" })
    .optional()
    .nullable(),
  providerName: z
    .string()
    .nonempty({ message: "Tên nhà cung cấp không được để trống" })
    .optional()
    .nullable(),
  providerUrl: z
    .string()
    .url({ message: "Vui lòng nhập URL nhà cung cấp hợp lệ" })
    .nonempty({ message: "URL nhà cung cấp không được để trống" })
    .optional()
    .nullable(),
  startTime: z
    .string()
    .nonempty({ message: "Thời gian không được để trống" })
    .optional()
    .nullable(),
  endTime: z
    .string()
    .nonempty({ message: "Thời gian không được để trống" })
    .optional()
    .nullable(),
  departure: z
    .string()
    .nonempty({ message: "Điểm khởi hành không được để trống" })
    .optional()
    .nullable(),
  destination: z
    .string()
    .nonempty({ message: "Điểm đến không được để trống" })
    .optional()
    .nullable(),
  price: z
    .string()
    .nonempty({ message: "Giá không được để trống" })
    .optional()
    .nullable(),
});
