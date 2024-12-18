
import React from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/shared/libs/utils';

interface SearchResultsProps {
  products: Product[];
  onItemClick: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ products, onItemClick }) => {
  return (
    <div
      className={cn(
        'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 opacity-0 invisible z-30',
        'opacity-100 visible top-12',
      )}
    >
      {products.map((product) => (
        <Link
          onClick={onItemClick}
          href={`/product/${product.id}`}
          key={product.id}
          className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
        >
          <Image
            className="rounded-sm h-8 w-8"
            src={product.imageUrl}
            alt={product.name}
            width={32}
            height={32}
          />
          <span>{product.name}</span>
        </Link>
      ))}
    </div>
  );
};
