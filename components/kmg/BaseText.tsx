type BaseTextProps = {
  className: string;
  text: string;
};
const BaseText = ({ className, text }: BaseTextProps) => {
  return <span className={className}>{text}</span>;
};

export default BaseText;
