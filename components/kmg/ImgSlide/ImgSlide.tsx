"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import BaseImage from "../BaseImage";

type ImgSlideProps = {
  imgData: string[];
};

const ImgSlide = ({ imgData }: ImgSlideProps) => {
  const [imgUrl, setImgUrl] = useState<string>(imgData[0]);

  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        {imgData.map((img) => (
          <motion.div
            key={img}
            initial={false}
            animate={{ opacity: img === imgUrl ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ zIndex: img === imgUrl ? 2 : 1 }}
          >
            <BaseImage img={img} className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mt-4">
        {imgData.map((v, i) => (
          <BaseImage
            key={i}
            img={v}
            className="w-[60px] h-[60px] cursor-pointer"
            func={() => setImgUrl(v)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImgSlide;
