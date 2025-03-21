import { ReactElement } from "react";
import ChangeHandle from "./subcomponents/ChangeHandle";
import ImageHandle from "./subcomponents/ImageHandle";
import TextHandle from "./subcomponents/TextHandle";

type ImgButtonTextProps = {
  image: string;
  goodsName: string;
  goodsNameStyle: string;
  removeDataText: string | ReactElement;
  removeDataTextStyle: string;
  removeFunc: () => void;
};

const ImgButtonText = ({
  image,
  goodsName,
  goodsNameStyle,
  removeDataText,
  removeDataTextStyle,
  removeFunc,
}: ImgButtonTextProps) => {
  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td className="w-3/4">
            <div className="flex gap-3">
              <ImageHandle image={image} />
              <TextHandle text={goodsName} className={goodsNameStyle} />
            </div>
          </td>
          <td className=" w-1/12 align-top">
            <ChangeHandle
              text={removeDataText}
              className={removeDataTextStyle}
              clickFunc={removeFunc}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ImgButtonText;
