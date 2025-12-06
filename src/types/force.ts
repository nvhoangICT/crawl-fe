export interface ForceData {
  id: string;
  forceName: string;
  status: boolean;
  updatedAt: string;
  description: string;
}

export interface ForceCreateOrUpdate {
  forceName: string;
  status: boolean;
  description: string;
}
