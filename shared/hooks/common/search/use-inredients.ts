import { useState, useEffect } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/core/services/api/api-client";

interface ReturnProps {
  ingredients: Ingredient[];
  isLoading: boolean;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const ingredients = await Api.ingredients.getAll();
      setIngredients(ingredients);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIngredients([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    ingredients,
    isLoading,
  };
};
