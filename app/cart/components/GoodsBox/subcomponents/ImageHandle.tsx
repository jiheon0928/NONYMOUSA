import Image from "next/image";
import { ImageHandleProps } from "../../../typeprops.tsx/TypeProps";

const ImageHandle = ({ image }: ImageHandleProps) => {
  return (
    <div className="w-24 h-24 relative">
      <Image
        src={image}
        alt="Product"
        layout="fill"
        className="object-cover" // object-cover를 사용하여 이미지를 크기에 맞게 조정
      />
    </div>
  );
};

export default ImageHandle;
