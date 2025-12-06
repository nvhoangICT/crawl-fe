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
import { attractionService } from "@/services/attractionService";
import useCommon from "@/store/useCommon";
import { AttractionType } from "@/types/attractionType";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UpdateAttraction from "./UpdateAttractionDialog";

interface Props {
  data: AttractionType[];
  isLoading: boolean;
  limit: number;
}

export const AttractionListing: React.FC<Props> = ({
  data,
  isLoading,
  limit,
}) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<AttractionType | null>(null);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const { isRefresh, setIsRefresh } = useCommon();

  const handleView = (id: string) => {
    // Placeholder for view action
    console.log("View hotel:", id);
  };

  const handleDelete = async (id: string) => {
    try {
      await attractionService.delete(id);
      toast.success("Xoá địa điểm thuê xe thành công!");
      setOpenConfirmDelete(false);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error("Failed to delete motobike rental:", error);
      toast.error("Không thể xoá địa điểm thuê xe!");
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
                <TableHead>Tên</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonTable rows={limit} columns={6} />
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.mobilePhone}</TableCell>
                    <TableCell>{item.price || ""}</TableCell>

                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <div
                          id={`cell__executive-document--button--view-${index}`}
                        >
                          <TooltipCustom content="Xem chi tiết">
                            <Eye
                              className="text-blue-500 cursor-pointer"
                              size={20}
                              onClick={() => handleView(item.id)}
                            />
                          </TooltipCustom>
                        </div>
                        <div
                          id={`cell__executive-document--button--update-${index}`}
                        >
                          <TooltipCustom content="Chỉnh sửa">
                            <SquarePen
                              className="text-blue-500 cursor-pointer"
                              size={18}
                              onClick={() => {
                                setOpenUpdateDialog(true);
                                setDataUpdate(item);
                              }}
                            />
                          </TooltipCustom>
                        </div>
                        <div
                          id={`cell__executive-document--button--delete-${index}`}
                        >
                          <TooltipCustom content="Xoá">
                            <Trash2
                              className="text-red-500 cursor-pointer"
                              size={18}
                              onClick={() => {
                                setIdToDelete(item.id);
                                setOpenConfirmDelete(true);
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
                  <TableCell colSpan={8} className="text-center">
                    <EmptyData title="Chưa có khách sạn nào" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <UpdateAttraction
          open={openUpdateDialog}
          onClose={() => setOpenUpdateDialog(false)}
          attractionDetail={dataUpdate}
        />
        <DialogConfirm
          description="Bạn có chắc chắn muốn xoá địa điểm thuê xe này không?"
          title="Xoá địa điểm thuê xe"
          open={openConfirmDelete}
          onClose={() => setOpenConfirmDelete(false)}
          isLoading={false}
          onConfirm={() => handleDelete(idToDelete)}
        />
      </Card>
    </div>
  );
};
