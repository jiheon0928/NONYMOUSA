import Image from "next/image";
import { ImageHandleProps } from "../../../typeprops.tsx/TypeProps";

const ImageHandle = ({ image }: ImageHandleProps) => {
  return (
    <Image
      src={image}
      alt="Product"
      layout="intrinsic"
      width={60}
      height={60}
      style={{ objectFit: "cover" }}
    />
  );
};

export default ImageHandle;
