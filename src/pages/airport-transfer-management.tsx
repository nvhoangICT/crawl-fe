import { PaginationCustom } from "@/components/common/PaginationCustom";
import { ListAirportTransfer } from "@/components/pages/airport-transfer-management/ListAirportTransfer";
import { airportTransferService } from "@/services/airportTransferService";
import useCommon from "@/store/useCommon";
import { AirportType } from "@/types/airportType";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AirportTransferManagementPage: React.FC = () => {
  const [dataAirportTransfer, setDataAirportTransfer] = useState<AirportType[]>(
    []
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataTransfer = async () => {
    setIsLoading(true);
    try {
      const response = await airportTransferService.getAll({
        pageSize,
        pageNumber,
      });
      setDataAirportTransfer(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu khách sạn!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataTransfer();
  }, [pageNumber, pageSize, isRefresh]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">
          Danh sách xe đưa đón sân bay
        </div>
      </div>

      <ListAirportTransfer
        data={dataAirportTransfer}
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
    </>
  );
};

export default AirportTransferManagementPage;
