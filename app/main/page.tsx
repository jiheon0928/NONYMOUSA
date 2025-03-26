"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Pagination,
  Navigation,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import { useProductStore } from "@/components/zustand/state";
import ProductColors from "../shop/components/mainComponent/subComponents/ProductColors";
import { useRouter } from "next/navigation";

const MainPage = () => {
  // useRouter()를 컴포넌트 내부에서 호출
  const router = useRouter();
  const { data, fetchData, loading } = useProductStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>로딩 중...</div>;

  console.log(data);

  return (
    <div className="mx-auto">
      <section className="w-full h-screen mt-48 sec1__swiper">
        <Swiper
          spaceBetween={30}
          effect="fade"
          navigation={true}
          pagination={{ clickable: true }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="w-full h-full"
          loop={true}
          autoplay={true}
          speed={2000}
        >
          <SwiperSlide>
            <img
              src="/images/mainimg1.jpg"
              alt="Main Image 1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/mainimg2.jpg"
              alt="Main Image 2"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/mainimg3.jpg"
              alt="Main Image 3"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="w-full mt-52 flex-col">
        <div className="mainImg">
          <img
            src="/images/mainmiddleimg1.jpg"
            alt="Main Middle"
            className="w-full"
          />
        </div>
        <span className="flex-col ">
          <p className="pt-12 pb-4 mb-28 text-xs text-center">
            2025 SPRING / SUMMER NONYMOUSAA COLLECTION
          </p>
          <hr className="w-2/4 mx-auto" />
        </span>
      </section>

      <section className="w-full p-6">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="w-full h-full overflow-hidden"
          breakpoints={{
            1280: { slidesPerView: 3, spaceBetween: 30 },
            720: { slidesPerView: 2, spaceBetween: 30 },
            0: { slidesPerView: 1 },
          }}
        >
          {data.map((v) => (
            <SwiperSlide key={v.productId} className="text-center text-xs">
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/detail/${v.productId}`)}
              >
                <img
                  src={v.productImage[0]}
                  alt={v.productName || `Slide ${v.productId}`}
                  className="w-full h-[600px] object-cover"
                />
                <h3 className="text-xs whitespace-nowrap mt-8">
                  {v.productName}
                </h3>
                <p>{v.productPrice}</p>
                <br />
                <p>{v.productInfo}</p>
                <br />
                <p>{v.productNotice}</p>
                <br />
                <div>
                  <ProductColors
                    productCode={v.productCode}
                    productHexCodes={v.productHexCodes}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default MainPage;
