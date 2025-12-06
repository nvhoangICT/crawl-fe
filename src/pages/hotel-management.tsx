import { PaginationCustom } from "@/components/common/PaginationCustom";
import FormSearchHotel from "@/components/pages/hotel-management/FormSearchHotel";
import { ListHotel } from "@/components/pages/hotel-management/ListHotel";
import UpdateHotel from "@/components/pages/hotel-management/updateHotel";
import { Button } from "@/components/ui/button";
import { hotelService } from "@/services/hotelService";
import useCommon from "@/store/useCommon";
import { Hotel } from "@/types/hotel";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HotelManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [filters, setFilters] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataHotels = async () => {
    setIsLoading(true);
    try {
      const response = await hotelService.getAll({
        pageSize,
        pageNumber,
        filter: filters,
      });
      setHotels(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu khách sạn!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataHotels();
  }, [pageNumber, pageSize, isRefresh, filters]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Danh sách khách sạn</div>
        <Button onClick={() => setOpen(true)}>Thêm khách sạn mới</Button>
      </div>
      <UpdateHotel
        dataUpdate={null}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <FormSearchHotel
        onSubmit={(data) => {
          console.log("Filter data:", data);
          setFilters(data);
          setPageNumber(1);
        }}
      />
      <ListHotel data={hotels} isLoading={isLoading} limit={pageSize} />

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
