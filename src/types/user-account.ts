export interface UserAccount {
  id?: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  role: string;
  gender: string;
  birthday: string;
  province: string;
  permissions: string[];
  enabled: boolean;
  accountNonLocked: boolean;
  authorities: string[];
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

export interface UserAccountPayloadCreate {
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  active: boolean;
  gender: string;
  birthday: string;
  province: string;
  permissions: string[];
}

export interface UserAccountPayloadUpdate extends UserAccountPayloadCreate {
  userId: string;
}
