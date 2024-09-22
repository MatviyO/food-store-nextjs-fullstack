import React, {FC} from 'react';
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/layout/container";
import Link from "next/link";
import Image from "next/image"

interface Props {
  className?: string
}

export const Header: FC<Props> = ({className}) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Food Store</h1>
              <p className="text-sm text-gray-400 leading-3">delivery and ordering</p>
            </div>
          </div>
        </Link>

      </Container>
    </header>
  )
}
