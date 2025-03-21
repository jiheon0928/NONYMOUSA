"use client";
import { useState } from "react";

import ExchangeInfoBox from "./subcomponent/ExchangeInfoBox";
import ReviewBtn from "./subcomponent/ReviewBtn";

const QndExchange = () => {
  const [isSelect, setIsSelect] = useState(false);

  return (
    <>
      <div className="relative ">
        <div className=" bg-white p-7 flex items-center justify-center gap-2 border-b">
          <ReviewBtn
            isSelect={isSelect}
            clickFunc={() => setIsSelect(true)}
            title="Q&A"
          />
          <span>/</span>
          <ReviewBtn
            isSelect={!isSelect}
            clickFunc={() => setIsSelect(false)}
            title="반품/교환"
          />
        </div>

        <div className="max-w-full mx-auto py-10">
          {isSelect ? (
            <div className="text-gray-500 text-sm"></div>
          ) : (
            <ExchangeInfoBox />
          )}
        </div>
      </div>
    </>
  );
};

export default QndExchange;
