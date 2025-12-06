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
import UpdateHotel from "./updateHotel";
import { Hotel } from "@/types/hotel";
import useCommon from "@/store/useCommon";
import { DialogConfirm } from "@/components/common/DialogConfirm";
import { hotelService } from "@/services/hotelService";
import { toast } from "react-toastify";

interface Props {
  data: Hotel[];
  isLoading: boolean;
  limit: number;
}

export const ListHotel: React.FC<Props> = ({ data, isLoading, limit }) => {
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState<string>("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { isRefresh, setIsRefresh } = useCommon();
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<Hotel | null>(null);

  const handleView = (hotel: Hotel) => {
    // Placeholder for view action
    console.log("View hotel:", hotel);
  };

  const handleDelete = async (documentDeleteId: string) => {
    try {
      setIsLoadingDelete(true);
      await hotelService.delete(documentDeleteId);
      setOpenDialogConfirmDelete(false);

      toast.success("Xóa khách sạn thành công");
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error);
      toast.error("Xóa khách sạn thất bại");
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
                <TableHead>Tên khách sạn</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Tỉnh/Thành phố</TableHead>
                <TableHead>Quốc gia</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonTable rows={limit} columns={8} />
              ) : data.length > 0 ? (
                data.map((hotel, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-16 h-16 object-cover"
                      />
                    </TableCell>
                    <TableCell className="text-center">{hotel.name}</TableCell>
                    <TableCell>{hotel.address}</TableCell>
                    <TableCell>{hotel.province}</TableCell>
                    <TableCell>{hotel.country}</TableCell>
                    <TableCell className="text-center">
                      {hotel.phone || "Chưa cập nhật"}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <div
                          id={`cell__executive-document--button--view-${index}`}
                        >
                          <TooltipCustom content="Xem chi tiết">
                            <Eye
                              className="text-blue-500 cursor-pointer"
                              size={20}
                              onClick={() => handleView(hotel)}
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
                                setDataUpdate(hotel);
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
                                setOpenDialogConfirmDelete(true);
                                setDataDeleteId(String(hotel.id || ""));
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
      </Card>
      <DialogConfirm
        open={openDialogConfirmDelete}
        onClose={() => setOpenDialogConfirmDelete(false)}
        onConfirm={() => handleDelete(dataDeleteId)}
        title="Xác nhận xóa khách sạn"
        description="Bạn có chắc chắn muốn xóa khách sạn này không?"
        isLoading={isLoadingDelete}
      />
      <UpdateHotel
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        dataUpdate={dataUpdate}
      />
    </div>
  );
};
