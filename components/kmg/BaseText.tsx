import { BaseTextProps } from "./types";

const BaseText = ({ className, text }: BaseTextProps) => {
  return <span className={className}>{text}</span>;
};

export default BaseText;
