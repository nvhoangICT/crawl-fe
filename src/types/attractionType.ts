export type AttractionType = {
  id: string;
  name: string;
  address: string;
  province: string;
  phone: string | null;
  mobilePhone: string | null;
  email: string | null;
  website: string | null;
  imageUrl: string | null;
  detailLink: string | null;
  price: number | null;
  discount: number | null;
  packageName: string | null;
  description: string | null;
  info: string | null;
  images: string;
  score: number | null;
  review: string | null;
  crawledAt: string; // ISO Date string
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
};
