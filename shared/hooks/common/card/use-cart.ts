
import { useEffect } from 'react';
import { CreateCartItemValues } from "@/core/types/dto/cart";
import { ICartItem, useCartStore } from "@/store/cart";

type ReturnProps = {
  totalAmount: number;
  items: ICartItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (runFetch?: boolean): ReturnProps => {
  const {
    totalAmount,
    items,
    fetchCartItems,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore();

  useEffect(() => {
    if (runFetch) {
      fetchCartItems();
    }
  }, [runFetch]);

  return {
    totalAmount,
    items,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  };
};
