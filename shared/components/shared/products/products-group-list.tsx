'use client';

import React, { useEffect, useRef } from 'react';
import { ProductCard } from './product-card';
import { cn } from '@/shared/libs/utils';
import { Title } from '../text/title';
import { useIntersection } from 'react-use';
import { CategoryState, useCategoryStore } from "@/store/category";
import { Prisma } from "@prisma/client";

type ProductWithItems = Prisma.ProductGetPayload<{
  include: {
    items: true;
    ingredients: true;
  };
}>;


interface Props {
  title: string;
  products: ProductWithItems[]
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  products,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveId =
    useCategoryStore((state: CategoryState) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div
      className={className}
      id={title}
    >
      <Title
        text={title}
        size="lg"
        className="font-extrabold mb-5"
      />
      <div
        ref={intersectionRef}
        className={cn('grid grid-cols-3 gap-[50px]', listClassName)}
      >
        {products
          .filter((product) => product?.items?.length > 0)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
              ingredients={product.ingredients}
            />
          ))}
      </div>
    </div>
  );
};
