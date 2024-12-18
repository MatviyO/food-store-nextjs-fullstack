"use client";

import React, {useEffect, useState} from "react";
import { Category } from "@prisma/client";

import { cn } from "@/shared/libs/utils";
import { Categories } from "./categories/categories";
import { Container } from "@/shared/components/shared/layout";
import { SortPopup } from "@/shared/components/shared/popups/sort-popup";
import { CartButton } from "@/shared/components/shared/cart/cartButton";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setCartVisible(true);
      } else {
        setCartVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex items-center justify-between ">
        <Categories items={categories} />
        <div className="flex items-center">
          <SortPopup />
          <CartButton
            className={cn(
              "transition-all",
              !cartVisible ? "invisible w-0 p-0 opacity-0" : "visible ml-5 opacity-100",
            )}
          />
        </div>
      </Container>
    </div>
  );
};
