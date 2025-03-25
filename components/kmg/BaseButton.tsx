import { BaseButtonProps } from "./types";

const BaseButton = ({ clickFunc, text, className, style }: BaseButtonProps) => {
  return (
    <button style={style} className={className} onClick={clickFunc}>
      {text}
    </button>
  );
};

export default BaseButton;
