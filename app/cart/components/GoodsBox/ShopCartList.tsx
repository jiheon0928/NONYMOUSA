import { ReactElement } from "react";
import ButtonText from "./ButtonText";
import ImgButtonText from "./ImgButtonText";
import UpDownHandle from "./subcomponents/UpDownHandle";

// 타입 정의
type ShopCartListProps = {
  image: string;
  goodsName: string;
  goodsNameStyle: string;
  removeDataText: string | ReactElement;
  removeDataTextStyle: string;
  countBtnStyle: string;
  countTextStyle: string;
  countBoxText: string;
  priceBtnStyle: string;
  priceBtnText: string;
  priceTextStyle: string;
  priceText: string;
  countBtnText: string;
  isChecked: boolean;
  removeFunc: () => void;
  upDownBtn: () => void;
  buyFunc: () => void;
  cancleClickFunc: () => void;
  checkClickFunc: () => void;
  downClickFunc: () => void;
  upClickFunc: () => void;
  onCheckboxChange: (isChecked: boolean) => void;
};

const ShopCartList = ({
  isChecked,
  image,
  goodsName,
  goodsNameStyle,
  removeDataText,
  removeDataTextStyle,
  removeFunc,
  onCheckboxChange,
  cancleClickFunc,
  checkClickFunc,
  downClickFunc,
  upClickFunc,
  countBtnStyle,
  countBtnText,
  upDownBtn,
  countTextStyle,
  countBoxText,
  priceBtnStyle,
  priceBtnText,
  buyFunc,
  priceTextStyle,
  priceText,
}: ShopCartListProps) => {
  return (
    <table className="w-full border-collapse">
      <tbody>
        <tr>
          <td className="py-4 gap-3 border-b border-r w-7/12">
            <div className="flex gap-3">
              <input
                className="w-4 h-4 appearance-none border-2 rounded-sm checked:bg-black checked:before:content-['✔'] checked:before:text-white relative checked:flex flex checked:items-center checked:flex-row checked:justify-center"
                type="checkbox"
                checked={isChecked} // 개별 체크박스 상태
                onChange={(e) => onCheckboxChange(e.target.checked)} // 체크박스 상태 변경 처리
              />
              <ImgButtonText
                image={image}
                goodsName={goodsName}
                goodsNameStyle={goodsNameStyle}
                removeDataText={removeDataText}
                removeDataTextStyle={removeDataTextStyle}
                removeFunc={removeFunc}
              />
            </div>
          </td>
          <td className="border-b border-r w-2/12">
            <UpDownHandle
              name=""
              image=""
              quantity=""
              text=""
              cancleClickFunc={cancleClickFunc}
              checkClickFunc={checkClickFunc}
              downClickFunc={downClickFunc}
              upClickFunc={upClickFunc}
            />
            <ButtonText
              buttonStyle={countBtnStyle}
              buttonText={countBtnText}
              clickFunc={upDownBtn}
              textStyle={countTextStyle}
              text={countBoxText}
            />
          </td>
          <td className="border-b border-r w-2/12">
            <ButtonText
              buttonStyle={priceBtnStyle}
              buttonText={priceBtnText}
              clickFunc={buyFunc}
              textStyle={priceTextStyle}
              text={priceText}
            />
          </td>
          <td className="w-1/12 row-span-full">asd</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ShopCartList;
