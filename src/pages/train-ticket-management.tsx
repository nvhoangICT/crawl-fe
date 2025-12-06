import { PaginationCustom } from "@/components/common/PaginationCustom";
import FormSearchTrainTicket from "@/components/pages/train-ticket-management/FormSearchTrainTicket";
import { ListTrainTicket } from "@/components/pages/train-ticket-management/ListTrainTicket";
import UpdateTrainTicket from "@/components/pages/train-ticket-management/UpdateTrainTicket";
import { Button } from "@/components/ui/button";
import { trainTicketService } from "@/services/trainTicketService";
import useCommon from "@/store/useCommon";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TrainTicketManagementPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [trainTickets, setTrainTicket] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [filters, setFilters] = useState<any>({});
  const [pageSize, setPageSize] = useState<number>(15);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isRefresh } = useCommon();

  const fetchDataRestaurant = async () => {
    setIsLoading(true);
    try {
      const response = await trainTicketService.getAll({
        pageSize,
        pageNumber,
        filter: filters,
      });
      setTrainTicket(response.data.content);
      setTotalCount(response.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch news data:", error);
      toast.error("Không thể tải dữ liệu vé tàu!");
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
        <div className="text-xl font-semibold">Danh sách vé tàu</div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Thêm vé tàu mới
        </Button>
        <UpdateTrainTicket
          dataUpdate={null}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
      <FormSearchTrainTicket
        onSubmit={(data) => {
          console.log("Filter data:", data);
          setFilters(data);
          setPageNumber(1);
        }}
      />
      <div className="">
        <ListTrainTicket
          data={trainTickets}
          isLoading={isLoading}
          limit={pageSize}
        />
      </div>
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

export default TrainTicketManagementPage;
