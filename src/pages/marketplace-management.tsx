import { PaginationCustom } from "@/components/common/PaginationCustom";
import CreateOrUpdateMarketplace from "@/components/pages/marketplace-management/CreateOrUpdateMarketplace";
import FormSearchMarketplace from "@/components/pages/marketplace-management/FormSearchMarketplace";
import { ListMarketplace } from "@/components/pages/marketplace-management/ListMarketplace";
import { Button } from "@/components/ui/button";
import { marketplaceService } from "@/services/marketplaceService";
import useCommon from "@/store/useCommon";
import { Marketplace } from "@/types/marketplace";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MarketPlaceManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [filters, setFilters] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataRestaurant = async () => {
    setIsLoading(true);
    try {
      const response = await marketplaceService.getAll({
        pageSize,
        pageNumber,
        filter: filters,
      });
      setMarketplaces(response.data.content);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu cửa hàng!");
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
        <div className="text-xl font-semibold">Danh sách cửa hàng</div>
        <Button onClick={() => setOpen(true)}>Thêm cửa hàng mới</Button>
        <CreateOrUpdateMarketplace
          dataUpdate={null}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
      <FormSearchMarketplace
        onSubmit={(data) => {
          console.log("Filter data:", data);
          setFilters(data);
          setPageNumber(1);
        }}
      />
      <ListMarketplace
        data={marketplaces}
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
            setPageNumber(1);
          }}
          onPageChange={(page) => setPageNumber(page)}
          rowsPerPageOptions={[15, 30, 50]}
        />
      </div>
    </>
  );
};

export default MarketPlaceManagementPage;
