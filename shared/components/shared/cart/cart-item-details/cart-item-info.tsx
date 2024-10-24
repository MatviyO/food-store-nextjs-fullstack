import { ICartItem } from '@/store/cart';
import { FC } from "react";
import {
  PizzaType,
  pizzaTypes
} from "@/shared/constants/pizza-details-to-text";

interface Props {
  name: string;
  pizzaSize?: number | null;
  type?: PizzaType;
  ingredients?: ICartItem['ingredients'];
}

export const CartItemInfo: FC<Props> = ({ name, pizzaSize, type, ingredients }) => {


  const getCartItemDetails = () => {
    const details = [];

    if (pizzaSize && type) {
      const typeName = pizzaTypes[type];
      details.push(`${typeName} ${pizzaSize} см`);
    }

    if (ingredients) {
      details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(', ');
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      <p className="text-xs text-gray-400">{getCartItemDetails()}</p>
    </div>
  );
};
