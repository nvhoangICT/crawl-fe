import { PaginationCustom } from "@/components/common/PaginationCustom";
import { CarListing } from "@/components/pages/rental-management/car-rental-management/CarListing";
import EditMotorcycleDialog from "@/components/pages/rental-management/motorcycle-rental-management/EditMotorcycleDialog";
import { Button } from "@/components/ui/button";
import { carService } from "@/services/carService";
import useCommon from "@/store/useCommon";
import { CarRental } from "@/types/car";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CarRentalManagement: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [listCars, setListCars] = useState<CarRental[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataCars = async () => {
    setIsLoading(true);
    try {
      const response = await carService.getAll({
        pageSize,
        pageNumber,
      });
      setListCars(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu khách sạn!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataCars();
  }, [pageNumber, pageSize, isRefresh]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Danh sách thuê ô tô</div>
        <Button onClick={() => setOpen(true)}>Thêm mới</Button>
      </div>

      <CarListing data={listCars} isLoading={isLoading} limit={pageSize} />

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
      <EditMotorcycleDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CarRentalManagement;
