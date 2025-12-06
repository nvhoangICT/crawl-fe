export interface PositionData {
  id: string;
  positionName: string;
  status: boolean;
  updatedAt: string;
  description: string;
}

export interface PositionCreateOrUpdate {
  positionName: string;
  status: boolean;
  description: string;
}
