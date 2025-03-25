import { ReactElement } from "react";
import ChangeHandle from "./subcomponents/ChangeHandle";
import ImageHandle from "./subcomponents/ImageHandle";
import TextHandle from "./subcomponents/TextHandle";

type ImgButtonTextProps = {
  image: string;
  name: string;
  nameStyle: string;
  removeDataText: string | ReactElement;
  removeFuncStyle: string;
  removeFunc: () => void;
};

const ImgButtonText = ({
  image,
  name,
  nameStyle,
  removeDataText,
  removeFuncStyle,
  removeFunc,
}: ImgButtonTextProps) => {
  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td className="w-3/4">
            <div className="flex gap-3">
              <ImageHandle image={image} />
              <TextHandle text={name} className={nameStyle} />
            </div>
          </td>
          <td className=" w-1/12 align-top">
            <ChangeHandle
              text={removeDataText}
              className={removeFuncStyle}
              clickFunc={removeFunc}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ImgButtonText;
