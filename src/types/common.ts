export interface SelectItemType {
  value: string | number;
  label: string;
}
export interface PaginationType {
  pageNumber: number;
  pageSize: number;
  sort?: string;
  order?: string;
}
export enum ACTION_DATA {
  "UPDATE",
  "VIEW"
}
