import { DialogConfirm } from "@/components/common/DialogConfirm";
import { EmptyData } from "@/components/common/EmptyData";
import SkeletonTable from "@/components/common/SkeletonTable";
import { TooltipCustom } from "@/components/common/TooltipCustom";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { trainTicketService } from "@/services/trainTicketService";
import useCommon from "@/store/useCommon";
import { TrainTicket } from "@/types/train-ticket";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UpdateTrainTicket from "./UpdateTrainTicket";

interface Props {
  data: TrainTicket[];
  isLoading: boolean;
  limit: number;
}

export const ListTrainTicket: React.FC<Props> = ({
  data,
  isLoading,
  limit,
}) => {
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState<string>("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { isRefresh, setIsRefresh } = useCommon();
  const [openCreateOrUpdate, setOpenUpdateDialog] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<TrainTicket | null>(null);
  // const [action, setAction] = useState(ACTION_DATA.UPDATE);

  const handleDelete = async (id: string) => {
    try {
      setIsLoadingDelete(true);
      await trainTicketService.delete(id);
      setOpenDialogConfirmDelete(false);

      toast.success("Xóa vé tàu thành công");
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error);
      toast.error("Xóa vé tàu thất bại");
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <div>
      <Card>
        <ScrollArea className="w-full">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[50px] text-center">STT</TableHead>
                <TableHead>Mã vé</TableHead>
                <TableHead>Tuyến đường</TableHead>
                <TableHead>Ngày đi</TableHead>
                <TableHead>Khoảng cách</TableHead>
                <TableHead>Tần suất</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonTable rows={limit} columns={7} />
              ) : data.length > 0 ? (
                data.map((ticket, index) => {
                  return (
                    <TableRow key={ticket.id || index}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{ticket.id || "N/A"}</TableCell>
                      <TableCell>{ticket.route}</TableCell>
                      <TableCell>
                        {ticket.createdAt
                          ? formatDate(ticket.createdAt)
                          : "N/A"}
                      </TableCell>
                      <TableCell>{ticket.distance} Km</TableCell>
                      <TableCell>{ticket.frequency} chuyến/ngày</TableCell>
                      <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                          <div id={`cell__train-ticket--button--view-${index}`}>
                            <TooltipCustom content="Xem chi tiết">
                              <Eye
                                className="text-blue-500 cursor-pointer"
                                size={20}
                                onClick={() => {
                                  setOpenUpdateDialog(true);
                                  setDataUpdate(ticket);
                                  // setAction(ACTION_DATA.VIEW);
                                }}
                              />
                            </TooltipCustom>
                          </div>
                          <div
                            id={`cell__train-ticket--button--update-${index}`}
                          >
                            <TooltipCustom content="Chỉnh sửa">
                              <SquarePen
                                className="text-blue-500 cursor-pointer"
                                size={18}
                                onClick={() => {
                                  setOpenUpdateDialog(true);
                                  setDataUpdate(ticket);
                                  // setAction(ACTION_DATA.UPDATE);
                                }}
                              />
                            </TooltipCustom>
                          </div>
                          <div
                            id={`cell__train-ticket--button--delete-${index}`}
                          >
                            <TooltipCustom content="Xoá">
                              <Trash2
                                className="text-red-500 cursor-pointer"
                                size={18}
                                onClick={() => {
                                  setOpenDialogConfirmDelete(true);
                                  setDataDeleteId(String(ticket.id || ""));
                                }}
                              />
                            </TooltipCustom>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    <EmptyData title="Chưa có vé tàu nào" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
      <DialogConfirm
        open={openDialogConfirmDelete}
        onClose={() => setOpenDialogConfirmDelete(false)}
        onConfirm={() => handleDelete(dataDeleteId)}
        title="Xác nhận xóa vé tàu"
        description="Bạn có chắc chắn muốn xóa vé tàu này không?"
        isLoading={isLoadingDelete}
      />
      <UpdateTrainTicket
        open={openCreateOrUpdate}
        onClose={() => setOpenUpdateDialog(false)}
        dataUpdate={dataUpdate}
      />
    </div>
  );
};
