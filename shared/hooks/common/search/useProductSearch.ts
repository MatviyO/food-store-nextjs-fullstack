import { useState, useCallback } from "react";
import { useDebounce } from "react-use";
import { Product } from "@prisma/client";

import { Api } from "@/core/services/api/api-client";

export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    if (searchQuery.trim() === "") {
      setProducts([]);
      return;
    }
    try {
      const results = await Api.products.search(searchQuery);
      setProducts(results);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  }, [searchQuery]);

  useDebounce(
    async () => {
      await fetchProducts();
    },
    100,
    [searchQuery],
  );

  return {
    searchQuery,
    setSearchQuery,
    products,
  };
};
