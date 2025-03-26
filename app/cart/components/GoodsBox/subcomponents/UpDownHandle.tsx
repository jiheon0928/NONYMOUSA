import { useQuantityChange } from "@/app/cart/items/quantityChangeHandle";
import { HiOutlineMinus } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";

// `Item` 타입을 직접 정의 (이미 있는 타입을 수정하거나 추가할 수 있음)
type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // image 속성 추가
};

const UpDownHandle = ({
  item,
  closeDialog,
  onQuantityChange,
}: {
  item: Item;
  closeDialog: () => void;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
}) => {
  const {
    quantity,
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
        <div className="border-b text-center py-3">옵션 변경</div>
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
          <button
            className="py-1 border border-gray-300 text-gray-400"
            onClick={decreaseQuantity}
          >
            <HiOutlineMinus />
          </button>
          <div className="border border-gray-300 px-5 py-1 flex items-center text-[10px]">
            {tempQuantity}
          </div>
          <button
            className="py-1 border border-gray-300 text-gray-400"
            onClick={increaseQuantity}
          >
            <LuPlus />
          </button>
        </div>
        <div className="flex justify-between px-4 mb-6">
          <p className="text-xs">총수량 {tempQuantity}개</p>
          <p>￦{(item.price * tempQuantity).toLocaleString()}</p>
        </div>
        <div className="flex justify-center gap-1">
          <button
            className="border border-black px-6 py-3 text-xs text-black"
            onClick={() => {
              cancelQuantityChange();
              closeDialog();
            }}
          >
            취소
          </button>
          <button
            className="bg-black text-white px-6 py-3 text-xs"
            onClick={handleConfirm}
          >
            변경
          </button>
        </div>
        <button
          className="absolute top-2 right-5 text-4xl text-black"
          onClick={closeDialog}
        >
          ×
        </button>
      </div>
    </dialog>
  );
};

export default UpDownHandle;
