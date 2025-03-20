"use client";
import { TextColor } from "@/app/types/Colors";
import { useState } from "react";

type ToggleProps = {
  text: string;
  clickfunc: () => void;
};

const Toggle = ({ text, clickfunc }: ToggleProps) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <span
      onClick={clickfunc}
      style={{ color: TextColor.deep_Grey, cursor: "pointer" }}
      className={"font-bold text-[16px]"}
    >
      {text} +
    </span>
  );
};

export default Toggle;
