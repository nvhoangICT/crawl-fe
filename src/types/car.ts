type CarPhoto = {
  id: string;
  fullUrl: string;
  thumbUrl: string;
  carPhotoId?: string;
};

type ExtraInsurance = {
  type: number;
  name: string;
  desc: string;
  price: number;
  val?: number;
};

export type CarRental = {
  id: string;
  name: string;
  avatar: string;
  seat: number;
  status: number;
  instant: boolean;
  lat: number;
  lon: number;
  street?: string | null;
  locationAddr?: string | null;
  distance?: string | null;
  deliveryEnable: boolean;
  deliveryRadius: number;
  deliveryRadiusFree: number;
  deliveryPrice: number;
  airportDeliveryEnable: boolean;
  photos: CarPhoto[];
  ratingAvg: number;
  totalTrips: number;
  totalReviews: number;
  price: number;
  priceOrigin?: number;
  priceWithFee?: number;
  totalDays?: number;
  totalDiscountPercent?: number;
  availableExtInsurance?: ExtraInsurance[];
};
