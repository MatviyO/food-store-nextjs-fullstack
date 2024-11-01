import { ICartItem } from '@/store/cart';
import { CartResponse } from "@/core/types/dto/cart";
import { Ingredient, ProductItem } from "@prisma/client";

type ReturnProps = {
  items: ICartItem[];
  totalAmount: number;
};

type Item = {
  productItem: ProductItem;
  ingredients: Ingredient[];
  quantity: number;
};

export const calcCartItemTotalAmount = (item: Item): number => {
  return (
    (item.productItem.price +
      item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) *
    item.quantity
  );
};


export const getCartDetails = (data: CartResponse): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalAmount(item),
    pizzaSize: item.productItem.size,
    type: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return { items, totalAmount: data.totalAmount || 0 };
};
