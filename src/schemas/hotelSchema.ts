import * as z from "zod";

const ImageSchema = z.object({
  url: z.string().url({ message: "URL ảnh không hợp lệ" }).optional().nullable(),
  alt: z.string().optional().nullable(),
});

const PackageSchema = z.object({
  name: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  priceDescription: z.string().optional().nullable(),
  isBestPrice: z.boolean().optional().nullable(),
  benefits: z.array(z.string()).optional().nullable(),
  notes: z.array(z.string()).optional().nullable(),
  bookingName: z.string().optional().nullable(),
});

const RoomSchema = z.object({
  name: z.string().optional().nullable(),
  image: ImageSchema.optional().nullable(),
  packages: z.array(PackageSchema).optional().nullable(),
});

export const hotelSchema = z.object({
  name: z.string().optional().nullable(),
  accommodationType: z.string().optional().nullable(),
  rating: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  mobilePhone: z.string().optional().nullable(),
  fax: z.string().optional().nullable(),
  email: z.string().email({ message: "Email không hợp lệ" }).optional().nullable(),
  website: z.string().url({ message: "Website không hợp lệ" }).optional().nullable(),
  roomCount: z.number().int().nonnegative({ message: "Số lượng phòng phải là số không âm" }).optional().nullable(),
  rooms: z.array(RoomSchema).optional().nullable(),
  price: z.string().optional().nullable(),
  imageUrl: z.string().url({ message: "URL ảnh không hợp lệ" }).optional().nullable(),
  detailLink: z.string().url({ message: "Link chi tiết không hợp lệ" }).optional().nullable(),
  services: z.string().optional().nullable(),
  images: z.array(ImageSchema).optional().nullable(),
  scores: z.string().optional().nullable(),
  ratingLocation: z.number().min(0).max(10, { message: "Điểm vị trí phải từ 0 đến 10" }).optional().nullable(),
  ratingValue: z.number().min(0).max(10, { message: "Điểm giá trị phải từ 0 đến 10" }).optional().nullable(),
  ratingComfort: z.number().min(0).max(10, { message: "Điểm tiện nghi phải từ 0 đến 10" }).optional().nullable(),
  ratingFacilities: z.number().min(0).max(10, { message: "Điểm cơ sở vật chất phải từ 0 đến 10" }).optional().nullable(),
  ratingStaff: z.number().min(0).max(10, { message: "Điểm nhân viên phải từ 0 đến 10" }).optional().nullable(),
  ratingCleanliness: z.number().min(0).max(10, { message: "Điểm sạch sẽ phải từ 0 đến 10" }).optional().nullable(),
  description: z.string().optional().nullable(),
  distanceToCenter: z.string().optional().nullable(),
});
