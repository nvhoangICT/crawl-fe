import {CarRentalType} from "@/types/rental.ts";

export const carsData: CarRentalType[] = [
    {
        id: "car-1",
        ten_xe: "TOYOTA VIOS 2021",
        thumbnail: "/placeholder.svg?height=200&width=300",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
        ],
        truyen_dong: "Số tự động",
        so_ghe: "5 chỗ",
        nhien_lieu: "Xăng",
        tieu_hao_nhien_lieu: "6L/100km",
        quang_duong_1_lan_sac: "300km",
        mo_ta: "TOYOTA VIOS E 2021, Xe Vios 5 chổ, sạch sẽ, mát mẻ có rèm che nắng.",
        tien_nghi: [
            "bản đồ",
            "bluetooth",
            "camera 360 độ"
        ],
        loai: "xe tự lái",
        dieu_khoan: [
            "Quý khách vui lòng không hút thuốc trên xe hoặc mang các thực phẩm có mùi"
        ],
        gia: 491200,
        phi_dua_don: "Miễn phí",
        phi_bao_hiem: 11000,
        dia_diem_giao_nhan_xe: "Quận Hai Bà Trưng",
        nhan_xe: "2025-08-06T08:00:00",
        tra_xe: "2025-08-06T10:00:00",
        diem_don: "Tân Sơn Nhất",
        thoi_gian_thue_xe: "2 giờ",
        ho_tro_dua_don: {
            ho_tro_dua_don_trong_vong: "20km",
            khoang_cach_mien_phi: "10km",
            phi_dua_don: "10K/km"
        },
        lo_trinh: [
            "Nội thành",
            "Liên tỉnh",
            "Liên tỉnh 1 chiều"
        ],
        bao_hiem_bo_sung: {
            mo_ta: "Trường hợp xảy ra sự cố ngoài ý muốn, tài xế & người ngồi trên xe được bảo hiểm với giá trị tối đa 300.000.000 VNĐ/người."
        },
        chinh_sach_huy_chuyen: [
            {
                thoi_diem_huy: "Trong vòng 1h sau giữ chỗ",
                phi_huy_chuyen: "Miễn phí"
            },
            {
                thoi_diem_huy: "Trước chuyến đi >7 ngày(Sau 1h Giữ Chỗ)",
                phi_huy_chuyen: "10% giá trị chuyến đi"
            },
            {
                thoi_diem_huy: "Trong vòng 7 ngày trước chuyến đi(Sau 1h Giữ Chỗ)",
                phi_huy_chuyen: "40% giá trị chuyến đi"
            }
        ],
        giay_to_thue_xe: [
            "GPLX (đối chiếu) & Passport (giữ lại)",
            "GPLX (đối chiếu) & CCCD (đối chiếu VNeID)"
        ],
        tai_san_the_chap: [
            "Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy"
        ],
        danh_gia: [
            {
                nguoi_danh_gia: "Mai",
                thoi_gian_danh_gia: "2025-08-02",
                so_sao: "5 sao",
                noi_dung: "Khách vui vẻ, thân thiện"
            }
        ],
        chu_xe: {
            ten: "Cường",
            ti_le_phan_hoi: "100%",
            thoi_gian_phan_hoi: "5 phút",
            ti_le_dong_y: "66%",
            so_sao: "4.3 sao",
            so_chuyen: "15 chuyến",
            avatar: "/placeholder.svg?height=64&width=64"
        },
        phu_phi_co_the_phat_sinh: [
            {
                ten: "Phí vượt giới hạn",
                mo_ta: "Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 350km khi thuê xe 1 ngày",
                gia: "3000đ/km"
            },
            {
                ten: "Phí quá giờ",
                mo_ta: "Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá 5 giờ, phụ phí thêm 1 ngày thuê",
                gia: "70.000đ /giờ"
            },
            {
                ten: "Phí vệ sinh",
                mo_ta: "Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh (nhiều vết bẩn, bùn cát, sình lầy...)",
                gia: "70.000đ"
            },
            {
                ten: "Phí khử mùi",
                mo_ta: "Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi thuốc lá, thực phẩm nặng mùi...)",
                gia: "500.000đ"
            }
        ],
        vi_tri_xe: "Thanh Pho Ha Noi",
        thong_tin_lo_trinh: {
            so_km_toi_da: "50km",
            phi_phu_thu_vuot_50km: "8000đ/km",
            phi_phu_thu_vuot_2_gio: "80000đ/giờ"
        }
    },
    {
        id: "car-2",
        ten_xe: "HONDA CIVIC 2023",
        thumbnail: "/placeholder.svg?height=200&width=300",
        images: [
            "/placeholder.svg?height=400&width=600",
            "/placeholder.svg?height=400&width=600"
        ],
        truyen_dong: "Số tự động",
        so_ghe: "5 chỗ",
        nhien_lieu: "Xăng",
        tieu_hao_nhien_lieu: "7L/100km",
        mo_ta: "HONDA CIVIC 2023, xe mới, tiện nghi, phù hợp đi công tác hoặc du lịch gia đình.",
        tien_nghi: [
            "bản đồ",
            "bluetooth",
            "camera lùi",
            "cảm biến va chạm"
        ],
        loai: "xe có người lái",
        dieu_khoan: [
            "Không ăn uống trên xe",
            "Không hút thuốc"
        ],
        gia: 850000,
        phi_dua_don: "Miễn phí",
        phi_bao_hiem: 15000,
        dia_diem_giao_nhan_xe: "",
        nhan_xe: "2025-08-07T09:00:00",
        tra_xe: "2025-08-07T17:00:00",
        diem_don: "Sân bay Nội Bài",
        thoi_gian_thue_xe: "8 giờ",
        ho_tro_dua_don: {
            ho_tro_dua_don_trong_vong: "30km",
            khoang_cach_mien_phi: "15km",
            phi_dua_don: "12K/km"
        },
        lo_trinh: [
            "Nội thành",
            "Liên tỉnh"
        ],
        bao_hiem_bo_sung: {
            mo_ta: "Bảo hiểm hành khách và tài xế lên đến 500.000.000 VNĐ/người."
        },
        chinh_sach_huy_chuyen: [
            {
                thoi_diem_huy: "Trong vòng 1h sau giữ chỗ",
                phi_huy_chuyen: "Miễn phí"
            },
            {
                thoi_diem_huy: "Trước chuyến đi >3 ngày",
                phi_huy_chuyen: "20% giá trị chuyến đi"
            }
        ],
        giay_to_thue_xe: [],
        tai_san_the_chap: [],
        danh_gia: [
            {
                nguoi_danh_gia: "Minh",
                thoi_gian_danh_gia: "2025-07-20",
                so_sao: "5 sao",
                noi_dung: "Tài xế nhiệt tình, xe sạch sẽ."
            }
        ],
        chu_xe: {
            ten: "An",
            ti_le_phan_hoi: "95%",
            thoi_gian_phan_hoi: "10 phút",
            ti_le_dong_y: "80%",
            so_sao: "4.8 sao",
            so_chuyen: "50 chuyến",
            avatar: "/placeholder.svg?height=64&width=64"
        },
        phu_phi_co_the_phat_sinh: [],
        vi_tri_xe: "Thanh Pho Ho Chi Minh",
        thong_tin_lo_trinh: {
            so_km_toi_da: "100km",
            phi_phu_thu_vuot_50km: "10000đ/km",
            phi_phu_thu_vuot_2_gio: "100000đ/giờ"
        }
    }
]