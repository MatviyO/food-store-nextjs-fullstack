import React, {FC} from "react";

interface Props {
  className?: string;
}

export const CategoryList: FC<Props> = () => {
  const categoryProducts = [
    {
      id: 1,
      name: "Fruits",
      products: [],
    },
  ]
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-16">
        {categoryProducts.map(
          (category) =>
            category.products.length > 0 && (
              // <ProductsGroupList
              //   key={category.id}
              //   title={category.name}
              //   products={category.products}
              //   categoryId={category.id}
              // />
              <div></div>
            ),
        )}
      </div>

      <div className="flex items-center gap-6 mt-12">
        {/*<Pagination pageCount={meta.pageCount} currentPage={meta.currentPage}/>*/}
        <span className="text-sm text-gray-400">5 из 65</span>
      </div>
    </div>
  );
};
