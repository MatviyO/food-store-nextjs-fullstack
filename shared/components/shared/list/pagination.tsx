'use client';

import React, { FC } from 'react';

import { ChevronLeft } from 'lucide-react';
import { cn } from '@/shared/libs/utils';
import { Button } from "@/shared/components/ui";

interface Props {
  className?: string;
  currentPage?: number;
  pageCount?: number;
}

export const Pagination: FC<Props> = ({
  className, currentPage = 1, pageCount = 1
}) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        className="p-0 w-10 disabled:bg-white disabled:opacity-20"
        variant="outline"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1 mx-2">
        {[...Array(pageCount)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'default' : 'ghost'}
          >
            {i + 1}
          </Button>
        ))}
      </div>

      <Button
        className="p-0 w-10 disabled:bg-white disabled:opacity-20"
        variant="outline"
        disabled={currentPage === pageCount}
      >
        <ChevronLeft className="h-4 w-4 rotate-180" />
      </Button>
    </div>
  );
};