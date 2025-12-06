import { PaginationCustom } from "@/components/common/PaginationCustom";
import CreateOrUpdateBus from "@/components/pages/bus-management/CreateOrUpdateBus";
import FormSearchBus from "@/components/pages/bus-management/FormSearchBus";
import ListBus from "@/components/pages/bus-management/ListBus";
import { Button } from "@/components/ui/button";
import { busService } from "@/services/busService";
import useCommon from "@/store/useCommon";
import { Bus } from "@/types/bus";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BusManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [buses, setBuses] = useState<Bus[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [filters, setFilters] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataRestaurant = async () => {
    setIsLoading(true);
    try {
      const response = await busService.getAll({
        pageSize,
        pageNumber,
        filter: filters,
      });
      setBuses(response.data.content);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu vé xe!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataRestaurant();
  }, [pageNumber, pageSize, isRefresh, filters]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Danh sách vé xe</div>
        <Button onClick={() => setOpen(true)}>Thêm nhà vé xe mới</Button>
        <CreateOrUpdateBus
          dataUpdate={null}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
      <FormSearchBus
        onSubmit={(data) => {
          console.log("Filter data:", data);
          setFilters(data);
          setPageNumber(1);
        }}
      />
      <ListBus data={buses} isLoading={isLoading} limit={pageSize} />
      <div className="flex justify-center mt-4">
        <PaginationCustom
          page={pageNumber}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPageNumber(1);
          }}
          onPageChange={(page) => setPageNumber(page)}
          rowsPerPageOptions={[15, 30, 50]}
        />
      </div>
    </>
  );
};

export default BusManagementPage;
