import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Loader2, TriangleAlert } from "lucide-react";
interface Props {
  onConfirm: () => void;
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
}
export const DialogConfirm = ({
  onConfirm,
  title,
  description,
  open,
  onClose,
  isLoading,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-[28px] font-semibold ">
            {title}
          </AlertDialogTitle>
          <div className="flex items-center justify-center">
            <TriangleAlert className="w-20 h-20 text-orange-500" />
          </div>
          <AlertDialogDescription className="text-center font-normal ">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-center ">
          <AlertDialogCancel onClick={onClose}>Huỷ</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Xác nhận"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
