export interface RestaurantFormData {
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
  score: number | null; 
  crawledAt?: string; 
  createdAt?: string; 
  updatedAt?: string;
}