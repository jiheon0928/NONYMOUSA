import { TextHandleProps } from "../../../typeprops.tsx/TypeProps";

const TextHandle = ({ className, text }: TextHandleProps) => {
  return <div className={className}>{text}</div>;
};

export default TextHandle;
