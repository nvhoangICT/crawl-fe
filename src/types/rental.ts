export interface CarRentalType {
    id: string
    ten_xe: string;
    thumbnail: string;
    images: string[];
    truyen_dong: string;
    so_ghe: string;
    nhien_lieu: string;
    tieu_hao_nhien_lieu: string;
    quang_duong_1_lan_sac?: string; // Optional
    mo_ta: string;
    tien_nghi: string[];
    loai: "xe tự lái" | "xe có người lái";
    dieu_khoan: string[];
    gia: number;
    phi_dua_don: string;
    phi_bao_hiem: number;
    dia_diem_giao_nhan_xe: string;
    nhan_xe: string;
    tra_xe: string;
    diem_don: string;
    thoi_gian_thue_xe: string;
    ho_tro_dua_don: {
        ho_tro_dua_don_trong_vong: string;
        khoang_cach_mien_phi: string;
        phi_dua_don: string;
    };
    lo_trinh: string[];
    bao_hiem_bo_sung: {
        mo_ta: string;
    };
    chinh_sach_huy_chuyen: {
        thoi_diem_huy: string;
        phi_huy_chuyen: string;
    }[];
    giay_to_thue_xe: string[];
    tai_san_the_chap: string[];
    danh_gia: {
        nguoi_danh_gia: string;
        thoi_gian_danh_gia: string;
        so_sao: string;
        noi_dung: string;
    }[];
    chu_xe: {
        ten: string;
        ti_le_phan_hoi: string;
        thoi_gian_phan_hoi: string;
        ti_le_dong_y: string;
        so_sao: string;
        so_chuyen: string;
        avatar: string;
    };
    phu_phi_co_the_phat_sinh: {
        ten: string;
        mo_ta: string;
        gia: string;
    }[];
    vi_tri_xe: string;
    thong_tin_lo_trinh?: { // Optional for self-driving cars
        so_km_toi_da: string;
        phi_phu_thu_vuot_50km: string;
        phi_phu_thu_vuot_2_gio: string;
    };
}

export interface MotorcycleRentalType {
    id: string;
    loai_xe: string;
    hang_xe: string[];
    doi_xe: string;
    danh_gia: number;
    tien_ich: string[];
    gia: number;
    nhan_tra_xe: string[];
    giao_xe_tan_noi: {
        thoi_gian: string;
        dieu_kien: string;
        ban_kinh: string;
        dia_diem: string[];
    };
    coc_giu_xe: string;
    pham_vi_di_chuyen: string;
    thu_tuc_nhan_xe: string[];
    quy_dinh_thoi_gian_thue: string;
    chinh_sach_huy_thue: string[];
    thumbnail?: string;
    images : string[];
}

// type Day = 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'CN';

export interface TravellingCarBookingType {
    id: string;
    ten: string;
    loai_dich_vu: 'Dua don 1 chieu' | string;
    loai_xe: string;
    hang_xe: string[];
    cho_toi_da: string;
    khoi_hanh: string;
    diem_den: string;
    ngay_trong_tuan: string; // More strongly typed
    don_tai: string[];
    gio_don: string;
    tra_tai: string[];
    gia: string;
    gia_bao_gom: string[];
    gia_khong_bao_gom: string[];
    phu_thu: string;
    thumbnail?: string;
    images : string[];
}
