import {CarRentalType} from "@/types/rental.ts";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Fuel, Gauge, MapPin, Star, Users} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
// import {Badge} from "@/components/ui/badge.tsx";

export const CarCard = ({ car, onViewDetails }: { car: CarRentalType; onViewDetails: (carId: string) => void })=> {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    return (
        <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-black cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="p-4">
                {/*<div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-4">*/}
                {/*    <Car className="h-12 w-12 text-muted-foreground" />*/}
                {/*</div>*/}
                <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                        src={car.thumbnail}
                        alt={"Ảnh "+car.id}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{car.ten_xe}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{car.mo_ta}</p>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
                {/* Car Specs */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{car.so_ghe}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-muted-foreground" />
                        <span>{car.nhien_lieu}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-muted-foreground" />
                        <span>{car.truyen_dong}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate">{car.dia_diem_giao_nhan_xe}</span>
                    </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Chủ xe: {car.chu_xe.ten}</span>
                    <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{car.chu_xe.so_sao}</span>
                    </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-semibold text-lg">{formatPrice(car.gia)}</div>
                        <div className="text-xs text-muted-foreground">/{car.thoi_gian_thue_xe}</div>
                    </div>
                    <Button onClick={() => onViewDetails(car.id)} size="sm">
                        Xem chi tiết
                    </Button>
                </div>

                {/* Pickup Fee Badge */}
                {/*<div className="flex justify-end">*/}
                {/*    <Badge variant={car.phi_dua_don === "Miễn phí" ? "secondary" : "outline"} className="text-xs">*/}
                {/*        Đưa đón: {car.phi_dua_don}*/}
                {/*    </Badge>*/}
                {/*</div>*/}
            </CardContent>
        </Card>
    )
}
