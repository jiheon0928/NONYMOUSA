"use client";
import { TextColor } from "@/app/types/Colors";
import DetailInfo from "./DetailInfo";
import Toggle from "./Toggle";
import { useState } from "react";

type ToggleInfoProps = {
  text: string;
  detailData: string[];
  boxStyle: string;
  TextclassName: string;
};
const ToggleInfo = ({
  detailData,
  text,
  boxStyle,
  TextclassName,
}: ToggleInfoProps) => {
  const [isToggle, setIsToggle] = useState(false);
  const change = () => setIsToggle((prev) => !prev);
  return (
    <div className="flex flex-col gap-3">
      <Toggle clickfunc={() => change()} text={text} />
      <DetailInfo
        boxStyle={boxStyle}
        isToggle={isToggle}
        color={TextColor.light_Grey}
        detailData={detailData}
        TextclassName={TextclassName}
      />
    </div>
  );
};

export default ToggleInfo;
