import {TravellingCarBookingType} from "@/types/rental.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    EditTravellingCarDialog
} from "@/components/pages/rental-management/travelling-car-booking-management/EditTravellingCarDialog.tsx";
import {ArrowLeft, Calendar, Car, Clock, DollarSign, Edit, Info, MapPin} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";

interface CarDetailViewProps {
    car: TravellingCarBookingType;
    onBack: () => void;
    onEdit: () => void;
    onSave: (updatedCar: TravellingCarBookingType) => void;
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (isOpen: boolean) => void;
}

export function TravellingCarDetail({
                                        car,
                                        onBack,
                                        onEdit,
                                        onSave,
                                        isEditDialogOpen,
                                        setIsEditDialogOpen
                                    }: CarDetailViewProps) {
    return (
        <div className="">
            {/* Header */}
            <div className="p-6 mx-4 text-white bg-black rounded-xl">
                <div className="mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Button variant="default" size="sm"
                                className="bg-white/20 text-white border-white/30 hover:bg-white/40" onClick={onBack}>
                            <ArrowLeft className="w-4 h-4 mr-2"/>
                            Quay lại
                        </Button>
                        <Button
                            onClick={() => {
                                setIsEditDialogOpen(true);
                                onEdit()
                            }}
                            variant="secondary"
                            size="sm"
                            className="bg-white/20 text-white border-white/30 hover:bg-white/40"
                        >
                            <Edit className="w-4 h-4 mr-2"/>
                            Chỉnh sửa
                        </Button>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{car.ten}</h1>
                    <div className="flex items-center gap-2 text-lg">
                        <MapPin className="w-5 h-5"/>
                        <span>{car.khoi_hanh} → {car.diem_den}</span>
                    </div>
                </div>
            </div>

            {/* Thumbnail */}
            <div className="p-4 space-y-4">
                {car.thumbnail && (
                    <div className="w-full relative overflow-hidden rounded-lg">
                        <img
                            src={car.thumbnail || "/placeholder.svg"}
                            alt={car.ten}
                            className="rounded-lg object-cover aspect-[16/9]"
                        />
                    </div>
                )}

                {/* Image Gallery */}
                {car.images && car.images.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-black">Thư viện ảnh:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {car.images.map((imgSrc, index) => (
                                <div key={index}
                                     className="relative w-full overflow-hidden rounded-lg border border-gray-300">
                                    <img
                                        src={imgSrc || "/placeholder.svg"}
                                        alt={car.ten}
                                        className="rounded-lg object-cover aspect-[16/9]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>


            <div className="mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Vehicle Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Car className="w-5 h-5"/>
                                    Thông tin xe
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-muted-foreground">Loại dịch vụ</div>
                                        <Badge variant="secondary" className="mt-1">{car.loai_dich_vu}</Badge>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Loại xe</div>
                                        <div className="font-medium">{car.loai_xe}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Hãng xe</div>
                                        <div className="font-medium">{car.hang_xe.join(', ')}</div>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <div className="text-sm text-muted-foreground">Số chỗ</div>*/}
                                    {/*    <div className="font-medium flex items-center gap-1">*/}
                                    {/*        <Users className="w-4 h-4"/>*/}
                                    {/*        {car.so_cho}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div>
                                        <div className="text-sm text-muted-foreground">Chỗ tối đa</div>
                                        <div className="font-medium">{car.cho_toi_da}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Ngày hoạt động</div>
                                        <div className="font-medium flex items-center gap-1">
                                            <Calendar className="w-4 h-4"/>
                                            {car.ngay_trong_tuan}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pickup & Drop-off */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="w-5 h-5"/>
                                    Thông tin đón trả
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-sm text-muted-foreground mb-2">Giờ đón</div>
                                    <div className="font-medium">{car.gio_don}</div>
                                </div>

                                <Separator/>

                                <div>
                                    <div className="text-sm text-muted-foreground mb-2">Địa điểm đón</div>
                                    <ul className="space-y-1">
                                        {car.don_tai.map((location, index) => (
                                            <li key={index} className="text-sm">
                                                {index === 0 ? (
                                                    <span className="font-medium">{location}</span>
                                                ) : (
                                                    <span
                                                        className={location.startsWith('+') ? 'text-destructive font-medium' : ''}>
                            {location}
                          </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Separator/>

                                <div>
                                    <div className="text-sm text-muted-foreground mb-2">Địa điểm trả</div>
                                    <ul className="space-y-1">
                                        {car.tra_tai.map((location, index) => (
                                            <li key={index} className="text-sm">
                                                {index === 0 ? (
                                                    <span className="font-medium">{location}</span>
                                                ) : (
                                                    <span
                                                        className={location.startsWith('+') ? 'text-destructive font-medium' : ''}>
                            {location}
                          </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5"/>
                                    Giá cước
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-primary mb-4">{car.gia}</div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm font-medium text-green-600 mb-2">✓ Bao gồm</div>
                                        <ul className="space-y-1">
                                            {car.gia_bao_gom.map((item, index) => (
                                                <li key={index} className="text-sm text-muted-foreground">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Separator/>

                                    <div>
                                        <div className="text-sm font-medium text-destructive mb-2">✗ Không bao gồm</div>
                                        <ul className="space-y-1">
                                            {car.gia_khong_bao_gom.map((item, index) => (
                                                <li key={index} className="text-sm text-muted-foreground">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {car.phu_thu && (
                                        <>
                                            <Separator/>
                                            <div>
                                                <div className="text-sm font-medium text-destructive mb-2">
                                                    <Info className="w-4 h-4 inline mr-1"/>
                                                    Phụ thu
                                                </div>
                                                <div className="text-sm text-muted-foreground">{car.phu_thu}</div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/*<Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90">*/}
                                {/*    Đặt xe ngay*/}
                                {/*</Button>*/}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <EditTravellingCarDialog
                car={car}
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={onSave}
            />
        </div>
    );
}
