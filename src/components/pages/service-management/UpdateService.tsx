import { MultiSelectComboBox } from "@/components/common/ComboBoxMuilti";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// Service schema based on the data structure
const serviceSchema = z.object({
  hinh_anh: z.string().optional(),
  ten_dich_vu: z.string().min(1, "Tên dịch vụ là bắt buộc"),
  mo_ta_ngan: z.string().optional(),
  mo_ta_chi_tiet: z.string().optional(),
  dia_diem: z.array(z.object({
    ten: z.string().min(1, "Tên địa điểm là bắt buộc"),
    dia_chi: z.string().min(1, "Địa chỉ là bắt buộc"),
  })).min(1, "Ít nhất 1 địa điểm"),
  diem_danh_gia: z.string().optional(),
  so_luong_danh_gia: z.string().optional(),
  gia_khoi_diem: z.string().optional(),
  gia_goc: z.string().optional(),
  gio_hoat_dong: z.array(z.object({
    ten: z.string().min(1, "Tên lịch là bắt buộc"),
    lich: z.string().min(1, "Lịch làm việc là bắt buộc"),
  })).optional(),
  co_so_vat_chat: z.array(z.string()).optional(),
  danh_muc: z.array(z.string()).optional(),
  tinh_nang_dac_biet: z.string().optional(),
  dich_vu: z.array(z.object({
    loai_dich_vu: z.string().min(1, "Loại dịch vụ là bắt buộc"),
    gia_khoi_diem: z.string().optional(),
    gia_goc: z.string().optional(),
    gia_chi_tiet: z.object({
      gia_trong_tuan: z.string().nullable().optional(),
      gia_cuoi_tuan: z.string().nullable().optional(),
      gia_tre_em: z.string().nullable().optional(),
      gia_nguoi_lon: z.string().nullable().optional(),
    }).optional(),
  })).optional(),
  bao_gom: z.array(z.string()).optional(),
  khong_bao_gom: z.array(z.string()).optional(),
  luu_y_truoc_khi_dat: z.string().optional(),
  chinh_sach_huy: z.string().optional(),
  huong_dan_su_dung: z.string().optional(),
  ngon_ngu: z.string().nullable().optional(),
});

// Infer TypeScript type from schema
type ServiceFormData = z.infer<typeof serviceSchema>;

// Props interface with proper typing
interface Props {
  onClose?: () => void;
  open?: boolean;
  service?: ServiceFormData;
  readonly?: boolean;
}

// Options for MultiSelectCombobox
const multiSelectOptions = {
  co_so_vat_chat: [
    { value: "phong_tam", label: "Phòng tắm" },
    { value: "wifi", label: "WiFi" },
    { value: "tra_thao_moc", label: "Trà thảo mộc" },
    { value: "dep_di_trong_nha", label: "Dép đi trong nhà" },
    { value: "phong_rieng", label: "Phòng riêng" },
    { value: "may_lanh", label: "Máy lạnh" },
  ],
  danh_muc: [
    { value: "Spa & Massage", label: "Spa & Massage" },
    { value: "Du lịch", label: "Du lịch" },
    { value: "Ẩm thực", label: "Ẩm thực" },
    { value: "Giải trí", label: "Giải trí" },
    { value: "Thể thao", label: "Thể thao" },
  ],
  bao_gom: [
    { value: "wifi", label: "WiFi" },
    { value: "tra_thao_moc", label: "Trà thảo mộc" },
    { value: "dep_di_trong_nha", label: "Dép đi trong nhà" },
    { value: "goi_dau", label: "Gội đầu" },
    { value: "massage_dau", label: "Massage đầu" },
    { value: "nuoc_uong", label: "Nước uống" },
    { value: "khăn_tắm", label: "Khăn tắm" },
  ],
  khong_bao_gom: [
    { value: "chi_phi_ca_nhan_khac", label: "Chi phí cá nhân khác" },
    { value: "tien_tip", label: "Tiền tip" },
    { value: "van_chuyen", label: "Vận chuyển" },
    { value: "an_uong", label: "Ăn uống" },
    { value: "thuoc_men", label: "Thuốc men" },
  ],
};

