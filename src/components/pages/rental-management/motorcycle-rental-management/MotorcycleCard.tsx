import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Star, MapPin, Clock, Shield } from 'lucide-react';
import {MotorcycleRentalType} from "@/types/rental.ts";

interface MotorcycleCardProps {
    motorcycle: MotorcycleRentalType;
    onViewDetails: (motorcycle: MotorcycleRentalType) => void;
}

export function MotorcycleCard({ motorcycle, onViewDetails }: MotorcycleCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-black cursor-pointer transform hover:-translate-y-1">
            <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                    src={motorcycle.thumbnail}
                    alt={motorcycle.loai_xe}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-black group-hover:text-gray-700 transition-colors">
                        {motorcycle.loai_xe}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{motorcycle.danh_gia}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                    {motorcycle.hang_xe.slice(0, 2).map((brand, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {brand}
                        </Badge>
                    ))}
                    {motorcycle.hang_xe.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                            +{motorcycle.hang_xe.length - 2}
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Đời xe: {motorcycle.doi_xe}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{motorcycle.pham_vi_di_chuyen}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4" />
                        <span>{motorcycle.tien_ich.length} tiện ích</span>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-black">
                                {formatPrice(motorcycle.gia)}
                            </div>
                            <div className="text-sm text-gray-500">/ ngày</div>
                        </div>

                        <Button
                            onClick={() => onViewDetails(motorcycle)}
                            className="bg-black hover:bg-gray-800 text-white"
                        >
                            Xem chi tiết
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}