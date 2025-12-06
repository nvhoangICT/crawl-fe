export interface Bus {
  id: string; // Optional for creation, required for updates
  sourceUrl: string;
  providerName: string;
  providerUrl: string;
  timeRange: string;
  departure: string;
  destination: string;
  price: string;
}