CREATE TABLE cars (
    id SERIAL PRIMARY KEY, -- Mã định danh
    name TEXT, -- Tên
    avatar TEXT, -- Ảnh đại diện
    seat SMALLINT, -- Số ghế
    status SMALLINT, -- Trạng thái
    instant BOOLEAN, -- Đặt nhanh
    options_transmission VARCHAR(50), -- Loại hộp số
    options_fuel VARCHAR(50), -- Loại nhiên liệu
    lat DOUBLE PRECISION, -- Vĩ độ
    lon DOUBLE PRECISION, -- Kinh độ
    country_code VARCHAR(10), -- Mã quốc gia
    city_id SMALLINT, -- Mã thành phố
    district_id SMALLINT, -- Mã quận/huyện
    ward_id INT, -- Mã phường/xã
    street TEXT, -- Đường
    location_addr TEXT, -- Địa chỉ đầy đủ
    location_addr_s TEXT, -- Địa chỉ rút gọn
    distance VARCHAR(10), -- Khoảng cách
    absolute_accuracy SMALLINT, -- Độ chính xác tuyệt đối
    delivery_enable BOOLEAN, -- Cho phép giao xe
    delivery_radius DOUBLE PRECISION, -- Bán kính giao xe
    delivery_radius_free DOUBLE PRECISION, -- Bán kính giao xe miễn phí
    delivery_price NUMERIC(18,2), -- Phí giao xe
    delivery_discount_enable BOOLEAN, -- Cho phép giảm giá giao xe
    delivery_discount_km DOUBLE PRECISION, -- Số km giảm giá giao xe
    delivery_discount_percent NUMERIC(5,2), -- Phần trăm giảm giá giao xe
    delivery_discount_max NUMERIC(18,2), -- Giảm giá giao xe tối đa
    airport_delivery_enable BOOLEAN, -- Cho phép giao xe sân bay
    photos JSONB, -- Ảnh
    rating_avg NUMERIC(4,2), -- Điểm đánh giá trung bình
    rating_star1 SMALLINT, -- Đánh giá 1 sao
    rating_star2 SMALLINT, -- Đánh giá 2 sao
    rating_star3 SMALLINT, -- Đánh giá 3 sao
    rating_star4 SMALLINT, -- Đánh giá 4 sao
    rating_star5 SMALLINT, -- Đánh giá 5 sao
    total_trips INT, -- Tổng số chuyến
    total_reviews INT, -- Tổng số đánh giá
    discount_enable BOOLEAN, -- Cho phép giảm giá
    discount_weekly NUMERIC(5,2), -- Giảm giá theo tuần
    discount_monthly NUMERIC(5,2), -- Giảm giá theo tháng
    price NUMERIC(18,2), -- Giá
    price_origin NUMERIC(18,2), -- Giá gốc
    price_total NUMERIC(18,2), -- Tổng giá
    price_with_fee NUMERIC(18,2), -- Giá kèm phí
    price_origin_with_fee NUMERIC(18,2), -- Giá gốc kèm phí
    price_rent_by_hour NUMERIC(18,2), -- Giá thuê theo giờ
    price_rent_by_hour_with_fee NUMERIC(18,2), -- Giá thuê theo giờ kèm phí
    total_days INT, -- Tổng số ngày
    total_hours INT, -- Tổng số giờ
    total_discount_percent NUMERIC(5,2), -- Tổng phần trăm giảm giá
    delivery_fee NUMERIC(18,2), -- Phí giao xe
    ins_support BOOLEAN, -- Hỗ trợ bảo hiểm
    passport BOOLEAN, -- Hộ chiếu (Passport)
    cccd BOOLEAN, -- Căn cước công dân
    owner_host_five_star BOOLEAN, -- Chủ xe 5 sao
    sd INT, -- Số ngày ngắn nhất
    wd INT, -- Số tuần ngắn nhất
    vaccinated SMALLINT, -- Đã tiêm vắc xin
    unavails_min_time SMALLINT, -- Thời gian không khả dụng tối thiểu
    unavails_delivery_time SMALLINT, -- Thời gian không khả dụng cho giao xe
    non_mortgage BOOLEAN, -- Không thế chấp
    v_type TEXT, 	-- Loại xe
    v_make TEXT, 	-- Hãng xe
    v_model TEXT, 	-- Mẫu xe
    rent_by_hour BOOLEAN, -- Cho thuê theo giờ
    subscription BOOLEAN, -- Gói thuê định kỳ
    available_ext_insurance JSON, -- Có bảo hiểm mở rộng
    not_avail_errors JSONB, -- Lỗi khi không khả dụng

    -- Các trường "ngắn hạn" (wdShort)
    wd_short_instant BOOLEAN, -- Đặt nhanh (ngắn hạn)
    wd_short_delivery_enable BOOLEAN, -- Cho phép giao xe (ngắn hạn)
    wd_short_delivery_radius DOUBLE PRECISION, -- Bán kính giao xe (ngắn hạn)
    wd_short_delivery_radius_free DOUBLE PRECISION, -- Bán kính giao xe miễn phí (ngắn hạn)
    wd_short_delivery_price NUMERIC(18,2), -- Phí giao xe (ngắn hạn)
    wd_short_delivery_discount_enable BOOLEAN, -- Cho phép giảm giá giao xe (ngắn hạn)
    wd_short_delivery_discount_km DOUBLE PRECISION, -- Số km giảm giá giao xe (ngắn hạn)
    wd_short_delivery_discount_percent NUMERIC(5,2), -- Phần trăm giảm giá giao xe (ngắn hạn)
    wd_short_delivery_discount_max NUMERIC(18,2), -- Giảm giá giao xe tối đa (ngắn hạn)
    wd_short_price NUMERIC(18,2), -- Giá (ngắn hạn)
    wd_short_price_with_fee NUMERIC(18,2), -- Giá kèm phí (ngắn hạn)
    wd_short_price_origin NUMERIC(18,2), -- Giá gốc (ngắn hạn)
    wd_short_price_origin_with_fee NUMERIC(18,2), -- Giá gốc kèm phí (ngắn hạn)
    wd_short_final_price NUMERIC(18,2), -- Giá cuối cùng (ngắn hạn)
    wd_short_final_price_with_fee NUMERIC(18,2), -- Giá cuối cùng kèm phí (ngắn hạn)
    wd_short_total_discount_percent NUMERIC(5,2), -- Tổng phần trăm giảm giá (ngắn hạn)
    wd_short_delivery_fee NUMERIC(18,2), -- Phí giao xe (ngắn hạn)
    wd_short_owner_host_five_star BOOLEAN, -- Chủ xe 5 sao (ngắn hạn)

	crawled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);


