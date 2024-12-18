import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import { Ingredient } from "@prisma/client";
import { FilterCheckboxProps } from "@/shared/components/shared/filters/filter-checkbox";
import { useSet } from "react-use";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { debounce } from "next/dist/server/utils";

interface PricesProps {
  pricesFrom: number;
  pricesTo: number;
}

export const useFilterState = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.getAll("sizes")),
  );

  const [types, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.getAll("types")),
  );

  const [prices, setPrices] = useState<PricesProps>({
    pricesFrom: Number(searchParams.get("pricesFrom")) || 0,
    pricesTo: Number(searchParams.get("pricesTo")) || 5000,
  });
  const [selectedIngredientsIds, { toggle }] = useSet(
    new Set<string>(
      searchParams.has("ingredients")
        ? searchParams.get("ingredients")?.split(",")
        : [],
    ),
  );

  const convertIngredientToFilterCheckbox = (
    ingredient: Ingredient,
  ): FilterCheckboxProps => {
    return {
      text: ingredient.name,
      value: ingredient.id.toString(),
    };
  };

  const ingredientsToFilter = (
    ingredientsL: Ingredient[],
  ): FilterCheckboxProps[] => {
    return ingredientsL?.length ?
      ingredientsL?.map(convertIngredientToFilterCheckbox) : [];
  };

  const updatePrices = (
    name: keyof PricesProps,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setPrices((prevState) => ({
      ...prevState,
      [name]: Number(event?.target?.value),
    }));
  };

  const updateQueryParams = useMemo(
    () =>
      debounce((params) => {
        router.push(
          `?${qs.stringify(params, {
            arrayFormat: "comma",
          })}`,
          { scroll: false },
        );
      }, 300),
    [],
  );

  useEffect(() => {
    const filters = {
      ...prices,
      ingredients: Array.from(selectedIngredientsIds),
      sizes: Array.from(sizes),
      types: Array.from(types),
    };

    updateQueryParams(filters);
  }, [prices, sizes, types, selectedIngredientsIds]);

  return {
    toggleSizes,
    updatePrices,
    togglePizzaTypes,
    sizes,
    types,
    prices,
    ingredientsToFilter,
    selectedIngredientsIds,
    setPrices,
    onClickCheckbox: toggle,
  };
};
