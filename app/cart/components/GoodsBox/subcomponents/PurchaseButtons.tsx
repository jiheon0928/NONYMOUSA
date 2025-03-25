const PurchaseButtons = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* 주문하기 버튼 */}
      <div className="bg-black text-white text-base font-semibold w-full py-4 text-center cursor-pointer">
        주문하기
      </div>

      {/* N Pay 구매하기 버튼 */}
      <div className="bg-[#7BE26C] text-black text-base font-semibold w-full py-4 text-center cursor-pointer">
        🅝pay 구매하기
      </div>

      {/* 계속 쇼핑하기 텍스트 */}
      <div className="text-sm text-deep_Grey underline mt-2 cursor-pointer">
        계속 쇼핑하기
      </div>
    </div>
  );
};

export default PurchaseButtons;
