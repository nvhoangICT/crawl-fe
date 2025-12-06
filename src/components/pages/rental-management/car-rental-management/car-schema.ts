import { z } from 'zod';

// Schemas cho các đối tượng lồng nhau
const HoTroDuaDonSchema = z.object({
    ho_tro_dua_don_trong_vong: z.string().min(1, "Không được để trống"),
    khoang_cach_mien_phi: z.string().min(1, "Không được để trống"),
    phi_dua_don: z.string().min(1, "Không được để trống"),
});

const BaoHiemBoSungSchema = z.object({
    mo_ta: z.string().min(1, "Không được để trống"),
});

const ChinhSachHuyChuyenItemSchema = z.object({
    thoi_diem_huy: z.string().min(1, "Không được để trống"),
    phi_huy_chuyen: z.string().min(1, "Không được để trống"),
});

const DanhGiaItemSchema = z.object({
    nguoi_danh_gia: z.string().min(1, "Không được để trống"),
    thoi_gian_danh_gia: z.string().min(1, "Không được để trống"),
    so_sao: z.string().min(1, "Không được để trống"),
    noi_dung: z.string().min(1, "Không được để trống"),
});

const ChuXeSchema = z.object({
    ten: z.string().min(1, "Không được để trống"),
    ti_le_phan_hoi: z.string().min(1, "Không được để trống"),
    thoi_gian_phan_hoi: z.string().min(1, "Không được để trống"),
    ti_le_dong_y: z.string().min(1, "Không được để trống"),
    so_sao: z.string().min(1, "Không được để trống"),
    so_chuyen: z.string().min(1, "Không được để trống"),
    avatar: z.string().url("URL avatar không hợp lệ").or(z.literal("")).optional(),
});

const PhuPhiCoThePhatSinhItemSchema = z.object({
    ten: z.string().min(1, "Không được để trống"),
    mo_ta: z.string().min(1, "Không được để trống"),
    gia: z.string().min(1, "Không được để trống"),
});

const ThongTinLoTrinhSchema = z.object({
    so_km_toi_da: z.string().min(1, "Không được để trống"),
    phi_phu_thu_vuot_50km: z.string().min(1, "Không được để trống"),
    phi_phu_thu_vuot_2_gio: z.string().min(1, "Không được để trống"),
});

