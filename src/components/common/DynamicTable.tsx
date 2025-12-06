import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TooltipCustom } from "@/components/common/TooltipCustom";
import { DialogConfirm } from "@/components/common/DialogConfirm";
import SkeletonTable from "@/components/common/SkeletonTable";
import { EmptyData } from "@/components/common/EmptyData";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  className?: string;
}

interface DynamicTableProps {
  columns: Column[];
  data: any[];
  isLoading: boolean;
  limit: number;
  onDelete: (id: string) => Promise<void>;
  UpdateComponent: React.FC<{
    open: boolean;
    onClose: () => void;
    data: any;
  }>;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  isLoading,
  limit,
  onDelete,
  UpdateComponent,
}) => {
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState<string>("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsLoadingDelete(true);
      await onDelete(id);
      toast.success("Xoá thành công");
      setOpenDialogConfirmDelete(false);
    } catch (err) {
      console.error(err);
      toast.error("Xoá thất bại");
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
                {columns.map((col) => (
                  <TableHead key={col.key} className={col.className}>
                    {col.label}
                  </TableHead>
                ))}
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonTable rows={limit} columns={columns.length + 2} />
              ) : data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render ? col.render(row) : row[col.key]}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <TooltipCustom content="Chỉnh sửa">
                          <SquarePen
                            className="text-blue-500 cursor-pointer"
                            size={18}
                            onClick={() => {
                              setDataUpdate(row);
                              setOpenUpdateDialog(true);
                            }}
                          />
                        </TooltipCustom>
                        <TooltipCustom content="Xoá">
                          <Trash2
                            className="text-red-500 cursor-pointer"
                            size={18}
                            onClick={() => {
                              setDataDeleteId(row.id);
                              setOpenDialogConfirmDelete(true);
                            }}
                          />
                        </TooltipCustom>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} className="text-center">
                    <EmptyData title="Không có dữ liệu" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>

      {/* Dialog Xác nhận Xoá */}
      <DialogConfirm
        open={openDialogConfirmDelete}
        onClose={() => setOpenDialogConfirmDelete(false)}
        onConfirm={() => handleDelete(dataDeleteId)}
        title="Xác nhận xoá"
        description="Bạn có chắc chắn muốn xoá mục này không?"
        isLoading={isLoadingDelete}
      />

      {/* Dialog Update */}
      <UpdateComponent
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        data={dataUpdate}
      />
    </div>
  );
};

export default DynamicTable;
