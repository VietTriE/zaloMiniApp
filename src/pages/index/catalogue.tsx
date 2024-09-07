import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { patternsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { formatNumber } from "utils/utils";

export const RecommendContent: FC = () => {
  const patterns = useRecoilValue(patternsState);

  return (
    <Box className=" py-6 space-y-4 ">
      <div className=" flex items-center justify-between px-4">
        <span className=" text-lg font-bold text-slate-700">
          CATALOGUE
        </span>
        <span className=" text-sm text-[#0074BC]">
          Xem tất cả
        </span>
      </div>
      <Swiper slidesPerView={1.25} spaceBetween={12} className="px-4">
        {patterns.map((category) => (
          <SwiperSlide key={category.lable}>
            <div className=" relative flex flex-col items-center bg-white border-b border-r border-slate-300  rounded-lg  p-1 ">
              <div
                className="relative w-full aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className=" flex w-full mt-1 px-4 py-2 items-center justify-between">
                <div>
                    <span>XEM</span>
                </div>
                <div>
                    <span>TẢI VỀ</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(3)];

  return (
    <Section title="CATALOGUE" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Catalogue: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
