import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import {
  ChooseProductModal
} from "@/shared/components/shared/modals/choose-product-modal";

export default async function ProductModalPage({
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

  return <ChooseProductModal product={product} />;
}
