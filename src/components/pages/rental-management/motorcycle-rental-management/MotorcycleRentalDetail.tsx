import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import {
    ArrowLeft,
    Star,
    MapPin,
    Clock,
    Shield,
    CreditCard,
    FileText,
    AlertCircle,
    Edit3
} from 'lucide-react';
import {MotorcycleRentalType} from "@/types/rental.ts";

interface MotorcycleDetailProps {
    motorcycle: MotorcycleRentalType;
    onBack: () => void;
    onEdit: (motorcycle: MotorcycleRentalType) => void;
}

export function MotorcycleDetail({ motorcycle, onBack, onEdit }: MotorcycleDetailProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="bg-gray-50 py-8">
            <div className="mx-auto px-4">
                {/* Header */}
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
                        onClick={() => onEdit(motorcycle)}
                        className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white ml-auto"
                    >
                        <Edit3 className="h-4 w-4" />
                        <span>Chỉnh sửa thông tin</span>
                    </Button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image and Basic Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <div className="aspect-video overflow-hidden rounded-t-lg">
                                <img
                                    src={motorcycle.thumbnail}
                                    alt={motorcycle.loai_xe}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-2xl font-bold text-black">
                                        {motorcycle.loai_xe}
                                    </CardTitle>
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-lg font-semibold">{motorcycle.danh_gia}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {motorcycle.hang_xe.map((brand, index) => (
                                        <Badge key={index} variant="secondary">
                                            {brand}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Detailed Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="h-5 w-5" />
                                    <span>Thông tin chi tiết</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">Đời xe: {motorcycle.doi_xe}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">{motorcycle.pham_vi_di_chuyen}</span>
                                    </div>
                                </div>

                                <Separator />

                                {/* Amenities */}
                                <div>
                                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                                        <Shield className="h-4 w-4" />
                                        <span>Tiện ích đi kèm</span>
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {motorcycle.tien_ich.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Image */}
                                <div>
                                    <h4 className="font-semibold mb-3">Ảnh xe</h4>
                                    <div className="space-y-2">
                                        {motorcycle.images.map((image, index) => (
                                            <div key={index} className="grid grid-cols-3">
                                                <img
                                                    src={image}
                                                    alt={"Ảnh "+index}
                                                    className="w-full h-full object-cover rounded"
                                                    />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Pickup Locations */}
                                <div>
                                    <h4 className="font-semibold mb-3">Địa điểm nhận/trả xe</h4>
                                    <div className="space-y-2">
                                        {motorcycle.nhan_tra_xe.map((location, index) => (
                                            <div key={index} className="flex items-start space-x-2">
                                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                                <span className="text-sm">{location}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Home Delivery */}
                                <div>
                                    <h4 className="font-semibold mb-3">Giao xe tận nơi</h4>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Thời gian:</strong> {motorcycle.giao_xe_tan_noi.thoi_gian}</p>
                                        <p><strong>Điều kiện:</strong> {motorcycle.giao_xe_tan_noi.dieu_kien}</p>
                                        <p><strong>Bán kính:</strong> {motorcycle.giao_xe_tan_noi.ban_kinh}</p>
                                        <div>
                                            <strong>Địa điểm giao xe:</strong>
                                            <ul className="mt-1 space-y-1 ml-4">
                                                {motorcycle.giao_xe_tan_noi.dia_diem.map((location, index) => (
                                                    <li key={index} className="list-disc">{location}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Procedures */}
                                <div>
                                    <h4 className="font-semibold mb-3">Thủ tục nhận xe</h4>
                                    <div className="space-y-2">
                                        {motorcycle.thu_tuc_nhan_xe.map((procedure, index) => (
                                            <div key={index} className="flex items-start space-x-2">
                                                <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                                    {index + 1}
                                                </div>
                                                <span className="text-sm">{procedure}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Pricing and Policies */}
                    <div className="space-y-6">
                        {/* Pricing Card */}
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <CreditCard className="h-5 w-5" />
                                    <span>Giá thuê</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-black">
                                        {formatPrice(motorcycle.gia)}
                                    </div>
                                    <div className="text-gray-500">/ ngày</div>
                                </div>

                                <Separator />

                                <div>
                                    <h5 className="font-semibold mb-2">Cọc giữ xe</h5>
                                    <p className="text-sm text-gray-600">{motorcycle.coc_giu_xe}</p>
                                </div>

                                {/*<Button className="w-full bg-black hover:bg-gray-800 text-white">*/}
                                {/*    Đặt xe ngay*/}
                                {/*</Button>*/}
                            </CardContent>
                        </Card>

                        {/* Policies Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <AlertCircle className="h-5 w-5" />
                                    <span>Chính sách & Quy định</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h5 className="font-semibold mb-2">Thời gian thuê</h5>
                                    <p className="text-sm text-gray-600">{motorcycle.quy_dinh_thoi_gian_thue}</p>
                                </div>

                                <Separator />

                                <div>
                                    <h5 className="font-semibold mb-2">Chính sách hủy thuê</h5>
                                    <div className="space-y-1">
                                        {motorcycle.chinh_sach_huy_thue.map((policy, index) => (
                                            <p key={index} className="text-sm text-gray-600">• {policy}</p>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}