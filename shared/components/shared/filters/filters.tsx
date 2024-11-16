"use client";

import React, { ChangeEvent, FC, useCallback } from "react";
import { Input } from "@/shared/components/ui/input";
import { FilterCheckboxGroup, Title } from "@/shared/components/shared";
import { RangeSlider } from "@/shared/components/shared/range-slider";
import { filterPizza, filterTypesPizza } from "@/shared/constants/filterPizza";
import { useFilterState } from "@/shared/hooks/common/search/use-filter-state";
import { useFilterIngredients } from "@/shared/hooks/common/search/use-inredients";

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const {
    ingredientsToFilter,
    prices,
    updatePrices,
    types,
    togglePizzaTypes,
    sizes,
    setPrices,
    toggleSizes,
    selectedIngredientsIds,
    onClickCheckbox,
  } = useFilterState();
  const { ingredients, isLoading } = useFilterIngredients();

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => updatePrices("pricesTo", e),
    [updatePrices],
  );

  return (
    <div className={className}>
      <Title
        text="Filters"
        size="sm"
        className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
      />

      {/*header filters */}
      <FilterCheckboxGroup
        name="pizzaTypes"
        className="mb-5"
        title="Crust Type"
        selectedIds={types}
        onClickCheckbox={togglePizzaTypes}
        items={filterTypesPizza}
      />

      {/* Filter sizes */}
      <FilterCheckboxGroup
        name="sizes"
        className="mb-5"
        title="Sizes"
        onClickCheckbox={toggleSizes}
        selectedIds={sizes}
        items={filterPizza}
      />

      {/* Filter prices */}
      <div className="mt-10 pb-7">
        <p className="font-bold mb-3">Price from to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={30000}
            onChange={(e) => updatePrices("pricesFrom", e)}
            value={String(prices.pricesFrom || 0)}
          />
          <Input
            type="number"
            min={100}
            max={30000}
            placeholder="30000"
            value={String(prices.pricesTo || 0)}
            onChange={onInputChange}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            Number(prices.pricesFrom) || 0,
            Number(prices.pricesTo) || 1000,
          ]}
          onValueChange={([pricesFrom, pricesTo]) => {
            setPrices({ pricesFrom, pricesTo });
          }}
        />
      </div>

      <FilterCheckboxGroup
        name="ingredients"
        loading={isLoading}
        className="mt-5"
        title="Ingredients"
        limit={6}
        selectedIds={selectedIngredientsIds}
        onClickCheckbox={onClickCheckbox}
        defaultItems={ingredientsToFilter(ingredients).slice(0, 6)}
        items={ingredientsToFilter(ingredients)}
      />
    </div>
  );
};
