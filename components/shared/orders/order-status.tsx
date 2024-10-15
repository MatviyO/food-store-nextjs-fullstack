import React from 'react';
import { cn } from '@/lib/utils';
import { OrderStatus as IOrderStatus } from '@prisma/client';
import { Badge } from "lucide-react";

interface Props {
  className?: string;
  variant: IOrderStatus;
  text?: string;
}

export const OrderStatus: React.FC<Props> = ({ className, variant, text }) => {
  const textStatusMap: Record<IOrderStatus, string> = {
    SUCCEEDED: 'Paid',
    CANCELLED: 'Cancelled',
    PENDING: 'Processing',
  };
  return (
    <Badge
      className={cn(
        {
          'bg-green-100 text-green-700 hover:bg-green-100': variant === IOrderStatus.SUCCEEDED,
          'bg-red-100 text-red-700 hover:bg-red-100': variant === IOrderStatus.CANCELLED,
          'bg-yellow-100 text-yellow-700 hover:bg-yellow-100': variant === IOrderStatus.PENDING,
        },
        'font-normal text-sm',
        className,
      )}
    >
      {textStatusMap[variant] || text}
    </Badge>
  );
};
