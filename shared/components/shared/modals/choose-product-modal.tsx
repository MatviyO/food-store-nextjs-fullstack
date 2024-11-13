'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { IProduct } from "@/shared/hooks/common/card/use-choose-pizza";
import {
  ChoosePizzaForm
} from "@/shared/components/shared/choose-form/choose-pizza-form";
import {
  ChooseProductForm
} from "@/shared/components/shared/choose-form/choose-product-form";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";

interface Props {
  product: IProduct;
}

export const ChooseProductModal: FC<Props> = ({ product }) => {
  const router = useRouter();
  const firstItem = product?.items[0];
  const isPizzaForm = Boolean(firstItem?.pizzaType);

  const onCloseModal = () => {
    router.back();
  };

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={onCloseModal}
    >
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            onClickAdd={onCloseModal}
            ingredients={product.ingredients}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            onClickAdd={onCloseModal}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
