import ChangeHandle from "./subcomponents/ChangeHandle";
import TextHandle from "./subcomponents/TextHandle";
type ButtonText = {
  textStyle: string;
  text: string;
  buttonStyle: string;
  buttonText: string;
  clickFunc: () => void;
};
const ButtonText = ({
  textStyle,
  text,
  buttonStyle,
  clickFunc,
  buttonText,
}: ButtonText) => {
  return (
    <div className="flex flex-col items-center font-thin gap-3">
      <TextHandle className={textStyle} text={text} />
      <ChangeHandle
        className={buttonStyle}
        text={buttonText}
        clickFunc={clickFunc}
      />
    </div>
  );
};

export default ButtonText;
