"use client";
import { useState } from "react";
import BaseButton from "../BaseButton";
import QnA from "./QnA";
import ExchangeTable from "./ExchangeTable";

const Exchange = () => {
  const [isSelect, setIsSelect] = useState(true);

  return (
    <div>
      <div className="flex gap-2 justify-center pb-3 border-b">
        <BaseButton
          key="qna"
          text="Q&A"
          clickFunc={() => setIsSelect(true)}
          className={`transition-colors duration-300 ${
            isSelect ? "text-black" : "text-gray-400 hover:text-black"
          }`}
        />{" "}
        /
        <BaseButton
          key="info"
          text="교환/반품"
          clickFunc={() => setIsSelect(false)}
          className={`transition-colors duration-300 ${
            !isSelect ? "text-black" : "text-gray-400 hover:text-black"
          }`}
        />
      </div>
      <div style={{ display: isSelect ? "block" : "none" }}>
        <QnA />
      </div>

      <div className="pt-5" style={{ display: isSelect ? "none" : "block" }}>
        <ExchangeTable />
      </div>
    </div>
  );
};

export default Exchange;
