import Image from "next/image";
type BaseImageProps = {
  img: string;
  className: string;
  func?: () => void;
};
const BaseImage = ({ className, img, func }: BaseImageProps) => {
  return (
    <figure style={{ position: "relative" }} className={className}>
      <Image
        onMouseOver={func}
        style={{ objectFit: "cover" }}
        sizes="100%"
        fill
        src={img}
        alt=""
      />
    </figure>
  );
};

export default BaseImage;
