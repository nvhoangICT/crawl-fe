export interface TrainTicket {
  id: string;
  url?: string;
  route?: string;
  averagePrice?: number;
  distance?: number;
  frequency?: number;
  score?: number;
  count?: number;
  legend?: string;
  schedule?: {
    trainUrl?: string;
    totalTime?: string;
    arrivalTime?: string;
    trainNumber?: string;
    departureTime?: string;
  }[];
  prices?: {
    prices?: {
      code?: string;
      price?: number;
      seatType?: string;
    }[];
    trainName?: string;
  }[];
  contact?: {
    type?: string;
    value?: string;
    description?: string;
  }[];
  crawledAt?: string;
  rating?: {
    count?: string;
    score?: string;
    legend?: string;
  };
  createdAt?: string;
  updatedAt?: string | null;
}