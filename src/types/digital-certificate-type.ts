export interface DigitalCertificateTypeData {
  id: string;
  name: string;
  shortName?: string;
  createdAt: string;
  description?: string;
}

export interface DigitalCertificateTypeCreateOrUpdate {
  name: string;
  shortName?: string;
  description?: string;
}
