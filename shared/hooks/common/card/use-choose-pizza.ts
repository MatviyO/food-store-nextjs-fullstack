import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSet } from 'react-use';
import { Ingredient, Product, ProductItem } from '@prisma/client';
import { pizzaDetailsToText, PizzaSize, PizzaSizeItem, pizzaSizes, PizzaType } from "@/shared/constants/pizza-details-to-text";
import { useCart } from "@/shared/hooks/common/card/use-cart";


export type IProduct = Product & { items: ProductItem[]; ingredients: Ingredient[] };

export const useChoosePizza = (items?: IProduct['items']) => {
  const [selectedIngredientsIds, { toggle: toggleAddIngredient }] = useSet<number>(new Set([]));
  const { addCartItem, loading } = useCart();

  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const activeSizes = items?.filter((item) => item.pizzaType === type).map((item) => item.size);
  const productItem = items?.find((item) => item.pizzaType === type && item.size === Number(size));

  const isActiveSize = (value: number | string) => {
    return activeSizes?.some((activeSize) => activeSize === Number(value));
  };

  const availablePizzaSizes = pizzaSizes.map<PizzaSizeItem>((obj) => ({
    name: obj.name,
    value: obj.value,
    disabled: !isActiveSize(obj.value),
  }));

  useEffect(() => {
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const addPizza = async () => {
    if (productItem) {
      try {
        addCartItem({
          productItemId: productItem?.id,
          ingredientsIds: Array.from(selectedIngredientsIds),
          quantity: 1,
        });
        toast.success('Product added to the cart');
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while adding to the cart');
      }
    }
  };

  const setPizzaSize = (value: number | string) => {
    setSize(Number(value) as PizzaSize);
  };

  const setPizzaType = (value: number | string) => {
    setType(Number(value) as PizzaType);
  };

  const isSelectedIngredient = (id: number) => {
    return selectedIngredientsIds.has(id);
  };

  const textDetaills = pizzaDetailsToText(size, type);

  return {
    availablePizzaSizes,
    setPizzaSize,
    setPizzaType,
    isActiveSize,
    textDetails: textDetaills,
    isSelectedIngredient,
    loading,
    size,
    type,
    addPizza,
    selectedIngredientsIds,
    toggleAddIngredient,
  };
};
