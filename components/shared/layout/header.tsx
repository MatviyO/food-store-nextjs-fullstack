import React, { FC } from 'react';
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/layout/container";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { SearchInput } from "@/components/shared/search/search-input";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: FC<Props> = ({ className, hasSearch }) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <img src="/logo.png"
              width={35}
              height={35}
              alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Food Store</h1>
              <p className="text-sm text-gray-400 leading-3">delivery and ordering</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}


        <div className="flex items-center gap-3 mr-3">
          <Button className="flex items-center gap-3"
            variant="outline">
            Logout
          </Button>
        </div>
        <div>
          <Button className="group relative">
            <b>64 ua</b>
            <span className="h-full w-[1px] bg-white/30 mx-3"/>
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart className="h-4 w-4 relative"
                strokeWidth={2}/>
              {/*<b>{items.length}</b>*/}
            </div>
            <ArrowRight
              className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"/>
          </Button>
        </div>

      </Container>
    </header>
  )
}
