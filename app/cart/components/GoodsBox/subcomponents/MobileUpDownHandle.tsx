import { useQuantityChange } from "@/app/cart/items/quantityChangeHandle";
import { HiOutlineMinus } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import TextHandle from "./TextHandle";
import ChangeHandle from "./ChangeHandle";

type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // image 속성 추가
};

const MobileUpDownHandle = ({
  item,
  closeDialog,
  onQuantityChange,
}: {
  item: Item;
  closeDialog: () => void;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
}) => {
  const {
    tempQuantity,
    increaseQuantity,
    decreaseQuantity,
    confirmQuantityChange,
    cancelQuantityChange,
  } = useQuantityChange(item.quantity);

  const handleConfirm = async () => {
    await confirmQuantityChange(item.id);
    onQuantityChange(item.id, tempQuantity);
    closeDialog();
  };

  return (
    <dialog
      open
      className="fixed   w-full h-full z-[9999] top-[48.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 flex justify-center items-center"
    >
      <div className="text-left w-[500px] h-[400px]  bg-white rounded-md  relative text-black">
        <TextHandle text={"옵션 변경"} className="border-b text-center py-3" />
        <div className="flex p-4  text-xs gap-5">
          <img
            src={item.image}
            alt={item.name}
            className="w-[100px] h-[100px] object-cover"
          />
          <div className="flex flex-col ">
            <p>{item.name}</p>
            <p>￦{item.price}</p>
          </div>
        </div>
        <p className="text-xs px-6 pt-6 mb-1 text-left">수량</p>
        <div className="flex px-6 mb-4">
          <ChangeHandle
            text={<HiOutlineMinus />}
            className="py-1 border border-gray-300 text-gray-400"
            clickFunc={decreaseQuantity}
          />

          <TextHandle
            text={tempQuantity}
            className="border border-gray-300 px-5 py-1 flex items-center text-[10px]"
          />

          <ChangeHandle
            text={<LuPlus />}
            className="py-1 border border-gray-300 text-gray-400"
            clickFunc={increaseQuantity}
          />
        </div>
        <div className="flex justify-between px-4 mb-6">
          <p className="text-xs">총수량 {tempQuantity}개</p>
          <p>￦{(item.price * tempQuantity).toLocaleString()}</p>
        </div>
        <div className="flex justify-center gap-1">
          <ChangeHandle
            text={"취소"}
            className="border border-black px-6 py-3 text-xs text-black"
            clickFunc={() => {
              cancelQuantityChange();
              closeDialog();
            }}
          />
          <ChangeHandle
            text={"변경"}
            className="bg-black text-white px-6 py-3 text-xs"
            clickFunc={handleConfirm}
          />
        </div>

        <ChangeHandle
          text={"×"}
          className="absolute top-2 right-5 text-4xl text-black"
          clickFunc={closeDialog}
        />
      </div>
    </dialog>
  );
};

export default MobileUpDownHandle;
