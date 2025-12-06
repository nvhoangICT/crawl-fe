export interface Province {
  id: string;
  provinceId: string;
  provinceName: string;
  code: string;
}
export interface District {
  id: string;
  districtId: string;
  provinceId: string;
  districtName: string;
  code: string;
}
export interface Commune {
  id: string;
  districtId: string;
  communeId: string;
  communeName: string;
  code: string;
}
