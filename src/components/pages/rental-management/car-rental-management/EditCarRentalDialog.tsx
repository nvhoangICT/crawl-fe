import {useEffect} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CarRentalType} from "@/types/rental.ts";
import {CarSchema, type CarFormData} from './car-schema.ts';
import ArrayInput from "@/components/common/ArrayInput.tsx";
import ObjectArrayInput from "@/components/common/ObjectArrayInput.tsx";

interface EditCarDialogProps {
    car: CarRentalType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updatedCar: CarRentalType) => void;
}


export function EditCarRentalDialog({car, open, onOpenChange, onSave}: EditCarDialogProps) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        setValue,
        formState: {errors},
    } = useForm<CarFormData>({
        resolver: zodResolver(CarSchema),
        defaultValues: {
            ...car,
            // Đảm bảo các mảng không phải null/undefined cho defaultValues
            images: car.images || [],
            tien_nghi: car.tien_nghi || [],
            dieu_khoan: car.dieu_khoan || [],
            lo_trinh: car.lo_trinh || [],
            chinh_sach_huy_chuyen: car.chinh_sach_huy_chuyen || [],
            danh_gia: car.danh_gia || [],
            phu_phi_co_the_phat_sinh: car.phu_phi_co_the_phat_sinh || [],
            giay_to_thue_xe: car.giay_to_thue_xe || [],
            tai_san_the_chap: car.tai_san_the_chap || [],
            // Đảm bảo các đối tượng lồng nhau không phải null/undefined cho defaultValues
            ho_tro_dua_don: car.ho_tro_dua_don || {
                ho_tro_dua_don_trong_vong: "",
                khoang_cach_mien_phi: "",
                phi_dua_don: ""
            },
            bao_hiem_bo_sung: car.bao_hiem_bo_sung || {mo_ta: ""},
            chu_xe: car.chu_xe || {
                ten: "",
                ti_le_phan_hoi: "",
                thoi_gian_phan_hoi: "",
                ti_le_dong_y: "",
                so_sao: "",
                so_chuyen: "",
                avatar: ""
            },
            thong_tin_lo_trinh: car.thong_tin_lo_trinh || {
                so_km_toi_da: "",
                phi_phu_thu_vuot_50km: "",
                phi_phu_thu_vuot_2_gio: ""
            },
        },
    });


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        reset({
            ...car,
            images: car.images || [],
            tien_nghi: car.tien_nghi || [],
            dieu_khoan: car.dieu_khoan || [],
            lo_trinh: car.lo_trinh || [],
            chinh_sach_huy_chuyen: car.chinh_sach_huy_chuyen || [],
            danh_gia: car.danh_gia || [],
            phu_phi_co_the_phat_sinh: car.phu_phi_co_the_phat_sinh || [],
            giay_to_thue_xe: car.giay_to_thue_xe || [],
            tai_san_the_chap: car.tai_san_the_chap || [],
            ho_tro_dua_don: car.ho_tro_dua_don || {
                ho_tro_dua_don_trong_vong: "",
                khoang_cach_mien_phi: "",
                phi_dua_don: ""
            },
            bao_hiem_bo_sung: car.bao_hiem_bo_sung || {mo_ta: ""},
            chu_xe: car.chu_xe || {
                ten: "",
                ti_le_phan_hoi: "",
                thoi_gian_phan_hoi: "",
                ti_le_dong_y: "",
                so_sao: "",
                so_chuyen: "",
                avatar: ""
            },
            thong_tin_lo_trinh: car.thong_tin_lo_trinh || {
                so_km_toi_da: "",
                phi_phu_thu_vuot_50km: "",
                phi_phu_thu_vuot_2_gio: ""
            },
        });
    }, [car, reset]);

    const currentCarType = watch('loai');
    const isSelfDrive = currentCarType === "xe tự lái";

    const onSubmit = (data: CarFormData) => {
        // Tạo một bản sao dữ liệu có thể thay đổi
        console.log(data);
        const finalData: CarRentalType = {...data} as CarRentalType;

        if (finalData.loai === "xe tự lái") {
            // Các trường không nên tồn tại cho "xe tự lái"
            finalData.diem_don = ""; // Xóa diem_don
            finalData.thong_tin_lo_trinh = undefined; // Xóa thong_tin_lo_trinh
            // Đảm bảo các mảng này là rỗng nếu chúng có mặt
            finalData.phu_phi_co_the_phat_sinh = data.phu_phi_co_the_phat_sinh || [];
            finalData.giay_to_thue_xe = data.giay_to_thue_xe || [];
            finalData.tai_san_the_chap = data.tai_san_the_chap || [];
        } else { // xe có người lái
            // Các trường không nên tồn tại cho "xe có người lái"
            finalData.dia_diem_giao_nhan_xe = ""; // Xóa dia_diem_giao_nhan_xe
            finalData.phu_phi_co_the_phat_sinh = []; // Xóa phu_phi_co_the_phat_sinh
            finalData.giay_to_thue_xe = []; // Xóa giay_to_thue_xe
            finalData.tai_san_the_chap = []; // Xóa tai_san_the_chap
            // Đảm bảo thong_tin_lo_trinh có mặt nếu nó được yêu cầu cho loại này
            finalData.thong_tin_lo_trinh = data.thong_tin_lo_trinh || {
                so_km_toi_da: "",
                phi_phu_thu_vuot_50km: "",
                phi_phu_thu_vuot_2_gio: ""
            };
        }

        onSave(finalData);
    };

    // Helper để hiển thị lỗi
    const ErrorMessage = ({name}: { name: keyof CarFormData }) => {
        const error = errors[name];
        if (!error) return null;
        return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
    };

    const NestedErrorMessage = ({parent, child}: { parent: keyof CarFormData, child: string }) => {
        const error = (errors[parent] as any)?.[child];
        if (!error) return null;
        return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
    };



    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[70vw] max-h-[90vh] overflow-y-auto p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Chỉnh sửa thông tin xe</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
                    {/* Basic Info */}
                    <h3 className="text-xl font-semibold border-b pb-2">Thông tin cơ bản</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ten_xe">Tên xe</Label>
                            <Input id="ten_xe" {...register("ten_xe")} />
                            <ErrorMessage name="ten_xe"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="loai">Loại xe</Label>
                            <Controller
                                name="loai"
                                control={control}
                                render={({field}) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn loại xe"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="xe tự lái">Xe tự lái</SelectItem>
                                            <SelectItem value="xe có người lái">Xe có người lái</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <ErrorMessage name="loai"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gia">Giá thuê (VNĐ)</Label>
                            <Input id="gia" type="number" {...register("gia", {valueAsNumber: true})} />
                            <ErrorMessage name="gia"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phi_bao_hiem">Phí bảo hiểm (VNĐ)</Label>
                            <Input id="phi_bao_hiem"
                                   type="number" {...register("phi_bao_hiem", {valueAsNumber: true})} />
                            <ErrorMessage name="phi_bao_hiem"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phi_dua_don">Phí đưa đón</Label>
                            <Input id="phi_dua_don" {...register("phi_dua_don")} />
                            <ErrorMessage name="phi_dua_don"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="thoi_gian_thue_xe">Thời gian thuê xe</Label>
                            <Input id="thoi_gian_thue_xe" {...register("thoi_gian_thue_xe")} />
                            <ErrorMessage name="thoi_gian_thue_xe"/>
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="mo_ta">Mô tả</Label>
                            <Textarea id="mo_ta" {...register("mo_ta")} />
                            <ErrorMessage name="mo_ta"/>
                        </div>
                    </div>

                    {/* Technical Specs */}
                    <h3 className="text-xl font-semibold border-b pb-2 mt-4">Thông số kỹ thuật</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="truyen_dong">Truyền động</Label>
                            <Input id="truyen_dong" {...register("truyen_dong")} />
                            <ErrorMessage name="truyen_dong"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="so_ghe">Số ghế</Label>
                            <Input id="so_ghe" {...register("so_ghe")} />
                            <ErrorMessage name="so_ghe"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nhien_lieu">Nhiên liệu</Label>
                            <Input id="nhien_lieu" {...register("nhien_lieu")} />
                            <ErrorMessage name="nhien_lieu"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tieu_hao_nhien_lieu">Tiêu hao nhiên liệu</Label>
                            <Input id="tieu_hao_nhien_lieu" {...register("tieu_hao_nhien_lieu")} />
                            <ErrorMessage name="tieu_hao_nhien_lieu"/>
                        </div>
                        {watch('quang_duong_1_lan_sac') !== undefined && (
                            <div className="space-y-2">
                                <Label htmlFor="quang_duong_1_lan_sac">Quãng đường 1 lần sạc</Label>
                                <Input id="quang_duong_1_lan_sac" {...register("quang_duong_1_lan_sac")} />
                                <ErrorMessage name="quang_duong_1_lan_sac"/>
                            </div>
                        )}
                    </div>

                    {/* Location & Time */}
                    <h3 className="text-xl font-semibold border-b pb-2 mt-4">Địa điểm & Thời gian</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="vi_tri_xe">Vị trí xe</Label>
                            <Input id="vi_tri_xe" {...register("vi_tri_xe")} />
                            <ErrorMessage name="vi_tri_xe"/>
                        </div>
                        {isSelfDrive && (
                            <div className="space-y-2">
                                <Label htmlFor="dia_diem_giao_nhan_xe">Địa điểm giao nhận xe</Label>
                                <Input id="dia_diem_giao_nhan_xe" {...register("dia_diem_giao_nhan_xe")} />
                                <ErrorMessage name="dia_diem_giao_nhan_xe"/>
                            </div>
                        )}
                        {!isSelfDrive && (
                            <div className="space-y-2">
                                <Label htmlFor="diem_don">Điểm đón</Label>
                                <Input id="diem_don" {...register("diem_don")} />
                                <ErrorMessage name="diem_don"/>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="nhan_xe">Thời gian nhận xe</Label>
                            <Input id="nhan_xe" type="datetime-local" {...register("nhan_xe")} />
                            <ErrorMessage name="nhan_xe"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tra_xe">Thời gian trả xe</Label>
                            <Input id="tra_xe" type="datetime-local" {...register("tra_xe")} />
                            <ErrorMessage name="tra_xe"/>
                        </div>
                    </div>

                    {/* Nested Objects & Arrays */}
                    <h3 className="text-xl font-semibold border-b pb-2 mt-4">Chi tiết khác</h3>

                    {/* Ho tro dua don */}
                    <div className="space-y-2">
                        <Label>Hỗ trợ đưa đón</Label>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="ho_tro_dua_don_trong_vong">Trong vòng</Label>
                                <Input
                                    id="ho_tro_dua_don_trong_vong" {...register("ho_tro_dua_don.ho_tro_dua_don_trong_vong")} />
                                <NestedErrorMessage parent="ho_tro_dua_don" child="ho_tro_dua_don_trong_vong"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="khoang_cach_mien_phi">Miễn phí</Label>
                                <Input id="khoang_cach_mien_phi" {...register("ho_tro_dua_don.khoang_cach_mien_phi")} />
                                <NestedErrorMessage parent="ho_tro_dua_don" child="khoang_cach_mien_phi"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phi_dua_don_ho_tro">Phí đưa đón</Label>
                                <Input id="phi_dua_don_ho_tro" {...register("ho_tro_dua_don.phi_dua_don")} />
                                <NestedErrorMessage parent="ho_tro_dua_don" child="phi_dua_don"/>
                            </div>
                        </div>
                    </div>

                    {/* Bao hiem bo sung */}
                    <div className="space-y-2">
                        <Label htmlFor="bao_hiem_bo_sung_mo_ta">Bảo hiểm bổ sung (Mô tả)</Label>
                        <Textarea id="bao_hiem_bo_sung_mo_ta" {...register("bao_hiem_bo_sung.mo_ta")} />
                        <NestedErrorMessage parent="bao_hiem_bo_sung" child="mo_ta"/>
                    </div>

                    {/* Chu xe */}
                    <div className="space-y-2">
                        <Label>Chủ xe</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="chu_xe_ten">Tên</Label>
                                <Input id="chu_xe_ten" {...register("chu_xe.ten")} />
                                <NestedErrorMessage parent="chu_xe" child="ten"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="chu_xe_avatar">Avatar URL</Label>
                                <Input id="chu_xe_avatar" {...register("chu_xe.avatar")} />
                                <NestedErrorMessage parent="chu_xe" child="avatar"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="chu_xe_ti_le_phan_hoi">Tỷ lệ phản hồi</Label>
                                <Input id="chu_xe_ti_le_phan_hoi" {...register("chu_xe.ti_le_phan_hoi")} />
                                <NestedErrorMessage parent="chu_xe" child="ti_le_phan_hoi"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="chu_xe_thoi_gian_phan_hoi">Thời gian phản hồi</Label>
                                <Input id="chu_xe_thoi_gian_phan_hoi" {...register("chu_xe.thoi_gian_phan_hoi")} />
                                <NestedErrorMessage parent="chu_xe" child="thoi_gian_phan_hoi"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="chu_xe_ti_le_dong_y">Tỷ lệ đồng ý</Label>
                                <Input id="chu_xe_ti_le_dong_y" {...register("chu_xe.ti_le_dong_y")} />
                                <NestedErrorMessage parent="chu_xe" child="ti_le_dong_y"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="chu_xe_so_sao">Số sao</Label>
                                <Input id="chu_xe_so_sao" {...register("chu_xe.so_sao")} />
                                <NestedErrorMessage parent="chu_xe" child="so_sao"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="chu_xe_so_chuyen">Số chuyến</Label>
                                <Input id="chu_xe_so_chuyen" {...register("chu_xe.so_chuyen")} />
                                <NestedErrorMessage parent="chu_xe" child="so_chuyen"/>
                            </div>
                        </div>
                    </div>

                    {/* Thong tin lo trinh (Conditional) */}
                    {!isSelfDrive && (
                        <div className="space-y-2">
                            <Label>Thông tin lộ trình</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lo_trinh_so_km_toi_da">Số km tối đa</Label>
                                    <Input
                                        id="lo_trinh_so_km_toi_da" {...register("thong_tin_lo_trinh.so_km_toi_da")} />
                                    <NestedErrorMessage parent="thong_tin_lo_trinh" child="so_km_toi_da"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lo_trinh_phi_phu_thu_vuot_50km">Phí phụ thu vượt 50km</Label>
                                    <Input
                                        id="lo_trinh_phi_phu_thu_vuot_50km" {...register("thong_tin_lo_trinh.phi_phu_thu_vuot_50km")} />
                                    <NestedErrorMessage parent="thong_tin_lo_trinh" child="phi_phu_thu_vuot_50km"/>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="lo_trinh_phi_phu_thu_vuot_2_gio">Phí phụ thu vượt 2 giờ</Label>
                                    <Input
                                        id="lo_trinh_phi_phu_thu_vuot_2_gio" {...register("thong_tin_lo_trinh.phi_phu_thu_vuot_2_gio")} />
                                    <NestedErrorMessage parent="thong_tin_lo_trinh" child="phi_phu_thu_vuot_2_gio"/>
                                </div>
                            </div>
                            <ErrorMessage name="thong_tin_lo_trinh"/> {/* For the overall object validation */}
                        </div>
                    )}

                    {/* Amenities */}
                    <ArrayInput error={errors.tien_nghi} type="uneditable" value={watch("tien_nghi") || []}
                                onChange={(value) => setValue("tien_nghi", value)} label="Tiện nghi"
                                placeholder="Thêm tiện nghi mới"/>

                    {/*Provision*/}
                    <ArrayInput error={errors.dieu_khoan} type="editable" value={watch("dieu_khoan") || []}
                                onChange={(value) => setValue("dieu_khoan", value)} label="Điều khoản"
                                placeholder="Thêm điều khoản mới"/>

                    {/* Itinerary */}
                    <ArrayInput error={errors.lo_trinh} type="uneditable" value={watch("lo_trinh") || []}
                                onChange={(value) => setValue("lo_trinh", value)} label="Lộ trình"
                                placeholder="Thêm lộ trình mới"/>

                    {isSelfDrive && (
                        <>
                            {/*Car Rental Document*/}
                            <ArrayInput error={errors.giay_to_thue_xe} type="editable"
                                        value={watch("giay_to_thue_xe") || []}
                                        onChange={(value) => setValue("giay_to_thue_xe", value)} label="Giấy tờ thuê xe"
                                        placeholder="Thêm giấy tờ thuê xe mới"/>

                            {/*Collateral*/}
                            <ArrayInput error={errors.tai_san_the_chap} type="editable"
                                        value={watch("tai_san_the_chap") || []}
                                        onChange={(value) => setValue("tai_san_the_chap", value)}
                                        label="Tài sản thế chấp" placeholder="Thêm tài sản thế chấp mới"/>
                        </>
                    )}


                    {/*Images*/}
                    <ArrayInput error={errors.images} type="editable" value={watch("images") || []}
                                onChange={(value) => setValue("images", value)} label="Ảnh xe"
                                placeholder="Thêm ảnh xe mới"/>


                    <ObjectArrayInput<{
                        thoi_diem_huy: string;
                        phi_huy_chuyen: string;
                    }>
                        value={watch("chinh_sach_huy_chuyen") || []}
                        onChange={(value) => setValue("chinh_sach_huy_chuyen", value)}
                        fields={[
                            {key: 'thoi_diem_huy', label: 'Thời điểm hủy', placeholder: 'Thời điểm hủy'},
                            {key: 'phi_huy_chuyen', label: 'Phí hủy chuyến', placeholder: 'Phí hủy chuyến'},
                        ]}
                        errors={(errors.chinh_sach_huy_chuyen as any[])?.map((error) =>
                            error ? {thoi_diem_huy: !!error.thoi_diem_huy, phi_huy_chuyen: !!error.phi_huy_chuyen} : undefined
                        )}
                        newItemErrors={{
                            thoi_diem_huy: false,
                            phi_huy_chuyen: false
                        }}
                        label="Chính sách hủy chuyến"
                        addButtonText="Thêm chính sách"
                    />

                    {isSelfDrive && (
                        <ObjectArrayInput<{
                            ten: string;
                            mo_ta: string;
                            gia: string;
                        }>
                            value={watch("phu_phi_co_the_phat_sinh") || []}
                            onChange={(value) => setValue("phu_phi_co_the_phat_sinh", value)}
                            fields={[
                                {key: 'ten', label: 'Tên', placeholder: 'Tên'},
                                {key: 'mo_ta', label: 'Mô tả', placeholder: 'Mô tả'},
                                {key: 'gia', label: 'Giá', placeholder: 'Giá'},
                            ]}
                            errors={(errors.phu_phi_co_the_phat_sinh as any[])?.map((error) =>
                                error ? {mo_ta: !!error.mo_ta, ten: !!error.ten, gia: !!error.gia} : undefined
                            )}
                            newItemErrors={{
                                ten: false,
                                mo_ta: false,
                                gia: false,
                            }}
                            label="Phụ phí có thể phát sinh"
                            addButtonText="Thêm phụ phí"
                        />
                    )}

                    <ObjectArrayInput<{
                        nguoi_danh_gia: string;
                        thoi_gian_danh_gia: string;
                        so_sao: string;
                        noi_dung: string;
                    }>
                        value={watch("danh_gia") || []}
                        onChange={(value) => setValue("danh_gia", value)}
                        fields={[
                            {key: 'nguoi_danh_gia', label: 'Người đánh giá', placeholder: 'Tên'},
                            {key: 'thoi_gian_danh_gia', label: 'Thời gian đánh giá', placeholder: 'Thời gian đánh giá'},
                            {key: 'so_sao', label: 'Giá', placeholder: 'Số sao'},
                            {key: 'noi_dung', label: 'Giá', placeholder: 'Nội dung'},
                        ]}
                        errors={(errors.danh_gia as any[])?.map((error) =>
                            error ? {nguoi_danh_gia: !!error.nguoi_danh_gia, thoi_gian_danh_gia: !!error.thoi_gian_danh_gia, so_sao: !!error.so_sao, noi_dung: !!error.noi_dung} : undefined
                        )}
                        newItemErrors={{
                            nguoi_danh_gia: false,
                            thoi_gian_danh_gia: false,
                            so_sao: false,
                            noi_dung: false,
                        }}
                        label="Đan giá"
                        addButtonText="Thêm đánh giá"
                    />


                    <DialogFooter>
                        <Button type="submit">Lưu thay đổi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
