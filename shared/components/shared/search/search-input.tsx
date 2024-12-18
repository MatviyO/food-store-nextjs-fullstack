'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useClickAway } from 'react-use';
import { Search } from 'lucide-react';
import { cn } from '@/shared/libs/utils';
import { useProductSearch } from "@/shared/hooks/common/search/useProductSearch";
import { SearchResults } from "@/shared/components/shared/search/search-results";

export const SearchInput = () => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { searchQuery, setSearchQuery, products } = useProductSearch();

  useClickAway(ref, () => {
    setFocused(false);
  });

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  const handleItemClick = useCallback(() => {
    setSearchQuery('');
    setFocused(false);
  }, [setSearchQuery]);

  return (
    <>
      {focused && <div className="fixed inset-0 bg-black/50 z-30" />}
      <div
        ref={ref}
        className={cn('flex rounded-2xl flex-1 justify-between relative h-11', focused && 'z-30')}
      >
        <Search className="absolute top-1/2 left-3 h-5 text-gray-400 transform -translate-y-1/2" />

        <input
          className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
          type="text"
          placeholder="Search food..."
          onFocus={handleFocus}
          value={searchQuery}
          onChange={handleChange}
        />

        {products.length > 0 && focused && (
          <SearchResults products={products}
            onItemClick={handleItemClick} />
        )}
      </div>
    </>
  );
};
