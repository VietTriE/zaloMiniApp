import React, { FC } from "react";
import { Product } from "types/product";
import { formatNumber } from "utils/utils";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {

  const navigate = useNavigate();
  const gotoProduct = (productId: string) => {
    const url = `/category/${productId}`
    navigate(url);
  };

  return (
    <Box className=" w-full ">
      <div className=" relative w-full h-full  pb-4 flex flex-col items-center bg-white border-b border-r border-slate-300  rounded-lg  p-1 ">
        <div
          className="relative w-full aspect-square rounded-lg bg-cover bg-center bg-skeleton"
          style={{ backgroundImage: `url(${product.image})` }}
        />
        <div className=" flex flex-col min-h-[110px] h-full items-center justify-center">
        <span className=" mt-2 font-bold text-slate-700">{product.name}</span>
        {product.sale?.type === "percent" ? (
          <div className=" flex items-center space-x-1">
            <span className=" flex-nowrap text-sm text-slate-900 line-through">
              {formatNumber(product.price)}đ
            </span>
            <span className=" bg-red-600 text-white text-sm font-semibold p-[2px] rounded-md">
              -
              {product.sale?.type === "percent"
                ? product.sale.percent * 100
                : ""}
              %
            </span>
          </div>
        ) : (
          <div></div>
        )}
        {product.sale?.type === "percent" ? (
          <span className=" font-bold text-[#0074BC] ">
            {formatNumber(product.price * (1 - product.sale.percent))}đ
          </span>
        ) : (
          <span className=" font-bold text-[#0074BC] ">
            {formatNumber(product.price)}đ
          </span>
        )}

        <div className=" mt-1 bg-[#0074BC] px-2 py-[2px] rounded-lg">
          <span onClick={() => gotoProduct(product.id)} className=" text-xs font-semibold text-white">
            XEM CHI TIẾT
          </span>
        </div>
        </div>
      </div>
    </Box>
  );
};
