import { ChangeHandleProps } from "../../../typeprops.tsx/TypeProps";

const ChangeHandle = ({ clickFunc, text, className }: ChangeHandleProps) => {
  return (
    <button className={className} onClick={clickFunc}>
      {text}
    </button>
  );
};

export default ChangeHandle;