export function UpdateService({
  open,
  onClose,
  service,
  readonly,
}: Props) {
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      hinh_anh: service?.hinh_anh || "",
      ten_dich_vu: service?.ten_dich_vu || "",
      mo_ta_ngan: service?.mo_ta_ngan || "",
      mo_ta_chi_tiet: service?.mo_ta_chi_tiet || "",
      dia_diem: service?.dia_diem || [
        {
          ten: "",
          dia_chi: "",
        },
      ],
      diem_danh_gia: service?.diem_danh_gia || "",
      so_luong_danh_gia: service?.so_luong_danh_gia || "",
      gia_khoi_diem: service?.gia_khoi_diem || "",
      gia_goc: service?.gia_goc || "",
      gio_hoat_dong: service?.gio_hoat_dong || [
        {
          ten: "",
          lich: "",
        },
      ],
      co_so_vat_chat: service?.co_so_vat_chat || [],
      danh_muc: service?.danh_muc || [],
      tinh_nang_dac_biet: service?.tinh_nang_dac_biet || "",
      dich_vu: service?.dich_vu || [
        {
          loai_dich_vu: "",
          gia_khoi_diem: "",
          gia_goc: "",
          gia_chi_tiet: {
            gia_trong_tuan: null,
            gia_cuoi_tuan: null,
            gia_tre_em: null,
            gia_nguoi_lon: null,
          },
        },
      ],
      bao_gom: service?.bao_gom || [],
      khong_bao_gom: service?.khong_bao_gom || [],
      luu_y_truoc_khi_dat: service?.luu_y_truoc_khi_dat || "",
      chinh_sach_huy: service?.chinh_sach_huy || "",
      huong_dan_su_dung: service?.huong_dan_su_dung || "",
      ngon_ngu: service?.ngon_ngu || null,
    },
    mode: "onChange",
  });

  const {
    fields: diaDiemFields,
    append: appendDiaDiem,
    remove: removeDiaDiem,
  } = useFieldArray({
    control: form.control,
    name: "dia_diem",
  });

  const {
    fields: gioHoatDongFields,
    append: appendGioHoatDong,
    remove: removeGioHoatDong,
  } = useFieldArray({
    control: form.control,
    name: "gio_hoat_dong",
  });

  const {
    fields: dichVuFields,
    append: appendDichVu,
    remove: removeDichVu,
  } = useFieldArray({
    control: form.control,
    name: "dich_vu",
  });

  const onFormSubmit = (data: ServiceFormData) => {
    try {
      console.log("Submitted data:", JSON.stringify(data, null, 2));
      form.reset();
      onClose?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6"
          >
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ten_dich_vu"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Tên dịch vụ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên dịch vụ"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hinh_anh"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Hình ảnh</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="URL hình ảnh"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mo_ta_ngan"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Mô tả ngắn</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả ngắn về dịch vụ"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mo_ta_chi_tiet"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Mô tả chi tiết</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả chi tiết về dịch vụ"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Rating and Price */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="diem_danh_gia"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Điểm đánh giá</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: 4.1/5"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="so_luong_danh_gia"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Số lượng đánh giá</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: 72 đánh giá"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gia_khoi_diem"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Giá khởi điểm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: 131250"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gia_goc"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Giá gốc</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="VD: 143000"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Categories and Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="danh_muc"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <MultiSelectComboBox
                        placeholder="Chọn danh mục..."
                        options={multiSelectOptions.danh_muc}
                        value={field.value || []}
                        onChange={(values: any) => field.onChange(values)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="co_so_vat_chat"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Cơ sở vật chất</FormLabel>
                    <FormControl>
                      <MultiSelectComboBox
                        placeholder="Chọn cơ sở vật chất..."
                        options={multiSelectOptions.co_so_vat_chat}
                        value={field.value || []}
                        onChange={(values: any) => field.onChange(values)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tinh_nang_dac_biet"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Tính năng đặc biệt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả tính năng đặc biệt"
                      {...field}
                      disabled={readonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Địa điểm */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Địa điểm</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendDiaDiem({ ten: "", dia_chi: "" })}
                  disabled={readonly}
                  size={"sm"}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Thêm địa điểm
                </Button>
              </div>
              {diaDiemFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-md">
                  <FormField
                    control={form.control}
                    name={`dia_diem.${index}.ten`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên địa điểm</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tên địa điểm"
                            {...field}
                            disabled={readonly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`dia_diem.${index}.dia_chi`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Địa chỉ"
                            {...field}
                            disabled={readonly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeDiaDiem(index)}
                      disabled={readonly}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Giờ hoạt động */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Giờ hoạt động</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendGioHoatDong({ ten: "", lich: "" })}
                  disabled={readonly}
                  size={"sm"}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Thêm lịch
                </Button>
              </div>
              {gioHoatDongFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-md">
                  <FormField
                    control={form.control}
                    name={`gio_hoat_dong.${index}.ten`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên lịch</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="VD: La Spa 38"
                            {...field}
                            disabled={readonly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`gio_hoat_dong.${index}.lich`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lịch làm việc</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="VD: Thứ Hai - Chủ Nhật: 09:00 - 23:00"
                            {...field}
                            disabled={readonly}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeGioHoatDong(index)}
                      disabled={readonly}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dịch vụ */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Dịch vụ</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendDichVu({
                    loai_dich_vu: "",
                    gia_khoi_diem: "",
                    gia_goc: "",
                    gia_chi_tiet: {
                      gia_trong_tuan: null,
                      gia_cuoi_tuan: null,
                      gia_tre_em: null,
                      gia_nguoi_lon: null,
                    },
                  })}
                  disabled={readonly}
                  size={"sm"}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Thêm dịch vụ
                </Button>
              </div>
              {dichVuFields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`dich_vu.${index}.loai_dich_vu`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loại dịch vụ</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="VD: Hair Shampoo & Head Massage (30 mins)"
                              {...field}
                              disabled={readonly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`dich_vu.${index}.gia_khoi_diem`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá khởi điểm</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="VD: 173250"
                              {...field}
                              disabled={readonly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`dich_vu.${index}.gia_goc`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá gốc</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="VD: 217800"
                              {...field}
                              disabled={readonly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Giá chi tiết */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name={`dich_vu.${index}.gia_chi_tiet.gia_trong_tuan`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá trong tuần</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Giá trong tuần"
                              {...field}
                              value={field.value || ""}
                              disabled={readonly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`dich_vu.${index}.gia_chi_tiet.gia_cuoi_tuan`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá cuối tuần</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Giá cuối tuần"
                              {...field}
                              value={field.value || ""}
                              disabled={readonly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`dich_vu.${index}.gia_chi_tiet.gia_tre_em`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá trẻ em</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Giá trẻ em"
                              {...field}
                              value={field.value || ""}
                              disabled={readonly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`dich_vu.${index}.gia_chi_tiet.gia_nguoi_lon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá người lớn</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Giá người lớn"
                              {...field}
                              value={field.value || ""}
                              disabled={readonly}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeDichVu(index)}
                      disabled={readonly}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bao gồm và Không bao gồm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bao_gom"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Bao gồm</FormLabel>
                    <FormControl>
                      <MultiSelectComboBox
                        placeholder="Chọn dịch vụ bao gồm..."
                        options={multiSelectOptions.bao_gom}
                        value={field.value || []}
                        onChange={(values: any) => field.onChange(values)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="khong_bao_gom"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Không bao gồm</FormLabel>
                    <FormControl>
                      <MultiSelectComboBox
                        placeholder="Chọn dịch vụ không bao gồm..."
                        options={multiSelectOptions.khong_bao_gom}
                        value={field.value || []}
                        onChange={(values: any) => field.onChange(values)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Policies and Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="luu_y_truoc_khi_dat"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Lưu ý trước khi đặt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Lưu ý quan trọng trước khi đặt dịch vụ"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chinh_sach_huy"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Chính sách hủy</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Chính sách hủy và hoàn tiền"
                        {...field}
                        disabled={readonly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="huong_dan_su_dung"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Hướng dẫn sử dụng</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hướng dẫn chi tiết cách sử dụng dịch vụ"
                      {...field}
                      disabled={readonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ngon_ngu"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Ngôn ngữ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: Tiếng Việt, Tiếng Anh"
                      {...field}
                      value={field.value || ""}
                      disabled={readonly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={readonly}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={readonly}>
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
