import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productsCategoryState, selectedCategoryIdState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router";
import { Box, Text } from "zmp-ui";
import { formatNumber } from "utils/utils";

export const RecommendContent: FC = () => {
  const productsCategory = useRecoilValue(productsCategoryState);

  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate("/category");
  };

  const gotoCategoryDefault = () => {
    setSelectedCategoryId("thangTaiKhach");
    navigate("/category");
  };

  return (
    <Box className=" py-6 space-y-4 ">
      <div className=" flex items-center justify-between px-4">
        <span className=" text-lg font-bold text-slate-700">
          DANH MỤC SẢN PHẨM
        </span>
        <span onClick={() => gotoCategoryDefault()} className=" text-sm text-[#0074BC]">
          Xem tất cả
        </span>
      </div>
      <Swiper slidesPerView={2.25} spaceBetween={12} className="px-4">
        {productsCategory.map((category) => (
          <SwiperSlide key={category.lable}>
            <div className=" relative pb-4 flex flex-col items-center bg-white border-b border-r border-slate-300  rounded-lg  p-1 ">
              <div
                className="relative w-full aspect-square rounded-lg bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <span className=" text-sm font-bold text-slate-700 py-4">{category.lable}</span>
              <div className=" bg-[#0074BC] px-2 py-[2px] rounded-lg" onClick={() => {gotoCategory(category.categoryId)}}>
                <span className=" text-xs font-semibold text-white">XEM CHI TIẾT</span>
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
    <Section title="DANH MỤC SẢN PHẨM" padding="title-only">
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

export const ProductsCategory: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
