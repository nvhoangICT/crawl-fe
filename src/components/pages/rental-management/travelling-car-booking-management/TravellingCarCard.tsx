import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {TravellingCarBookingType} from "@/types/rental.ts";

interface Props {
    car : TravellingCarBookingType,
    setSelectedCar: (car : TravellingCarBookingType) => void
}
export const TravellingCarCard = ({car, setSelectedCar} : Props) => {
    return (
        <Card key={car.id} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-black cursor-pointer transform hover:-translate-y-1">
            {car.thumbnail && (
                <img
                    src={car.thumbnail || "/placeholder.svg"}
                    alt={car.ten}
                    className="rounded-t-lg object-cover border-b  aspect-[16/9]"
                />
            )}
            <CardHeader>
                <CardTitle className="text-black h-11">{car.ten}</CardTitle>
                <CardDescription className="text-gray-700">{car.loai_dich_vu}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-black">
                    <span className="font-semibold">Loại xe:</span> {car.loai_xe} ({car.hang_xe})
                </p>
                {/*<p className="text-black">*/}
                {/*    <span className="font-semibold">Số chỗ:</span> {car.so_cho}*/}
                {/*</p>*/}
                <p className="text-black">
                    <span className="font-semibold">Khởi hành:</span> {car.khoi_hanh}
                </p>
                <p className="text-black">
                    <span className="font-semibold">Điểm đến:</span> {car.diem_den}
                </p>
                <p className="text-black">
                    <span className="font-semibold">Giá:</span> {car.gia}
                </p>
                <Button
                    onClick={() => setSelectedCar(car)}
                    className="w-full bg-black text-white hover:bg-gray-800 border border-black"
                >
                    Xem chi tiết
                </Button>
            </CardContent>
        </Card>
    )
}
