'use client';
import React, { FC, useState, useMemo, ChangeEvent } from 'react';

import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input } from "@/components/ui";

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  selectedIds?: Set<string>;
  onClickCheckbox?: (value: string) => void;
  loading?: boolean;
  name?: string;
}

export const FilterCheckboxGroup: FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Search...',
  className,
  selectedIds,
  onClickCheckbox,
  loading,
  name,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.text.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [items, searchValue]);

  const visibleItems = useMemo(() => {
    return showAll ? filteredItems : defaultItems || filteredItems;
  }, [showAll, filteredItems, defaultItems]);

  const shouldShowToggle = useMemo(() => {
    return items.length > limit;
  }, [items.length, limit]);

  const handlerToggle = () => {
    setShowAll(prevState => !prevState);
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="w-full mb-4 h-6 bg-gray-200 rounded-[8px] animate-pulse" />
          ))}

        <div className="w-28 h-4 bg-gray-200 rounded-[8px] animate-pulse" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={handleSearchChange}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {visibleItems?.map((item) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            checked={selectedIds?.has(item.value)}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </div>

      {shouldShowToggle && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={handlerToggle} className="text-primary mt-3">
            {showAll ? 'Hide' : '+ Show all'}
          </button>
        </div>
      )}
    </div>
  );
};
