import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import {
  categoriesState,
  productsByCategoryState,
  selectedCategoryIdState,
} from "state";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";

const CategoryPicker: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const selectedCategory = useRecoilValue(selectedCategoryIdState);
  return (
    <Tabs
      scrollable
      defaultActiveKey={selectedCategory}
      className="category-tabs"
    >
      {categories.filter(category => category.type === "products").map((category) => (
        <Tabs.Tab key={category.id} label={category.name}>
          <Suspense>
            <CategoryProducts categoryId={category.id} />
          </Suspense>
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
  const productsByCategory = useRecoilValue(
    productsByCategoryState(categoryId),
  );

  if (productsByCategory.length === 0) {
    return (
      <Box className="flex-1 bg-background p-4 flex justify-center items-center">
        <Text size="xSmall" className="text-gray">
          Không có sản phẩm trong danh mục
        </Text>
      </Box>
    );
  }
  return (
    <Box className="bg-[#e0e7ec] grid grid-cols-2 gap-4 p-4">
      {productsByCategory.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Box>
  );
};

const CategoryPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header backgroundColor="#0068b2" textColor="white" title=" DANH MỤC SẢN PHẨM " />
      <CategoryPicker />
    </Page>
  );
};

export default CategoryPage;
