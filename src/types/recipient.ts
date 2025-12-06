export interface Recipient {
  id: string;
  fullName: string;
  identityNumber: string;
  dateOfIssue: string;
  placeOfIssue: string;
  status: boolean;
  phoneNumber: string;
  officialElectronicAddress: string;
  positionId: string;
  workUnitId: string;
  provinceId: string;
  districtId: string;
  communeId: string;
  specificAddress: string;
  createdAt: string;
}

export interface RecipientCreateOrUpdate {
  fullName: string;
  identityNumber: string;
  dateOfIssue: string;
  placeOfIssue: string;
  officialElectronicAddress: string;
  specificAddress: string;
  phoneNumber: string;
  positionId: string;
  workUnitId: string;
  provinceId: string;
  districtId: string;
  communeId: string;
  status: boolean;
}

export interface RecipientDetail {
  id: string;
  fullName: string;
  identityNumber: string;
  dateOfIssue: string;
  placeOfIssue: string;
  status: boolean;
  phoneNumber: string;
  officialElectronicAddress: string;
  positionId: string;
  workUnitId: string;
  provinceId: string;
  districtId: string;
  communeId: string;
  specificAddress: string;
  createdAt: string;
}
