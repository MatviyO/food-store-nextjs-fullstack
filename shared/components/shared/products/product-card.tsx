import React, { FC } from "react";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/shared/libs/utils";
import Link from "next/link";
import { Title } from "@/shared/components/shared";
import Image from "next/image";
import { Ingredient } from "@prisma/client";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  ingredients?: Ingredient[];
}

export const ProductCard: FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  ingredients,
}) => {
  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image
            width={215}
            height={215}
            className="w-[215px] h-[215px]"
            src={imageUrl || ""}
            alt={name}
          />
        </div>

        <Title
          text={name}
          size="sm"
          className="mb-1 mt-3 font-bold"
        />

        <p className="text-sm text-gray-400">
          {ingredients?.map((ingredient) => ingredient.name).join(", ")}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            from <b>{price} $</b>
          </span>

          <Button
            variant="secondary"
            className="text-base font-bold"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  );
};
