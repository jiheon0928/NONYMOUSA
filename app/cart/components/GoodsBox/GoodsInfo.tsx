import TextHandle from "./subcomponents/TextHandle";

interface GoodsInfoProps {
  isAllChecked: boolean;
  onAllCheckboxChange: (checked: boolean) => void;
}

const GoodsInfo = ({ isAllChecked, onAllCheckboxChange }: GoodsInfoProps) => {
  const styles = "text-gray-500 text-center text-xs";

  return (
    <div className="flex border-t items-center gap-5 py-3 border-gray-400">
      <input
        className="w-4 h-4 border border-gray-400 appearance-none rounded-sm checked:bg-black checked:before:content-['✔'] checked:before:text-white relative checked:flex flex checked:items-center checked:flex-row checked:justify-center"
        type="checkbox"
        checked={isAllChecked}
        onChange={(e) => onAllCheckboxChange(e.target.checked)}
      />
      <TextHandle className={`${styles} w-5/12`} text="상품 정보" />
      <TextHandle className={`${styles} w-3/12`} text="수량" />
      <TextHandle className={`${styles} w-3/12`} text="주문금액" />
      <TextHandle className={`${styles} w-2/12`} text="배송 정보" />
    </div>
  );
};

export default GoodsInfo;
