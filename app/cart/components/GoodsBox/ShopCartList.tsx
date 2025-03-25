import { AiOutlineClose } from "react-icons/ai";
import ImgButtonText from "./ImgButtonText";
import TextHandle from "./subcomponents/TextHandle";
import UpDownHandle from "./subcomponents/UpDownHandle";
import ChangeHandle from "./subcomponents/ChangeHandle";

type ShopCartListProps = {
  image: string;
  name: string;
  removeDataText: string;
  quantity: number;
  allPrice: number;
  price: number;
  index: number;
  isChecked: boolean;
  delivaryPrice: string;
  removeFunc: () => void;
  cancleHandle: () => void;
  confirmHandle: () => void;
  downHandle: () => void;
  upHandle: () => void;
  onCheckboxChange: (isChecked: boolean) => void;
};

const ShopCartList = ({
  image,
  name,
  quantity,
  price,
  allPrice,
  isChecked,
  index,
  delivaryPrice,
  removeFunc,
  cancleHandle,
  confirmHandle,
  downHandle,
  upHandle,
  onCheckboxChange,
}: ShopCartListProps) => {
  return (
    <table className="w-full ">
      <tbody>
        <tr>
          <td className="flex gap-5">
            <input
              className="w-4 h-4 appearance-none border-2 rounded-sm checked:bg-black checked:before:content-['✔'] checked:before:text-white relative checked:flex flex checked:items-center checked:flex-row checked:justify-center"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onCheckboxChange(e.target.checked)}
            />
            <ImgButtonText
              image={image}
              name={name}
              removeDataText={<AiOutlineClose />}
              removeFunc={removeFunc}
              nameStyle="text-[12px]"
              removeFuncStyle=""
            />
          </td>
          <td className=" text-center align-middle space-y-4 w-2/12">
            <TextHandle text={quantity} className="" />
            <UpDownHandle
              name={name}
              image={image}
              price={price}
              quantity={quantity}
              allPrice={allPrice}
              cancleHandle={cancleHandle}
              confirmHandle={confirmHandle}
              downHandle={downHandle}
              upHandle={upHandle}
            />
          </td>
          <td className=" text-center align-middle space-y-4 w-2/12">
            <TextHandle text={`￦${allPrice.toLocaleString()}`} className="" />
            <ChangeHandle
              text={"바로 구매"}
              className=""
              clickFunc={() => ""}
            />
          </td>
          <td
            className={`${
              index === 0 ? "row-span-full" : ""
            } text-center align-middle space-y-4 w-1/12`}>
            <TextHandle text={delivaryPrice} className="" />
            <TextHandle text="택배" className="" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ShopCartList;
