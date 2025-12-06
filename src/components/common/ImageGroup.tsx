import { isImageFile, isVideoFile } from "@/lib/utils/media";
import { FileIcon } from "lucide-react";

interface MediaItemProps {
  src?: string;
  className?: string;
  alt?: string;
  [key: string]: any;
}

interface ImageGroupProps {
  images: string[];
}

// Hàm helper để render MediaItems
const renderMediaItems = (images: string[], count: number) => {
  return images
    .slice(0, count)
    .map((src, index) => (
      <MediaItem
        key={index}
        src={src}
        className="w-full aspect-video object-cover rounded-md"
        alt={`Image ${index + 1}`}
      />
    ));
};

export const ImageGroup = ({ images }: ImageGroupProps) => {
  const imageCount = images.length;

  return (
    <div className="relative w-full h-full">
      {imageCount === 1 && (
        <MediaItem
          src={images[0]}
          className="w-full aspect-video object-cover rounded-md"
          alt="Single Image"
        />
      )}

      {imageCount === 2 && (
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          {renderMediaItems(images, 2)}
        </div>
      )}

      {imageCount === 3 && (
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          {renderMediaItems(images, 3)}
        </div>
      )}

      {imageCount >= 4 && (
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          {renderMediaItems(images, 4)}
        </div>
      )}
    </div>
  );
};

export const MediaItem = ({ src = "", className, alt,...props }: MediaItemProps) => {
  if (!src) return null;

  if (isImageFile(src)) {
    return <img src={src} className={className} alt={alt} {...props} />;
  } else if (isVideoFile(src)) {
    return <video src={src} className={className} {...props} />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <FileIcon className="w-16 h-16 text-gray-400" />
    </div>
  );
};
