import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import JsonEditor from "@/components/common/JsonEditor"
import { useState } from "react"
import useAuth from "@/store/useAuth"
import api from "@/config/axios"

const schema = z.object({
  url: z.string().url({ message: "URL không hợp lệ" }),
  source: z.string().min(1, { message: "Chọn nguồn" }),
  category: z.string().min(1, { message: "Chọn lĩnh vực" }),
  data_structure: z
    .string()
    .refine(
      (val) => {
        if (!val.trim()) return true;
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Data Structure phải là JSON hợp lệ hoặc để trống" }
    ),
});

type FormData = z.infer<typeof schema>;

const CRAWL_API_URL =
  import.meta.env.VITE_CRAWL_API_URL + "/api/crawl";

const CrawlDataPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentUser } = useAuth();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: "",
      source: "",
      category: "",
      data_structure: "",
    },
  });

  const handleSubmit = async (values: FormData) => {
    setIsProcessing(true);
    try {
      const token =
        localStorage.getItem("accessToken") ??
        sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Bạn chưa đăng nhập hoặc token không tồn tại");
      }

      const parsedDataStructure = values.data_structure.trim()
        ? JSON.parse(values.data_structure)
        : undefined;

      const payload = {
        category: values.category,
        site: values.source,
        url: values.url,
        crawledBy: currentUser?.id || (currentUser as any)?.userId,
        crawlerName: currentUser?.fullName || (currentUser as any)?.username,
        options: {
          headless: true,
          maxPages: 3,
        },
        ...(parsedDataStructure ? { data_structure: parsedDataStructure } : {}),
      };

      // Use shared axios instance so 401 will auto-refresh token & retry
      const result = await api
        .post(CRAWL_API_URL, payload)
        .then((r: any) => r?.data ?? r);
      toast.success(
        result?.message || "Crawl dữ liệu thành công, vui lòng kiểm tra kết quả"
      );
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi thực hiện crawl dữ liệu";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Crawl dữ liệu</h2>
        <p className="text-muted-foreground">
          Thu thập dữ liệu từ các nguồn bên ngoài
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Thiết lập crawl dữ liệu</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL cần crawl</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                {...form.register("url")}
                disabled={isProcessing}
              />
              {form.formState.errors.url && (
                <p className="text-sm text-red-500">{form.formState.errors.url.message}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Trang nguồn</Label>
                <Select
                  value={form.watch("source")}
                  onValueChange={(val) =>
                    form.setValue("source", val, { shouldValidate: true })
                  }
                  disabled={isProcessing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trang nguồn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="googlemaps">Google Maps</SelectItem>
                    <SelectItem value="klook">Klook</SelectItem>
                    <SelectItem value="traveloka">Traveloka</SelectItem>
                    <SelectItem value="booking">Booking.com</SelectItem>
                    <SelectItem value="agoda">Agoda</SelectItem>
                    <SelectItem value="ivivu">Ivivu</SelectItem>
                    <SelectItem value="mytour">Mytour</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.source && (
                  <p className="text-sm text-red-500">{form.formState.errors.source.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Lĩnh vực</Label>
                <Select
                  value={form.watch("category")}
                  onValueChange={(val) =>
                    form.setValue("category", val, { shouldValidate: true })
                  }
                  disabled={isProcessing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lĩnh vực" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotels">Khách sạn</SelectItem>
                    <SelectItem value="restaurants">Nhà hàng</SelectItem>
                    <SelectItem value="landmarks">Địa điểm tham quan</SelectItem>
                    <SelectItem value="maps">Bản đồ</SelectItem>
                    <SelectItem value="transportation">Vé xe</SelectItem>
                    <SelectItem value="entertainment">Khu vui chơi</SelectItem>
                    <SelectItem value="others">Khác</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              
              <JsonEditor
                label="Data Structure (JSON Editor)"
                value={form.watch("data_structure")}
                onChange={(val) => form.setValue("data_structure", val)}
                onImportFile={(val) => form.setValue("data_structure", val)}
              />
              {form.formState.errors.data_structure && (
                <p className="text-sm text-red-500">{form.formState.errors.data_structure.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Processing Dialog */}
      <Dialog open={isProcessing} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Đang xử lý...</DialogTitle>
            <DialogDescription>
              Hệ thống đang thu thập dữ liệu từ nguồn đã chọn. Vui lòng đợi.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrawlDataPage;
