import TextHandle from "./subcomponents/TextHandle";

interface GoodsInfoProps {
  isAllChecked: boolean; // 전체 체크박스 상태
  onAllCheckboxChange: (checked: boolean) => void; // 전체 체크박스 클릭 시 상태 변경
}

const GoodsInfo = ({ isAllChecked, onAllCheckboxChange }: GoodsInfoProps) => {
  const styles = "text-gray-500 text-center text-xs";

  return (
    <div className="flex border-t border-b items-center gap-5 py-3">
      <input
        className="w-4 h-4 appearance-none border-2 rounded-sm checked:bg-black checked:before:content-['✔'] checked:before:text-white relative checked:flex flex checked:items-center checked:flex-row checked:justify-center"
        type="checkbox"
        checked={isAllChecked} // 전체 체크박스 상태
        onChange={(e) => onAllCheckboxChange(e.target.checked)} // 전체 체크박스 클릭 시 상태 변경
      />
      <TextHandle className={`${styles} w-7/12`} text="상품 정보" />
      <TextHandle className={`${styles} w-2/12`} text="수량" />
      <TextHandle className={`${styles} w-2/12`} text="주문금액" />
      <TextHandle className={`${styles} w-1/12`} text="배송 정보" />
    </div>
  );
};

export default GoodsInfo;
