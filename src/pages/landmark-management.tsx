import { PaginationCustom } from "@/components/common/PaginationCustom";
import CreateOrUpdateLandmark from "@/components/pages/landmark-management/CreateOrUpdateLandmark";
import FormSearchLandMark from "@/components/pages/landmark-management/FormSearchLandmark";
import { ListLandmark } from "@/components/pages/landmark-management/ListLandmark";
import { Button } from "@/components/ui/button";
import { landmarkService } from "@/services/landmarkService";
import useCommon from "@/store/useCommon";
import { Landmark } from "@/types/landmark";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LandmarkManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [filters, setFilters] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataRestaurant = async () => {
    setIsLoading(true);
    try {
      const response = await landmarkService.getAll({
        pageSize,
        pageNumber,
        filter: filters,
      });
      setLandmarks(response.data.content);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu địa điểm tham quan!");
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
        <div className="text-xl font-semibold">
          Danh sách địa điểm tham quan
        </div>
        <Button onClick={() => setOpen(true)}>
          Thêm địa điểm tham quan mới
        </Button>
        <CreateOrUpdateLandmark
          dataUpdate={null}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
      <FormSearchLandMark
        onSubmit={(data) => {
          console.log("Filter data:", data);
          setFilters(data);
          setPageNumber(1);
        }}
      />
      <ListLandmark data={landmarks} isLoading={isLoading} limit={pageSize} />
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

export default LandmarkManagementPage;
