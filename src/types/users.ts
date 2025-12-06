export interface CustomerInfo {
  id?: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  interestContent?: string;
  note?: string;
  sentDate: string;
  customerStatus: "CONTACTED" | "NOT_CONTACTED";
}
export interface TypeSelectMulti {
  label: string;
  value: number;
}
export interface UsersSearch {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  date?: { from?: string; to?: string };
  customerStatus?: "ALL" | "CONTACTED" | "NOT_CONTACTED" | "";
  interestContent?: TypeSelectMulti[];
}
export interface CustomerPropsSearch {
  fullName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  customerStatus?: string | null;
  interestContent?: string | null;
}
