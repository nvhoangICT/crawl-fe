import { PaginationCustom } from "@/components/common/PaginationCustom";
import FormSearchRestaurant from "@/components/pages/restaurants-management/FormSearchRestaurant";
import { ListRestaurant } from "@/components/pages/restaurants-management/ListRestaurant";
import { UpdateRestaurant } from "@/components/pages/restaurants-management/UpdateRestaurant";
import { Button } from "@/components/ui/button";
import { RestaurantFormDataType } from "@/schemas/restaurantSchema";
import { restaurantService } from "@/services/restaurantService";
import useCommon from "@/store/useCommon";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RestaurantManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [restaurants, setRestaurants] = useState<RestaurantFormDataType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [filters, setFilters] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataRestaurant = async () => {
    setIsLoading(true);
    try {
      const response = await restaurantService.getAll({
        pageSize,
        pageNumber,
        filter: filters,  
      });
      setRestaurants(response.data.content);
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
        <div className="text-xl font-semibold">Danh sách khách sạn</div>

        <Button onClick={() => setOpen(true)}>Thêm nhà hàng mới</Button>
        <UpdateRestaurant
          dataUpdate={null}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
      <FormSearchRestaurant
        onSubmit={(data) => {
          console.log("Filter data:", data);
          setFilters(data);
          setPageNumber(1);
        }}
      />
      <ListRestaurant
        data={restaurants}
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

export default RestaurantManagementPage;
