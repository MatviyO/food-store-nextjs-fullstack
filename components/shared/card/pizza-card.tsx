"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "@/components/shared";
import { Button } from "@/components/ui";
import { PizzaImage } from "@/components/shared/card/pizza-image";
import { IProduct, useChoosePizza } from "@/hooks/common/card/use-choose-pizza";
import toast from "react-hot-toast";
import { PizzaSelector } from "@/components/shared/card/pizza-selector";
import {
  IngredientsList
} from "@/components/shared/ingredient/ingredients-list";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: IProduct["ingredients"];
  items?: IProduct["items"];
  onClickAdd?: VoidFunction;
}

export const PizzaCard: FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const {
    size,
    type,
    availablePizzaSizes,
    setPizzaSize,
    setPizzaType,
    textDetails,
    // loading,
    addPizza,
    selectedIngredientsIds,
    toggleAddIngredient,
  } = useChoosePizza(items);

  const totalIngredientPrice: number =
    ingredients
      ?.filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
      ?.reduce((acc, item) => acc + item.price, 0) || 0;

  const pizzaPrice: number =
    items?.find((item) => item.pizzaType === type)?.price || 0;
  const totalPrice: number = totalIngredientPrice + pizzaPrice;

  const handleClickAdd = async () => {
    try {
      await addPizza();
      onClickAdd?.();
    } catch (error) {
      toast.error("An error occurred while adding to the cart");
      console.error(error);
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage
        imageUrl={imageUrl}
        size={size}
      />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-1"
        />

        <p className="text-gray-400">{textDetails}</p>

        <PizzaSelector
          pizzaSizes={availablePizzaSizes}
          selectedSize={String(size)}
          selectedPizzaType={String(type)}
          onClickSize={setPizzaSize}
          onClickPizzaType={setPizzaType}
        />

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <IngredientsList
            ingredients={ingredients}
            onClickAdd={toggleAddIngredient}
            selectedIds={selectedIngredientsIds}
          />
        </div>

        <Button
          // loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Add to cart for {totalPrice} {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
