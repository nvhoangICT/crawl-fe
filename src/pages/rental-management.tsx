import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Bike, Car, Bus, ArrowRight} from 'lucide-react';
import {useNavigate} from "react-router-dom";

function RentalManagement() {
    const services = [
        {
            id: 'motorcycle',
            title: 'Thuê xe máy',
            // description: 'Khám phá thành phố một cách linh hoạt và tiết kiệm với dịch vụ thuê xe máy của chúng tôi',
            icon: Bike,
            url: "/admin/rental-management/motorcycle"
        },
        {
            id: 'car',
            title: 'Thuê ô tô',
            // description: 'Trải nghiệm lái xe thoải mái và an toàn với đội xe ô tô đa dạng, chất lượng cao',
            icon: Car,
            url: "/admin/rental-management/car"
        },
        {
            id: 'travel',
            title: 'Đặt xe du lịch',
            // description: 'Dịch vụ xe du lịch cao cấp cho các chuyến đi dài, tour du lịch và sự kiện đặc biệt',
            icon: Bus,
            url: "/admin/rental-management/traveling-car"

        }
    ];

    const navigate = useNavigate();

    const handleServiceClick = (serviceId: string) => {
        console.log(`Selected service: ${serviceId}`);
        // Here you would typically navigate to the specific service page
    };

    return (
        <div className="bg-white">
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-black mb-4">Chọn Loại Xe </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => {
                            const IconComponent = service.icon;
                            return (
                                <Card
                                    key={service.id}
                                    className="group hover:shadow-2xl transition-all duration-300 border-gray-200 hover:border-black cursor-pointer transform hover:-translate-y-2"
                                    onClick={() => handleServiceClick(service.id)}
                                >
                                    <CardHeader className="text-center pb-4">
                                        <div
                                            className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className="h-8 w-8 text-white"/>
                                        </div>
                                        <CardTitle
                                            className="text-2xl font-bold text-black group-hover:text-gray-700 transition-colors">
                                            {service.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                            <Button
                                                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 group transition-all duration-300"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleServiceClick(service.id);
                                                    navigate(service.url);
                                                }}
                                            >
                                                <span>Quản lý</span>
                                                <ArrowRight
                                                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                            </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RentalManagement;