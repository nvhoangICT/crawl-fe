import { SelectItemType } from "@/types/common";

export const PERMISSIONS = {
  MANAGE_CUSTOMERS: "MANAGE_CUSTOMERS",
  MANAGE_MEDIA: "MANAGE_MEDIA",
  MANAGE_NEWS: "MANAGE_NEWS",
  MANAGE_RECRUITMENT: "MANAGE_RECRUITMENT",
  MANAGE_PRODUCT: "MANAGE_PRODUCT",
  ADMIN: "ADMIN",
  MANAGE_SOLUTION: "MANAGE_SOLUTION",
  MANAGE_CASE_STUDY: "MANAGE_CASE_STUDY",
} as const;
export const PERMISSIONS_OPTIONS: SelectItemType[] = [
  {
    label: "Quản lý khách hàng",
    value: "MANAGE_CUSTOMERS",
  },
  {
    label: "Quản lý media",
    value: "MANAGE_MEDIA",
  },
  {
    label: "Quản lý tin tức",
    value: "MANAGE_NEWS",
  },
  {
    label: "Quản lý tuyển dụng",
    value: "MANAGE_RECRUITMENT",
  },
  {
    label: "Quản lí giải pháp - dịch vụ",
    value: "MANAGE_SOLUTION",
  },
  {
    label: "Quản lý case study",
    value: "MANAGE_CASE_STUDY",
  },
];
