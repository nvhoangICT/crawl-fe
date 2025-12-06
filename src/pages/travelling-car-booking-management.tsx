import { PaginationCustom } from "@/components/common/PaginationCustom";
import { TravellingCarListing } from "@/components/pages/rental-management/travelling-car-booking-management/TravellingCarListing";
import { tourBusService } from "@/services/tourBusService";
import useCommon from "@/store/useCommon";
import { TourBusType } from "@/types/tour-bus";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HotelManagementPage: React.FC = () => {
  const [bus, setBus] = useState<TourBusType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataBusTour = async () => {
    setIsLoading(true);
    try {
      const response = await tourBusService.getAll({
        pageSize,
        pageNumber,
      });
      setBus(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu khách sạn!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataBusTour();
  }, [pageNumber, pageSize, isRefresh]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Danh sách thuê xe du lịch </div>
      </div>

      <TravellingCarListing data={bus} isLoading={isLoading} limit={pageSize} />

      <div className="flex justify-center mt-4">
        <PaginationCustom
          page={pageNumber}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPageNumber(0);
          }}
          onPageChange={(page) => setPageNumber(page)}
          rowsPerPageOptions={[15, 30, 50]}
        />
      </div>
    </>
  );
};

export default HotelManagementPage;
