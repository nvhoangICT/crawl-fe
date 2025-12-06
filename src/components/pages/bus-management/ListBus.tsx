"use client";

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
import { Eye, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Bus } from "@/types/bus"; // Import the Bus type
import useCommon from "@/store/useCommon";
import { DialogConfirm } from "@/components/common/DialogConfirm";
import { busService } from "@/services/busService"; // Import the busService
import { toast } from "react-toastify";
import CreateOrUpdateBus from "./CreateOrUpdateBus";

interface Props {
  data: Bus[];
  isLoading: boolean;
  limit: number;
}

export const ListBus: React.FC<Props> = ({ data, isLoading, limit }) => {
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState<string>("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { isRefresh, setIsRefresh } = useCommon();
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<Bus | null>(null);

  const handleView = (bus: Bus) => {
    // Placeholder for view action
    console.log("View bus:", bus);
  };

  const handleDelete = async (documentDeleteId: string) => {
    try {
      setIsLoadingDelete(true);
      await busService.delete(documentDeleteId);
      setOpenDialogConfirmDelete(false);
      toast.success("Xóa xe buýt thành công");
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error(error);
      toast.error("Xóa xe buýt thất bại");
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
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>Điểm khởi hành</TableHead>
                <TableHead>Điểm đến</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonTable rows={limit} columns={7} />
              ) : data.length > 0 ? (
                data.map((bus, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{bus.providerName || "Chưa cập nhật"}</TableCell>
                    <TableCell>{bus.departure || "Chưa cập nhật"}</TableCell>
                    <TableCell>{bus.destination || "Chưa cập nhật"}</TableCell>
                    <TableCell>{bus.timeRange || "Chưa cập nhật"}</TableCell>
                    <TableCell>{bus.price || "Chưa cập nhật"}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <div
                          id={`cell__bus-document--button--view-${index}`}
                        >
                          <TooltipCustom content="Xem chi tiết">
                            <Eye
                              className="text-blue-500 cursor-pointer"
                              size={20}
                              onClick={() => handleView(bus)}
                            />
                          </TooltipCustom>
                        </div>
                        <div
                          id={`cell__bus-document--button--update-${index}`}
                        >
                          <TooltipCustom content="Chỉnh sửa">
                            <SquarePen
                              className="text-blue-500 cursor-pointer"
                              size={18}
                              onClick={() => {
                                setOpenUpdateDialog(true);
                                setDataUpdate(bus);
                              }}
                            />
                          </TooltipCustom>
                        </div>
                        <div
                          id={`cell__bus-document--button--delete-${index}`}
                        >
                          <TooltipCustom content="Xóa">
                            <Trash2
                              className="text-red-500 cursor-pointer"
                              size={18}
                              onClick={() => {
                                setOpenDialogConfirmDelete(true);
                                setDataDeleteId(String(bus.id || ""));
                              }}
                            />
                          </TooltipCustom>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <EmptyData title="Chưa có xe buýt nào" />
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
        title="Xác nhận xóa xe buýt"
        description="Bạn có chắc chắn muốn xóa xe buýt này không?"
        isLoading={isLoadingDelete}
      />
      <CreateOrUpdateBus
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        dataUpdate={dataUpdate}
      />
    </div>
  );
};

export default ListBus;