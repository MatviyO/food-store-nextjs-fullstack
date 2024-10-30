import React, { FC } from 'react';
import { cn } from "@/shared/libs/utils";
import { Container } from "@/shared/components/shared/layout/container";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { SearchInput } from "@/shared/components/shared/search/search-input";
import { CartButton } from "@/shared/components/shared";

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
            <img
              src="/logo.png"
              width={35}
              height={35}
              alt="Logo"
            />
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
          <Button
            className="flex items-center gap-3"
            variant="outline"
          >
            Logout
          </Button>
        </div>
        <CartButton />

      </Container>
    </header>
  )
}