// Schema chính cho CarData
export const CarSchema = z.object({
    id: z.string().min(1, "ID không được để trống"),
    ten_xe: z.string().min(1, "Tên xe không được để trống"),
    thumnail: z.string().url("URL thumbnail không hợp lệ").or(z.literal("")).optional(),
    images: z.array(z.string().url("URL ảnh không hợp lệ").or(z.literal(""))).optional(),
    truyen_dong: z.string().min(1, "Truyền động không được để trống"),
    so_ghe: z.string().min(1, "Số ghế không được để trống"),
    nhien_lieu: z.string().min(1, "Nhiên liệu không được để trống"),
    tieu_hao_nhien_lieu: z.string().min(1, "Tiêu hao nhiên liệu không được để trống"),
    quang_duong_1_lan_sac: z.string().optional(),
    mo_ta: z.string().min(1, "Mô tả không được để trống"),
    tien_nghi: z.array(z.string().min(1, "Tiện nghi không được để trống")).optional(),
    loai: z.union([z.literal("xe tự lái"), z.literal("xe có người lái")]),
    dieu_khoan: z.array(z.string().min(1, "Điều khoản không được để trống")).optional(),
    gia: z.number().min(0, "Giá phải là số dương"),
    thoi_gian_thue_xe : z.string().min(1, "Thời gian thuê xe không được để trống"),
    phi_dua_don: z.string().min(1, "Phí đưa đón không được để trống"),
    phi_bao_hiem: z.number().min(0, "Phí bảo hiểm phải là số dương"),
    nhan_xe: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Thời gian nhận xe không hợp lệ",
    }),
    tra_xe: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Thời gian trả xe không hợp lệ",
    }),
    ho_tro_dua_don: HoTroDuaDonSchema,
    lo_trinh: z.array(z.string().min(1, "Lộ trình không được để trống")).optional(),
    bao_hiem_bo_sung: BaoHiemBoSungSchema,
    chinh_sach_huy_chuyen: z.array(ChinhSachHuyChuyenItemSchema).optional(),
    danh_gia: z.array(DanhGiaItemSchema).optional(),
    chu_xe: ChuXeSchema,
    vi_tri_xe: z.string().min(1, "Vị trí xe không được để trống"),

    // Các trường có điều kiện, được đặt là optional ở cấp độ cơ bản
    dia_diem_giao_nhan_xe: z.string().optional(),
    diem_don: z.string().optional(),
    phu_phi_co_the_phat_sinh: z.array(PhuPhiCoThePhatSinhItemSchema).optional(),
    giay_to_thue_xe: z.array(z.string()).optional(),
    tai_san_the_chap: z.array(z.string()).optional(),
    thong_tin_lo_trinh: ThongTinLoTrinhSchema.optional(),
})
    .superRefine((data, ctx) => {
        if (data.loai === "xe tự lái") {
            // Yêu cầu cho "xe tự lái"
            if (!data.dia_diem_giao_nhan_xe || data.dia_diem_giao_nhan_xe.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Địa điểm giao nhận xe không được để trống cho xe tự lái",
                    path: ["dia_diem_giao_nhan_xe"],
                });
            }
            // Không được có cho "xe tự lái"
            if (data.diem_don && data.diem_don.trim() !== "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Điểm đón không được có cho xe tự lái",
                    path: ["diem_don"],
                });
            }
            if (data.thong_tin_lo_trinh !== undefined && data.thong_tin_lo_trinh !== null) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Thông tin lộ trình không được có cho xe tự lái",
                    path: ["thong_tin_lo_trinh"],
                });
            }
        } else { // xe có người lái
            // Yêu cầu cho "xe có người lái"
            if (!data.diem_don || data.diem_don.trim() === "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Điểm đón không được để trống cho xe có người lái",
                    path: ["diem_don"],
                });
            }
            if (!data.thong_tin_lo_trinh) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Thông tin lộ trình không được để trống cho xe có người lái",
                    path: ["thong_tin_lo_trinh"],
                });
            } else {
                // Xác thực schema lồng nhau nếu nó tồn tại và được yêu cầu
                const parsedThongTinLoTrinh = ThongTinLoTrinhSchema.safeParse(data.thong_tin_lo_trinh);
                if (!parsedThongTinLoTrinh.success) {
                    parsedThongTinLoTrinh.error.issues.forEach(issue => {
                        ctx.addIssue({
                            ...issue,
                            path: ["thong_tin_lo_trinh", ...issue.path],
                        });
                    });
                }
            }
            // Không được có cho "xe có người lái"
            if (data.dia_diem_giao_nhan_xe && data.dia_diem_giao_nhan_xe.trim() !== "") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Địa điểm giao nhận xe không được có cho xe có người lái",
                    path: ["dia_diem_giao_nhan_xe"],
                });
            }
            if (data.phu_phi_co_the_phat_sinh && data.phu_phi_co_the_phat_sinh.length > 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Phụ phí có thể phát sinh không được có cho xe có người lái",
                    path: ["phu_phi_co_the_phat_sinh"],
                });
            }
            if (data.giay_to_thue_xe && data.giay_to_thue_xe.length > 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Giấy tờ thuê xe không được có cho xe có người lái",
                    path: ["giay_to_thue_xe"],
                });
            }
            if (data.tai_san_the_chap && data.tai_san_the_chap.length > 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Tài sản thế chấp không được có cho xe có người lái",
                    path: ["tai_san_the_chap"],
                });
            }
        }
    });

export type CarFormData = z.infer<typeof CarSchema>;
