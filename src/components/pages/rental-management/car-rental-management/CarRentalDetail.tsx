import {useState} from 'react'; // Add this import
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ArrowLeft, Calendar, Car, Clock, DollarSign, Edit3, Fuel, Gauge, MapPin, Star, Users} from 'lucide-react';
import {carsData} from "@/components/pages/rental-management/car-rental-management/car-data.ts";
import {EditCarRentalDialog} from "@/components/pages/rental-management/car-rental-management/EditCarRentalDialog.tsx";

interface Props {
    carId: string
    onBack: () => void
}

// Define interfaces for the car data structure
export const CarRentalDetail = ({carId, onBack}: Props) => {
    const car = carsData.find(c => c.id === carId);

    // const [editingMotorcycle, setEditingMotorcycle] = useState<MotorcycleRentalType | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

    if (!car) return <div>Not found</div>;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mainImage, setMainImage] = useState<string>(car.thumbnail || (car.images.length > 0 ? car.images[0] : "https://hips.hearstapps.com/hmg-prod/images/news-photo-1598017482.jpg?crop=1.00xw:0.847xh;0,0.116xh&resize=980:*"));


    // State to manage the currently displayed main image

    // Helper function to format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
    };

    const isSelfDrive = car.loai === "xe tự lái";

    const handleSave = () => {}

    return (<div className="mx-auto">
            <Card className="mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{car.ten_xe}</CardTitle>
                    <div className="flex justify-between items-center gap-2 mt-2">
                        <div>
                            <Badge variant="secondary">{car.loai.charAt(0).toUpperCase() + car.loai.slice(1)}</Badge>
                            <Badge variant="outline">{car.vi_tri_xe}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 mb-6">
                            <Button
                                variant="outline"
                                onClick={onBack}
                                className="flex items-center space-x-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Quay lại</span>
                            </Button>

                            <Button
                                onClick={() => setIsEditDialogOpen(true)}
                                className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white ml-auto"
                            >
                                <Edit3 className="h-4 w-4" />
                                <span>Chỉnh sửa thông tin</span>
                            </Button>
                        </div>

                    </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    {/* Car Image Gallery Section */}
                    <div className="space-y-4">
                        <div
                            className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <img
                                src={mainImage || "/placeholder.svg?height=400&width=600&query=car main image"}
                                alt={car.ten_xe}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {/* Display thumbnail if available and not already main image */}
                            {car.thumbnail && (car.thumbnail !== mainImage) && (
                                <img
                                    src={car.thumbnail || "/placeholder.svg"}
                                    alt="Car thumbnail"
                                    className="w-20 h-16 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
                                    onClick={() => setMainImage(car.thumbnail)}
                                />
                            )}
                            {/* Display other images */}
                            {car.images.length > 0 ? (
                                car.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img || `/placeholder.svg?height=80&width=100&query=car gallery image ${index + 1}`}
                                        alt={`Car image ${index + 1}`}
                                        className={`w-20 h-16 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'} hover:border-primary transition-colors`}
                                        onClick={() => setMainImage(img)}
                                    />
                                ))
                            ) : (
                                // Fallback for no images, show a single placeholder
                                <img
                                    src="/placeholder.svg?height=80&width=100"
                                    alt="No images available"
                                    className="w-20 h-16 object-cover rounded-md border-2 border-transparent"
                                />
                            )}
                        </div>
                    </div>

                    {/* Car Details Section */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Thông tin cơ bản</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Car className="w-4 h-4 text-muted-foreground"/>
                                    <span>Truyền động: {car.truyen_dong}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-muted-foreground"/>
                                    <span>Số ghế: {car.so_ghe}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Fuel className="w-4 h-4 text-muted-foreground"/>
                                    <span>Nhiên liệu: {car.nhien_lieu}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Gauge className="w-4 h-4 text-muted-foreground"/>
                                    <span>Tiêu hao: {car.tieu_hao_nhien_lieu}</span>
                                </div>
                                {car.quang_duong_1_lan_sac && (
                                    <div className="flex items-center gap-2">
                                        <Gauge className="w-4 h-4 text-muted-foreground"/>
                                        <span>Quãng đường: {car.quang_duong_1_lan_sac}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator/>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Mô tả</h2>
                            <p className="text-muted-foreground">{car.mo_ta}</p>
                        </div>

                        <Separator/>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Tiện nghi</h2>
                            <div className="flex flex-wrap gap-2">
                                {car.tien_nghi.map((item, index) => (
                                    <Badge key={index} variant="outline">{item.charAt(0).toUpperCase() + item.slice(1)}</Badge>
                                ))}
                            </div>
                        </div>

                        <Separator/>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Giá thuê</h2>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-primary">{formatCurrency(car.gia)}</span>
                                <span className="text-muted-foreground">/ {car.thoi_gian_thue_xe}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Phí đưa đón: {car.phi_dua_don}</p>
                            <p className="text-sm text-muted-foreground">Phí bảo
                                hiểm: {formatCurrency(car.phi_bao_hiem)}</p>
                        </div>

                        <Separator/>

                        {/* Pickup/Dropoff Info (Conditional) */}
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Thời gian & Địa điểm</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground"/>
                                    <span>Nhận xe: {new Date(car.nhan_xe).toLocaleString('vi-VN')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground"/>
                                    <span>Trả xe: {new Date(car.tra_xe).toLocaleString('vi-VN')}</span>
                                </div>
                                {isSelfDrive && car.dia_diem_giao_nhan_xe && (
                                    <div className="flex items-center gap-2 col-span-full">
                                        <MapPin className="w-4 h-4 text-muted-foreground"/>
                                        <span>Địa điểm giao nhận: {car.dia_diem_giao_nhan_xe}</span>
                                    </div>
                                )}
                                {!isSelfDrive && car.diem_don && (
                                    <div className="flex items-center gap-2 col-span-full">
                                        <MapPin className="w-4 h-4 text-muted-foreground"/>
                                        <span>Điểm đón: {car.diem_don}</span>
                                    </div>
                                )}
                            </div>
                            {car.ho_tro_dua_don && (
                                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                                    <p>Hỗ trợ đưa đón trong vòng: {car.ho_tro_dua_don.ho_tro_dua_don_trong_vong}</p>
                                    <p>Khoảng cách miễn phí: {car.ho_tro_dua_don.khoang_cach_mien_phi}</p>
                                    <p>Phí phụ thu đưa đón: {car.ho_tro_dua_don.phi_dua_don}</p>
                                </div>
                            )}
                        </div>

                        {/* Route Information (Conditional - only for "xe có người lái") */}
                        {!isSelfDrive && car.thong_tin_lo_trinh && (
                            <>
                                <Separator/>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold">Thông tin lộ trình</h2>
                                    <div className="grid grid-cols-1 gap-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Gauge className="w-4 h-4 text-muted-foreground"/>
                                            <span>Số km tối đa: {car.thong_tin_lo_trinh.so_km_toi_da}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-muted-foreground"/>
                                            <span>Phí phụ thu vượt 50km: {car.thong_tin_lo_trinh.phi_phu_thu_vuot_50km}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-muted-foreground"/>
                                            <span>Phí phụ thu vượt 2 giờ: {car.thong_tin_lo_trinh.phi_phu_thu_vuot_2_gio}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {car.lo_trinh.map((item, index) => (
                                            <Badge key={index} variant="secondary">{item}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Additional Fees (Conditional - only for "xe tự lái") */}
                        {isSelfDrive && car.phu_phi_co_the_phat_sinh && car.phu_phi_co_the_phat_sinh.length > 0 && (
                            <>
                                <Separator/>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold">Phụ phí có thể phát sinh</h2>
                                    <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                                        {car.phu_phi_co_the_phat_sinh.map((fee, index) => (
                                            <li key={index}>
                                                <strong>{fee.ten}:</strong> {fee.mo_ta} ({fee.gia})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}

                        <Separator/>

                        {/* Owner Info */}
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Chủ xe</h2>
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage
                                        src={car.chu_xe.avatar || "/placeholder.svg?height=64&width=64&query=owner avatar"}/>
                                    <AvatarFallback>{car.chu_xe.ten.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex justify-between gap-32 items-center">
                                    <div>
                                        <p className="text-lg font-semibold">{car.chu_xe.ten}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                                            <span>{car.chu_xe.so_sao} ({car.chu_xe.so_chuyen})</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Tỷ lệ phản
                                            hồi: {car.chu_xe.ti_le_phan_hoi} ({car.chu_xe.thoi_gian_phan_hoi})</p>
                                        <p className="text-sm text-muted-foreground">Tỷ lệ đồng
                                            ý: {car.chu_xe.ti_le_dong_y}</p>
                                    </div>

                                </div>
                            </div>
                            {/*<Button variant="outline" className="mt-4">*/}
                            {/*    <MessageSquare className="w-4 h-4 mr-2"/>*/}
                            {/*    Liên hệ chủ xe*/}
                            {/*</Button>*/}
                        </div>

                        <Separator/>

                        {/* Accordion for detailed policies */}
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-xl font-semibold">Điều khoản thuê
                                    xe</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        {car.dieu_khoan.map((term, index) => (
                                            <li key={index}>{term}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-xl font-semibold">Bảo hiểm bổ sung</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">{car.bao_hiem_bo_sung.mo_ta}</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-xl font-semibold">Chính sách hủy
                                    chuyến</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        {car.chinh_sach_huy_chuyen.map((policy, index) => (
                                            <li key={index}>
                                                <strong>{policy.thoi_diem_huy}:</strong> {policy.phi_huy_chuyen}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            {isSelfDrive && car.giay_to_thue_xe && car.giay_to_thue_xe.length > 0 && (
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-xl font-semibold">Giấy tờ thuê
                                        xe</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                            {car.giay_to_thue_xe.map((doc, index) => (
                                                <li key={index}>{doc}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {isSelfDrive && car.tai_san_the_chap && car.tai_san_the_chap.length > 0 && (
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-xl font-semibold">Tài sản thế
                                        chấp</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                            {car.tai_san_the_chap.map((asset, index) => (
                                                <li key={index}>{asset}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            )}

                            {car.danh_gia && car.danh_gia.length > 0 && (
                                <AccordionItem value="item-6">
                                    <AccordionTrigger className="text-xl font-semibold">Đánh giá
                                        ({car.danh_gia.length})</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4">
                                            {car.danh_gia.map((review, index) => (
                                                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                                                    <div className="flex items-center gap-2 text-sm font-semibold">
                                                        <span>{review.nguoi_danh_gia}</span>
                                                        <span
                                                            className="text-muted-foreground">· {review.thoi_gian_danh_gia}</span>
                                                        <div className="flex items-center gap-1 text-yellow-500">
                                                            <Star className="w-4 h-4 fill-current"/>
                                                            <span>{review.so_sao.split(' ')[0]}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground mt-1">{review.noi_dung}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )}
                        </Accordion>
                    </div>
                </CardContent>
            </Card>

            <EditCarRentalDialog car={car} open={isEditDialogOpen}
                                 onOpenChange={setIsEditDialogOpen} onSave={handleSave}/>
        </div>
    );
}
