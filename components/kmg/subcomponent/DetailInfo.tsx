import Text from "./Text";

type DetailInfoProps = {
  detailData: string[];
  TextclassName?: string;
  color: string;
  isToggle: boolean;
  boxStyle: string;
};
const DetailInfo = ({
  detailData,
  TextclassName,
  color,
  isToggle,
  boxStyle,
}: DetailInfoProps) => {
  return (
    <div style={{ display: isToggle ? "flex" : "none" }} className={boxStyle}>
      {detailData.map((v) => (
        <Text color={color} TextclassName={TextclassName} text={v} />
      ))}
    </div>
  );
};

export default DetailInfo;
