"use client";
import React, {FC} from "react";
import { cn } from "@/shared/libs/utils";
import {useCategoryStore} from "@/store/category";
// import { useCategoryStore } from '@/store/category';
// import { Category } from '@prisma/client';

interface Props {
  items: any[];
  className?: string;
}

export const Categories: FC<Props> = ({ items, className }) => {
  const activeId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {items.map((category) => (
        <a
          key={category.id}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeId === category.id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          href={`/#${category.name}`}>
          {category.name}
        </a>
      ))}
    </div>
  );
};
