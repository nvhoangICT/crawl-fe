import { PaginationCustom } from "@/components/common/PaginationCustom";
import { ListHotel } from "@/components/pages/hotel-management/ListHotel";
import { UpdateService } from "@/components/pages/service-management/UpdateService";
import { Button } from "@/components/ui/button";
import { hotelService } from "@/services/hotelService";
import useCommon from "@/store/useCommon";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ServiceManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataRestaurant = async () => {
    setIsLoading(true);
    try {
      const response = await hotelService.getAll({
        pageSize,
        pageNumber,
      });
      setRestaurants(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu khách sạn!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataRestaurant();
  }, [pageNumber, pageSize, isRefresh]);

  const service = {
    hinh_anh: "https://res.klook.com/image/upload/activities/lyvffvohz0vqu2btol1f.webp",
    ten_dich_vu: "La Spa 38, Trải Nghiệm Gội Đầu và Massage tại Hà Nội",
    mo_ta_ngan: "",
    mo_ta_chi_tiet: "",
    dia_diem: [
      {
        ten: "La Spa 38, Nourishing Shampoo & Massage",
        dia_chi: "38 P. Hàng Hòm, Hoàn Kiếm, Hà Nội",
      },
      {
        ten: "La Spa 16, Nourishing Shampoo & Massage",
        dia_chi: "16 Lý Quốc Sư, Hoàn Kiếm, Hà Nội",
      },
    ],
    diem_danh_gia: "4.1/5",
    so_luong_danh_gia: "72 đánh giá",
    gia_khoi_diem: "131250",
    gia_goc: "143000",
    gio_hoat_dong: [
      {
        ten: "La Spa 38",
        lich: "Thứ Hai - Chủ Nhật: 09:00 - 23:00 (Lượt vào công cuối: 22:00)",
      },
      {
        ten: "Lịch khả dụng",
        lich: "Thứ Hai - Chủ Nhật: 09:00 - 22:00 (Đặt lịch trước ít nhất 3 giờ)",
      },
    ],
    co_so_vat_chat: ["phong_tam", "wifi", "tra_thao_moc", "dep_di_trong_nha"],
    danh_muc: ["Spa & Massage"],
    tinh_nang_dac_biet: "",
    dich_vu: [
      {
        loai_dich_vu: "Hair Shampoo & Head Massage (30 mins)",
        gia_khoi_diem: "173250",
        gia_goc: "217800",
        gia_chi_tiet: {
          gia_trong_tuan: null,
          gia_cuoi_tuan: null,
          gia_tre_em: null,
          gia_nguoi_lon: null,
        },
      },
      // ... other dich_vu items
    ],
    bao_gom: ["wifi", "tra_thao_moc", "dep_di_trong_nha", "goi_dau", "massage_dau"],
    khong_bao_gom: ["chi_phi_ca_nhan_khac", "tien_tip", "van_chuyen"],
    luu_y_truoc_khi_dat: "",
    chinh_sach_huy: "",
    huong_dan_su_dung: "",
    ngon_ngu: null,
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Danh sách khách sạn</div>

        <Button onClick={() => setOpen(true)}>
          {service ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
        </Button>
      </div>
      <div className="p-4">
        <UpdateService service={service} open={open} onClose={()=>setOpen(false)} />
      </div>
      <ListHotel data={restaurants} isLoading={isLoading} limit={pageSize} />

      <div className="flex justify-center mt-4">
        <PaginationCustom
          page={pageNumber + 1}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPageNumber(0);
          }}
          onPageChange={(page) => setPageNumber(page - 1)}
          rowsPerPageOptions={[15, 30, 50]}
        />
      </div>
    </>
  );
};

export default ServiceManagementPage;
