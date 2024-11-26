import { Container } from "@/shared/components/shared/layout";
import { Title } from "@/shared/components/shared/text/title";
import { Filters, TopBar } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/products/products-group-list";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/libs/find-pizzas";

export default
async function HomePage({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams)

  return (
    <>
      <Container className="mt-10">
        <Title
          text="All foods"
          size="lg"
          className="font-extrabold"
        />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category?.products?.length > 0,
        )}
      />

      <Container className="pb-14 mt-[30px]">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories?.map(
                (category) =>
                  category?.products?.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      products={category?.products as never}
                      categoryId={category.id}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
