// types/hotel.ts
interface Image {
  url: string;
  alt: string;
}

interface Package {
  name: string;
  price: string;
  priceDescription: string;
  isBestPrice: boolean;
  benefits: string[];
  notes: string[];
  bookingName: string;
}

interface Room {
  name: string;
  image: Image;
  packages: Package[];
}

export interface Hotel {
  id: string;
  name: string; // Maps to ten_khach_san
  accommodationType: string;
  rating: string;
  address: string; // Maps to thanh_pho_khu_vuc
  province: string; // Maps to vung_tinh
  country: string; // Maps to quoc_gia
  phone: string; // Maps to so_dien_thoai_khach_san
  mobilePhone: string;
  fax?: string;
  email: string;
  website?: string;
  roomCount: number;
  rooms: Room[];
  price: string;
  imageUrl: string; // Maps to anh_dai_dien_khach_san
  detailLink: string;
  services: string;
  images: Image[];
  scores: string;
  ratingLocation: number;
  ratingValue: number;
  ratingComfort: number;
  ratingFacilities: number;
  ratingStaff: number;
  ratingCleanliness: number;
  description: string;
  distanceToCenter: string;
}