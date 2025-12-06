import {
  Building2,
  Bus,
  Car,
  Download,
  Gamepad2,
  Landmark,
  LayoutDashboard,
  LucideIcon,
  MoreHorizontal,
  Store,
  Train,
  UtensilsCrossed,
  WandSparkles,
} from "lucide-react";

export interface MenuItem {
  name: string;
  url?: string;
  icon?: LucideIcon;
  permissions?: string[];
  items?: MenuItem[];
}

export const menu: MenuItem[] = [
  { name: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { name: "Crawl dữ liệu", url: "/admin/crawl", icon: Download },
  { name: "Khách sạn", url: "/admin/hotel-management", icon: Building2 },
  {
    name: "Nhà hàng",
    url: "/admin/restaurant-management",
    icon: UtensilsCrossed,
  },
  // { name: "Khu vui chơi", url: "/admin/entertainment-management", icon: Gamepad2 },
  // { name: "Dịch vụ", url: "/admin/service-management", icon: Ticket},
  { name: "Vé xe", url: "/admin/bus-management", icon: Bus },
  { name: "Vé tàu", url: "/admin/train-ticket-management", icon: Train },
  { name: "Cửa hàng", url: "/admin/marketplace-management", icon: Store },
  { name: "Spa", url: "/admin/spa-management", icon: WandSparkles },
  {
    name: "Địa điểm tham quan",
    url: "/admin/landmark-management",
    icon: Landmark,
  },
  {
    name: "Thuê xe",
    url: "/admin/rental-management",
    icon: Car,
    items: [
      {
        name: "Thuê xe máy",
        url: "/admin/rental-management/motorcycle",
        icon: Car,
      },
      { name: "Thuê xe ô tô", url: "/admin/rental-management/car", icon: Car },
      {
        name: "Đặt du lịch",
        url: "/admin/rental-management/traveling-car",
        icon: Car,
      },
      {
        name: "Đặt xe đưa đón sân bay",
        url: "/admin/rental-management/airport-transfer",
        icon: Car,
      },
    ],
  },
  {
    name: "Khu vui chơi",
    url: "/admin/attraction-management",
    icon: Gamepad2,
  },
  { name: "Khác", url: "/admin/others-management", icon: MoreHorizontal },
];

export const getMenu = (currentPermissions: string[] = []): MenuItem[] => {
  return menu;
  return menu.filter((item) =>
    item.permissions?.some((permission) =>
      currentPermissions.includes(permission)
    )
  );
};
