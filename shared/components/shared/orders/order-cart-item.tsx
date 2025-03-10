import { cn } from '@/shared/libs/utils';
import React, { FC } from 'react';
import * as CartItemDetails from '@/shared/components/shared/cart/cart-item-details';

interface Props {
  imageUrl: string;
  name: string;
  count: number;
  price: number;
  className?: string;
}

export const OrderCartItem: FC<Props> = ({ imageUrl, name, count, price, className }) => {
  return (
    <div className={cn('flex justify-between items-center p-4 px-7', className)}>
      <div className="flex items-center gap-3">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} />
      </div>
      <div>
        <CartItemDetails.Price value={price} />
        <span className="text-gray-400">{count} шт.</span>
      </div>
    </div>
  );
};
