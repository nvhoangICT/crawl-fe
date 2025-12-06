import { FileSearch } from "lucide-react";

interface Props {
  title: string;
}

export const EmptyData: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex justify-center items-center h-full flex-col gap-4 py-20">
      <FileSearch className="text-gray-500" size={50} />
      <p className="text-gray-500 text-base font-medium">{title}</p>
    </div>
  );
};
