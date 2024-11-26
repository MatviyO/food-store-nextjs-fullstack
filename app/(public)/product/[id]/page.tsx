import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/products/products-group-list";
import { PizzaCard } from "@/shared/components/shared/card/pizza-card";

export default async function ProductPage({
  params }: { params: { id: string }
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          product: {
            include: {
              items: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <PizzaCard
        imageUrl={product.imageUrl}
        name={product.name}
        items={product.items}
        ingredients={product.ingredients}
      />

      <ProductsGroupList
        className="mt-20"
        listClassName="grid-cols-4"
        key={product.category.id}
        title="Recommended"
        products={product.category.products as never}
        categoryId={product.category.id}
      />
    </Container>
  );
}
