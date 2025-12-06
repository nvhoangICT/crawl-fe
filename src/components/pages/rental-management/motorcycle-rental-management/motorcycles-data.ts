import {MotorcycleRentalType} from "@/types/rental.ts";

export const motorcyclesData: MotorcycleRentalType[] = [
    {
        id: '1',
        loai_xe: 'Xe tay ga 125cc',
        hang_xe: ['Honda Airblade', 'Honda Vision', 'Yamaha Janus'],
        doi_xe: '2019-2024',
        danh_gia: 4.9,
        tien_ich: ['Mũ bảo hiểm', 'Xăng (1l)', 'Giao xe tận nơi'],
        gia: 160000,
        nhan_tra_xe: [
            '6B Trần Phú, Lộc Thọ, Nha Trang (5h30-21h)',
            '100 Phùng Hưng, Phước Trung, Nha Trang (5h30-21h)'
        ],
        giao_xe_tan_noi: {
            thoi_gian: '5h30-21h',
            dieu_kien: 'Khi thuê từ 2 ngày',
            ban_kinh: '5km từ nhà xe',
            dia_diem: [
                'Bến xe liên tỉnh Đà Lạt',
                'Văn phòng nhà xe: An Anh Limousine, Tiến Oanh, Phong Phú, Điền Linh, Đà Lạt ơi, Long Vân Limousine, Tuấn Tú',
                'Các Khu quy hoạch Ngô Quyền, Phạm Hồng Thái, Cao Bá Quát',
                'Đường Bùi Thị Xuân'
            ]
        },
        coc_giu_xe: '100.000đ/xe (thanh toán cho Vexere khi xác nhận thuê xe)',
        pham_vi_di_chuyen: 'Trong tỉnh Lâm Đồng',
        thu_tuc_nhan_xe: [
            'CCCD/Passport & GPLX (bản gốc)',
            'Chụp hình CCCD',
            'Làm hợp đồng thuê xe'
        ],
        quy_dinh_thoi_gian_thue: 'Tính 1 ngày thuê xe từ 0h đến 23:59, thuê tối thiểu từ 1 ngày',
        chinh_sach_huy_thue: [
            'Trên 1 ngày (24 tiếng) trước giờ nhận xe: Không mất phí.',
            'Trong vòng 1 ngày (24 tiếng) trước giờ nhận xe: 100% giá trị cọc giữ xe.'
        ],
        thumbnail: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
        images : []
    },
    {
        id: '2',
        loai_xe: 'Xe số 110cc',
        hang_xe: ['Honda Wave', 'Honda Blade', 'Yamaha Sirius'],
        doi_xe: '2018-2023',
        danh_gia: 4.7,
        tien_ich: ['Mũ bảo hiểm', 'Xăng (1l)', 'Giao xe tận nơi'],
        gia: 140000,
        nhan_tra_xe: [
            '6B Trần Phú, Lộc Thọ, Nha Trang (5h30-21h)',
            '100 Phùng Hưng, Phước Trung, Nha Trang (5h30-21h)'
        ],
        giao_xe_tan_noi: {
            thoi_gian: '5h30-21h',
            dieu_kien: 'Khi thuê từ 2 ngày',
            ban_kinh: '5km từ nhà xe',
            dia_diem: [
                'Bến xe liên tỉnh Đà Lạt',
                'Văn phòng nhà xe: An Anh Limousine, Tiến Oanh, Phong Phú',
                'Các Khu quy hoạch Ngô Quyền, Phạm Hồng Thái'
            ]
        },
        coc_giu_xe: '80.000đ/xe (thanh toán cho Vexere khi xác nhận thuê xe)',
        pham_vi_di_chuyen: 'Trong tỉnh Lâm Đồng',
        thu_tuc_nhan_xe: [
            'CCCD/Passport & GPLX (bản gốc)',
            'Chụp hình CCCD',
            'Làm hợp đồng thuê xe'
        ],
        quy_dinh_thoi_gian_thue: 'Tính 1 ngày thuê xe từ 0h đến 23:59, thuê tối thiểu từ 1 ngày',
        chinh_sach_huy_thue: [
            'Trên 1 ngày (24 tiếng) trước giờ nhận xe: Không mất phí.',
            'Trong vòng 1 ngày (24 tiếng) trước giờ nhận xe: 100% giá trị cọc giữ xe.'
        ],
        thumbnail: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg',
        images : []
    },
    {
        id: '3',
        loai_xe: 'Xe tay ga 150cc',
        hang_xe: ['Honda PCX', 'Yamaha NVX', 'Honda SH'],
        doi_xe: '2020-2024',
        danh_gia: 4.8,
        tien_ich: ['Mũ bảo hiểm', 'Xăng (1l)', 'Giao xe tận nơi', 'Áo mưa'],
        gia: 200000,
        nhan_tra_xe: [
            '6B Trần Phú, Lộc Thọ, Nha Trang (5h30-21h)',
            '100 Phùng Hưng, Phước Trung, Nha Trang (5h30-21h)'
        ],
        giao_xe_tan_noi: {
            thoi_gian: '5h30-21h',
            dieu_kien: 'Khi thuê từ 1 ngày',
            ban_kinh: '7km từ nhà xe',
            dia_diem: [
                'Bến xe liên tỉnh Đà Lạt',
                'Văn phòng nhà xe: An Anh Limousine, Tiến Oanh, Phong Phú, Điền Linh',
                'Các Khu quy hoạch Ngô Quyền, Phạm Hồng Thái, Cao Bá Quát',
                'Đường Bùi Thị Xuân',
                'Khu vực trung tâm thành phố'
            ]
        },
        coc_giu_xe: '150.000đ/xe (thanh toán cho Vexere khi xác nhận thuê xe)',
        pham_vi_di_chuyen: 'Trong tỉnh Lâm Đồng',
        thu_tuc_nhan_xe: [
            'CCCD/Passport & GPLX (bản gốc)',
            'Chụp hình CCCD',
            'Làm hợp đồng thuê xe'
        ],
        quy_dinh_thoi_gian_thue: 'Tính 1 ngày thuê xe từ 0h đến 23:59, thuê tối thiểu từ 1 ngày',
        chinh_sach_huy_thue: [
            'Trên 1 ngày (24 tiếng) trước giờ nhận xe: Không mất phí.',
            'Trong vòng 1 ngày (24 tiếng) trước giờ nhận xe: 100% giá trị cọc giữ xe.'
        ],
        thumbnail: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
        images : []
    }
];