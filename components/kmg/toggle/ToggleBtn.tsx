"use client";
import React, { useState } from "react";
import BaseButton from "../BaseButton";
import { ToggleBtnProps } from "../types";

const ToggleBtn = ({ children, text }: ToggleBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-8">
      <BaseButton
        key="toggleDetail"
        className="text-light_Grey font-bold text-xs text-start"
        clickFunc={handleToggle}
        text={text}
      />
      {isOpen && <div className="text-light_Grey text-[10px]">{children}</div>}
    </div>
  );
};

export default ToggleBtn;
