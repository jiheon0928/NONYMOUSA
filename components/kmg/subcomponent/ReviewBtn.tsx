import { TextColor } from "@/app/types/Colors";

type ReviewBtnProps = {
  isSelect: boolean;
  title: string;
  clickFunc: () => void;
};
const ReviewBtn = ({ clickFunc, isSelect, title }: ReviewBtnProps) => {
  return (
    <span
      onClick={clickFunc}
      className={`cursor-pointer hover:text-black font-medium transition-colors duration-700 ${
        isSelect ? "text-black" : "text-gray-400"
      }`}
    >
      {title}
    </span>
  );
};

export default ReviewBtn;
