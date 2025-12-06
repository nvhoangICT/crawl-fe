import * as z from "zod";

const ContactSchema = z.object({
  type: z.string().optional(),
  value: z.string().optional(),
  description: z.string().optional(),
});

const PriceItemSchema = z.object({
  code: z.string().optional(),
  price: z.number().optional(),
  seatType: z.string().optional(),
});

const PriceSchema = z.object({
  prices: z.array(PriceItemSchema).optional(),
  trainName: z.string().optional(),
});
const ScheduleSchema = z.object({
  trainUrl: z.string().url({ message: "URL tàu không hợp lệ" }).optional(),
  totalTime: z.string().optional(),
  arrivalTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Giờ đến phải có định dạng HH:mm",
    })
    .optional(),
  trainNumber: z.string().optional(),
  departureTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Giờ khởi hành phải có định dạng HH:mm",
    })
    .optional(),
});

const RatingSchema = z.object({
  count: z.string().optional(),
  score: z.string().optional(),
  legend: z.string().optional(),
});

export const trainTicketSchema = z.object({
  url: z.string().url({ message: "URL không hợp lệ" }).optional(),
  route: z.string().optional(),
  averagePrice: z.number().optional(),
  distance: z.number().optional(),
  frequency: z.number().optional(),
  score: z.number().min(0).max(5, { message: "Điểm số phải từ 0 đến 5" }).optional(),
  count: z.number().optional(),
  legend: z.string().optional(),
  schedule: z.array(ScheduleSchema).optional(),
  prices: z.array(PriceSchema).optional(),
  contact: z.array(ContactSchema).optional(),
  rating: RatingSchema.optional(),
});