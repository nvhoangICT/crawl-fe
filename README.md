# Admin Travel Crawl Data FE

Frontend quản trị cho hệ thống crawl dữ liệu du lịch, cho phép nhập, kiểm soát và theo dõi quá trình thu thập dữ liệu từ nhiều nguồn (Hotels, Restaurants, Attractions, Landmarks, News, Maps).

## 💡 Tổng quan

- Quản lý yêu cầu crawl dữ liệu từ nhiều nguồn
- Theo dõi trạng thái và kết quả crawl (success, failed, pending)
- Giao diện nhập liệu, validate & gửi request crawl
- Hiển thị log, lịch sử crawl và chi tiết dữ liệu thu được
- Hỗ trợ filter, tìm kiếm, phân loại theo loại hình (hotel, restaurant, attraction,...)
- Quản trị các bản ghi crawl, xử lý lỗi, retry, và cập nhật trạng thái

## 🛠️ Công nghệ sử dụng

- **React**: Vite + React 18
- **TypeScript**
- **TailwindCSS**: giao diện hiện đại, responsive
- **shadcn/ui**: hệ thành phần UI
- **react-hook-form + Zod**: quản lý form, validate dữ liệu
- **Axios**: gọi API backend
- **TanStack Query**: quản lý truy vấn dữ liệu, caching
- **React Router**: routing
- **dayjs**: xử lý thời gian
- **eslint + prettier**: code style & format

## 🗂️ Cấu trúc thư mục

```
admin-travle-crawl-data-fe/
├── src/
│   ├── components/    # Thành phần giao diện tái sử dụng (UI/custom)
│   ├── pages/         # Các màn hình chính của ứng dụng
│   │   ├── crawl-data.tsx      # Giao diện nhập crawl request & hiển thị danh sách kết quả
│   │   └── history.tsx         # Lịch sử và chi tiết các lần crawl
│   ├── hooks/         # Custom hooks cho ứng dụng
│   ├── api/           # Khai báo các API layer (axios, fetcher, service call)
│   ├── types/         # Định nghĩa type & schema
│   ├── utils/         # Hàm tiện ích dùng chung
│   ├── App.tsx        # Điểm vào ứng dụng
│   └── main.tsx
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🚀 Khởi động dự án

```bash
# Cài dependencies
npm install

# Chạy local dev
npm run dev

# Build production
npm run build
```

## ⚙️ Thiết lập môi trường

- Tạo file `.env` ở thư mục gốc FE, ví dụ:
    ```
    VITE_API_URL=http://localhost:3250
    ```
- Đảm bảo backend crawl-data-service đã chạy trên cổng tương ứng

## 🧩 Các chức năng chính

- **Gửi lệnh crawl**: Chọn loại dữ liệu (hotel, restaurant...), nhập URL nguồn, submit để gọi API backend.
- **Theo dõi tiến trình**: Bảng thông tin trạng thái từng lần crawl (pending, success, failed), cung cấp filter theo trạng thái, loại nguồn, keyword.
- **Xem chi tiết & dữ liệu**: Xem chi tiết dữ liệu thu được, message lỗi (nếu có), thời gian, logs.
- **Retry/cập nhật**: Cho phép retry crawl lại các trường hợp lỗi hoặc chưa hoàn thành.
- **Quản trị user (nếu mở rộng)**: Phân quyền các thao tác gửi/lịch sử

## 💬 Liên hệ & phát triển

- Đóng góp, phản hồi qua github hoặc email nhóm dev
- Đề xuất thêm chức năng mở rộng: dashboard tổng quan, hệ thống thống kê, kiểm thử chất lượng dữ liệu crawl

> Đây là dự án open source phục vụ mục đích nghiên cứu/hỗ trợ nghiệp vụ quản lý dữ liệu du lịch crawl tự động.

---
