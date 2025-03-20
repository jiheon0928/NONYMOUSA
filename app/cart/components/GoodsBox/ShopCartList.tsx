import { ReactElement } from "react";
import ChangeHandle from "./subcomponents/ChangeHandle";
import ImageHandle from "./subcomponents/ImageHandle";
import TextHandle from "./subcomponents/TextHandle";
import ButtonText from "./ButtonText";
import ImgButtonText from "./ImgButtonText";

// 타입 정의
type ShopCartListProps = {
  image: string;
  goodsName: string;
  goodsNameStyle: string;
  removeDataText: string | ReactElement;
  removeDataTextStyle: string;
  removeFunc: () => void;
  countBtnStyle: string;
  countTextStyle: string;
  countBoxText: string;
  priceBtnStyle: string;
  priceBtnText: string;
  priceTextStyle: string;
  priceText: string;
  countBtnText: string;
  upDownBtn: () => void;
  buyFunc: () => void;
  isChecked: boolean;
  onCheckboxChange: (isChecked: boolean) => void; // 체크박스 상태 처리 함수 추가
};

const ShopCartList = ({
  image,
  goodsName,
  goodsNameStyle,
  removeDataText,
  removeDataTextStyle,
  removeFunc,
  countBtnStyle,
  countTextStyle,
  countBoxText,
  isChecked,
  buyFunc,
  priceBtnStyle,
  priceBtnText,
  priceTextStyle,
  priceText,
  countBtnText,
  upDownBtn,
  onCheckboxChange, // 전달된 onCheckboxChange 함수
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
          <td className="w-1/12">asd</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ShopCartList;
