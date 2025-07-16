import Image from "next/image";
import React, { useEffect, useState } from "react";

const ServiceImages = ({ service }: { service: any }) => {
  const [mainImage, setMainImage] = useState<string | null>(null);

  // Update main image when service result is available
  useEffect(() => {
    if (service?.result?.imageUrls?.length) {
      setMainImage(service.result.imageUrls[0]);
    }
  }, [service?.result?.imageUrls]);

  const handleThumbnailClick = (clickedImage: string) => {
    if (clickedImage === mainImage) return;
    setMainImage(clickedImage);
  };

  return (
    <div className="w-full flex gap-4">
      {/* Thumbnails on the left */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[620px]">
        {service?.result?.imageUrls
          ?.filter((img: string) => img !== mainImage)
          .map((img: string, index: number) => (
            <div
              key={index}
              className="w-16 h-16 relative cursor-pointer flex-shrink-0"
              onClick={() => handleThumbnailClick(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index}`}
                layout="fill"
                objectFit="cover"
                className="rounded-[5px] border"
              />
            </div>
          ))}
      </div>

      {/* Main image */}
      {mainImage && (
        <div className="relative flex-1 max-w-[800px]">
          <Image
            src={mainImage}
            alt="Main"
            width={800}
            height={620}
            className="rounded-[5px]"
          />
        </div>
       
      )}
    </div>
  );
};

export default ServiceImages;
