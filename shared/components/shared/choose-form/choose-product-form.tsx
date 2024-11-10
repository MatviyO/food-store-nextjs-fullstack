'use client';

import { cn } from '@/shared/libs/utils';
import React from 'react';
import toast from 'react-hot-toast';
import { IProduct } from "@/shared/hooks/common/card/use-choose-pizza";
import { Title } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { useCart } from "@/shared/hooks/common/card/use-cart";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  items?: IProduct['items'];
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  onClickAdd,
  className,
}) => {
  const { addCartItem, loading } = useCart();

  const productItem = items?.[0];

  if (!productItem) {
    throw new Error('Product not found');
  }

  const productPrice = productItem.price;

  const handleClickAdd = async () => {
    try {
      addCartItem({
        productItemId: productItem.id,
        quantity: 1,
      });
      toast.success('Product added to cart');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding to cart');
    }

    onClickAdd?.();
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
        />
      </div>

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-1"
        />

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5"
        >
          Add to cart for {productPrice} $
        </Button>
      </div>
    </div>
  );
};
