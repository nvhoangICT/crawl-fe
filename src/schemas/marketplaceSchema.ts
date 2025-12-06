import * as z from "zod"

export const marketplaceSchema = z.object({
  name: z.string().min(1, "Tên nhà hàng là bắt buộc"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  province: z.string().min(1, "Tỉnh/Thành phố là bắt buộc"),
  phone: z.string().nullable(),
  mobilePhone: z.string().nullable(),
  email: z.string().email("Email không hợp lệ").nullable(),
  website: z.string().url("Website không hợp lệ").nullable(),
  imageUrl: z.string().url("URL ảnh không hợp lệ").nullable(),
  detailLink: z.string().url("Link chi tiết không hợp lệ").nullable(),
})

export type MarketplaceData = z.infer<typeof marketplaceSchema>
