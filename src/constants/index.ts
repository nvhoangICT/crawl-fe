import FlagEn from "@/assets/icon/FlagEn";
import FlagVn from "@/assets/icon/FlagVi";
import { SelectItemType } from "@/types/common";

export const LOGO_URL =
  "/images/logo-travel.png";
export const MAX_DIGITS = 20;
export const regexPhoneNumber = /^(\+84|0)(3|5|7|8|9)\d{8}$/;
export const specialCharRegex =
  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s0-9]+$/;
export const specialCharRegexNoNumber =
  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/;

export const EMPTY_PARAGRAPH_REGEX =
  /^(<p>\s*(?:(?:<br\s*\/?>|&nbsp;|\s+)*)\s*<\/p>)+$/;

export const PAGE_ITEMS: SelectItemType[] = [
  // { value: "17e2be59-310b-42bd-b80d-c2e77472ea8a", label: "404 và 500" },
  // { value: "26dbc8c0-49f0-482e-a665-784340857d77", label: "Case study" },
  // { value: "2ba1e86b-03ae-46ad-8819-918d5146943f", label: "Tuyển dụng" },
  // { value: "39e1c4ec-81ac-4583-8384-95bafc5c037b", label: "Giá trị cốt lõi" },
  // { value: "3ab2fa5d-6863-4762-8c93-c32cbdf9c5c2", label: "Chi tiết bài viết Case study, Tin tức" },
  {
    value: "50d0ef80-2293-426d-a1a5-ed7248d824ab",
    label: "Dịch vụ - Giải pháp",
  },
  { value: "74b60e97-9a38-4557-9395-f30e61aa7fe3", label: "Về chúng tôi" },
  // { value: "91431285-9944-46bf-868e-5ba2cccc77a8", label: "Liên hệ" },
  // { value: "baeb80cc-fa29-4f81-82f7-1463785814e2", label: "Sản phẩm" },
  { value: "cd5877dd-8a23-4cae-92b5-b4d6c3b0fa54", label: "Trang chủ" },
  // { value: "d9b351cc-aeb8-4565-9cb2-b5fd8e35e331", label: "Chatbot" },
];

export const LANGUAGE_TYPES = [
  {
    value: "VI",
    label: "Tiếng Việt",
    icon: FlagVn,
  },
  {
    value: "EN",
    label: "Tiếng Anh",
    icon: FlagEn,
  },
];
