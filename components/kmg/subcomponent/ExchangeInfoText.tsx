import { TextColor } from "@/app/types/Colors";

type ExchangeInfoTextProps = {
  text: string;
  classname: string;
};
const ExchangeInfoText = ({ text, classname }: ExchangeInfoTextProps) => {
  return (
    <span style={{ color: TextColor.basic_Black }} className={classname}>
      {text}
    </span>
  );
};

export default ExchangeInfoText;
