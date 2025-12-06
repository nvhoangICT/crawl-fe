import { PaginationCustom } from "@/components/common/PaginationCustom";
import CreateOrUpdateSpa from "@/components/pages/spa-management/CreateOrUpdateSpa";
import FormSearchSpa from "@/components/pages/spa-management/FormSearchSpa";
import { ListSpa } from "@/components/pages/spa-management/ListSpa";
import { Button } from "@/components/ui/button";
import { spaService } from "@/services/spaService";
import useCommon from "@/store/useCommon";
import { Spa } from "@/types/spa";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SpaManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [spas, setSpas] = useState<Spa[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [filters, setFilters] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataRestaurant = async () => {
    setIsLoading(true);
    try {
      const response = await spaService.getAll({
        pageSize,
        pageNumber,
        filter: filters,
      });
      setSpas(response.data.content);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu khách sạn!");
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
        <div className="text-xl font-semibold">Danh sách spa</div>
        <Button onClick={() => setOpen(true)}>Thêm spa mới</Button>
        <CreateOrUpdateSpa
          dataUpdate={null}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
      <FormSearchSpa
        onSubmit={(data) => {
          console.log("Filter data:", data);
          setFilters(data);
          setPageNumber(1);
        }}
      />
      <ListSpa data={spas} isLoading={isLoading} limit={pageSize} />
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

export default SpaManagementPage;
