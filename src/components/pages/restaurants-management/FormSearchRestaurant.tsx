import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";

export interface restaurantSearchTypeProps {
  name?: string | null;
  address?: string | null;
  province?: string | null;
}

const FormSearchRestaurant: React.FC<{
  onSubmit: (data: restaurantSearchTypeProps) => void;
}> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      address: "",
      province: "",
    },
  });

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tên văn bản */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Tên nhà hàng
            </Label>
            <Input
              className="h-[45px] w-full px-3 rounded-lg py-2 text-sm"
              type="text"
              placeholder="Tìm kiếm theo tên văn bản"
              {...register("name")}
            />
          </div>

          {/* Địa chỉ */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="symbol" className="text-sm font-medium">
              Địa chỉ
            </Label>
            <Input
              className="h-[45px] w-full px-3 rounded-lg py-2 text-sm"
              type="text"
              placeholder="Tìm kiếm theo số ký hiệu"
              {...register("address")}
            />
          </div>
          {/* Tỉnh thành */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="symbol" className="text-sm font-medium">
              Tỉnh /Thành phố
            </Label>
            <Input
              className="h-[45px] w-full px-3 rounded-lg py-2 text-sm"
              type="text"
              placeholder="Tìm kiếm theo số ký hiệu"
              {...register("province")}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              handleSubmit(onSubmit)();
            }}
          >
            Làm mới
          </Button>
          <Button type="submit">Tìm kiếm</Button>
        </div>
      </form>
    </Card>
  );
};

export default FormSearchRestaurant;
