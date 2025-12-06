import { PaginationCustom } from "@/components/common/PaginationCustom";
import EditMotorcycleDialog from "@/components/pages/rental-management/motorcycle-rental-management/EditMotorcycleDialog";
import { MotorcycleListing } from "@/components/pages/rental-management/motorcycle-rental-management/MotorcycleListing";
import { Button } from "@/components/ui/button";
import { motobikeRentalService } from "@/services/motobikeRentalService";
import useCommon from "@/store/useCommon";
import { MotobikeRental } from "@/types/motobikeRental";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MotorbikeRentalManagement: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [listMotobikes, setListMotobikes] = useState<MotobikeRental[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataMotobikes = async () => {
    setIsLoading(true);
    try {
      const response = await motobikeRentalService.getAll({
        pageSize,
        pageNumber,
      });
      setListMotobikes(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu khách sạn!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataMotobikes();
  }, [pageNumber, pageSize, isRefresh]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">
          Danh sách địa điểm thuê xe máy
        </div>
        <Button onClick={() => setOpen(true)}>Thêm mới</Button>
      </div>

      <MotorcycleListing
        data={listMotobikes}
        isLoading={isLoading}
        limit={pageSize}
      />

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

export default MotorbikeRentalManagement;
