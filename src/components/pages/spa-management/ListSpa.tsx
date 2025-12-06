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
// import { CreateOrUpdateUser } from "./CreateOrUpdateUser";
import { DialogConfirm } from "@/components/common/DialogConfirm";
import { spaService } from "@/services/spaService";
import useCommon from "@/store/useCommon";
import { Spa } from "@/types/spa";
import { toast } from "react-toastify";
import CreateOrUpdateSpa from "./CreateOrUpdateSpa";

interface Props {
  data: any[];
  isLoading: boolean;
  limit: number;
}

export const ListSpa: React.FC<Props> = ({ data, isLoading, limit }) => {
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState<string>("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { isRefresh, setIsRefresh } = useCommon();
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<Spa | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsLoadingDelete(true);
      await spaService.delete(id);
      setOpenDialogConfirmDelete(false);

      toast.success("Xóa spa thành công");
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error);
      toast.error("Xóa spa thất bại");
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
                <TableHead>Ảnh</TableHead>
                <TableHead>Tên spa</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Tỉnh/Thành phố</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonTable rows={limit} columns={7} />
              ) : data.length > 0 ? (
                data.map((restaurant, index) => (
                  <TableRow key={restaurant.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {restaurant.imageUrl ? (
                        <img
                          src={restaurant.imageUrl}
                          alt={restaurant.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        "Chưa có ảnh"
                      )}
                    </TableCell>
                    <TableCell>{restaurant.name}</TableCell>
                    <TableCell>{restaurant.address}</TableCell>
                    <TableCell>{restaurant.province}</TableCell>
                    <TableCell>{restaurant.phone || "Chưa cập nhật"}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <div
                          id={`cell__restaurant--button--view-${restaurant.id}`}
                        >
                          <TooltipCustom content="Xem chi tiết">
                            <Eye
                              className="text-blue-500 cursor-pointer"
                              size={20}
                              onClick={() => {
                                // Implement view details logic here
                              }}
                            />
                          </TooltipCustom>
                        </div>
                        <div
                          id={`cell__restaurant--button--update-${restaurant.id}`}
                        >
                          <TooltipCustom content="Chỉnh sửa">
                            <SquarePen
                              className="text-blue-500 cursor-pointer"
                              size={18}
                              onClick={() => {
                                setOpenUpdateDialog(true);
                                setDataUpdate(restaurant);
                              }}
                            />
                          </TooltipCustom>
                        </div>
                        <div
                          id={`cell__restaurant--button--delete-${restaurant.id}`}
                        >
                          <TooltipCustom content="Xoá">
                            <Trash2
                              className="text-red-500 cursor-pointer"
                              size={18}
                              onClick={() => {
                                setOpenDialogConfirmDelete(true);
                                setDataDeleteId(String(restaurant.id || ""));
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
                    <EmptyData title="Chưa có spa nào" />
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
        title="Xác nhận xóa spa"
        description="Bạn có chắc chắn muốn xóa spa này không?"
        isLoading={isLoadingDelete}
      />
      <CreateOrUpdateSpa
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        dataUpdate={dataUpdate}
      />
    </div>
  );
};
