import Button from "./Button";
type ButtonWrap = {
  state: boolean;
  handler: () => void;
};
const ButtonWrap = ({ state, handler }: ButtonWrap) => {
  return (
    <div className="flex gap-2 w-[50%]">
      <Button text={"구매하기"} width={"45%"} bg={"#000"} />
      <Button text={"장바구니"} width={"45%"} />
      <Button state={state} handler={handler} width={"10%"} />
    </div>
  );
};
export default ButtonWrap;
