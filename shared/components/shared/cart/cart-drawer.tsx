'use client';

import Image from 'next/image';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { FC, PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import {
  Sheet, SheetClose,
  SheetContent, SheetFooter, SheetHeader, SheetTitle,
  SheetTrigger
} from "@/shared/components/ui/sheet";
import { Title } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import {
  DrawerCartItem
} from "@/shared/components/shared/cart/drawer-cart-item";
import { useCart } from "@/shared/hooks/common/card/use-cart";

export const CartDrawer: FC<PropsWithChildren> = ({ children }) => {
  const [redirecting, setRedirecting] = useState(false);

  const {
    totalAmount,
    items,
    loading,
  } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div className={clsx('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                In the cart <span className="font-bold">{items.length} items</span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Cart is empty"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Add at least one pizza to place an order
              </p>

              <SheetClose>
                <Button
                  className="w-56 h-12 text-base"
                  size="lg"
                >
                  <ArrowLeft className="w-5 mr-2" />
                  Go back
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="mb-2"
                  >
                    <DrawerCartItem
                      id={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      ingredients={item.ingredients}
                      quantity={item.quantity}
                      pizzaSize={item.pizzaSize}
                      type={item.type}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Total
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} $</span>
                  </div>

                  <Link href="/cart">
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={loading || redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Place order
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
