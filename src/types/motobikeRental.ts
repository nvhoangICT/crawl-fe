type Vehicle = {
  image: string;
  price: string;
  rating: string;
  delivery: string;
  imageAlt: string;
  location: string;
  provider: string;
  detailLink: string;
  holidayNote: string;
  pricePerDay: string;
  vehicleType: string;
  availability: string;
  holidayPrice: string;
  vehicleModels: string[];
};

export type MotobikeRental = {
  id: string;
  location: string;
  detailLink: string;
  image: string;
  imageAlt: string;
  delivery: string | null;
  vehicleType: string | null;
  provider: string | null;
  rating: number | null;
  vehicleModels: string[];
  availability: string | null;
  pricePerDay: string | null;
  price: string;
  holidayPrice: string | null;
  holidayNote: string | null;
  vehicles: Vehicle[];
  crawledAt: string;
  createdAt: string;
  updatedAt: string;
};
