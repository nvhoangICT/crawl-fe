export type TourBusType = {
  id: string;
  title: string;
  routeUrl: string;
  detailLink: string;
  image: string;
  imageAlt: string;
  vehicleType: string;
  serviceType: string;
  maxPassengers: string; // ví dụ: "Chở tối đa 4 khách"
  departure: string;
  destination: string;
  price: string; // ví dụ: "1.300.000đ"
  vatNote: string; // ví dụ: "(Chưa bao gồm VAT)"
};
